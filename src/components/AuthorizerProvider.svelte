<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { Authorizer } from '@authorizerdev/authorizer-js'
  import { store } from '../store/index'
  import { hasWindow } from '../utils/window'
  import { AuthorizerProviderActionType } from '../constants/index'

  export let config
  export let onStateChangeCallback

  let state

  store.subscribe(data => {
    state = data
  })

  const dispatch = ({ type, payload }) => {
    switch (type) {
      case AuthorizerProviderActionType.SET_USER:
        store.update(oldState => {
          return {
            ...oldState,
            user: payload.user
          }
        })
        break
      case AuthorizerProviderActionType.SET_TOKEN:
        store.update(oldState => {
          return {
            ...oldState,
            token: payload.token
          }
        })
        break
      case AuthorizerProviderActionType.SET_LOADING:
        store.update(oldState => {
          return {
            ...oldState,
            loading: payload.loading
          }
        })
        break
      case AuthorizerProviderActionType.SET_CONFIG:
        store.update(oldState => {
          return {
            ...oldState,
            config: { ...oldState.config, ...payload.config }
          }
        })
        break
      case AuthorizerProviderActionType.SET_AUTH_DATA:
        store.update(oldState => {
          return {
            ...oldState,
            ...payload,
            config: { ...oldState.config, ...payload.config }
          }
        })
        break
      default:
        throw new Error()
    }
  }

  let intervalRef = null

  const getToken = async () => {
    const metaRes = await state.authorizerRef.getMetaData()
    try {
      const res = await state.authorizerRef.getSession()
      if (res.access_token && res.user) {
        const token = {
          access_token: res.access_token,
          expires_in: res.expires_in,
          id_token: res.id_token,
          refresh_token: res.refresh_token || ''
        }
        dispatch({
          type: AuthorizerProviderActionType.SET_AUTH_DATA,
          payload: {
            token,
            user: res.user,
            config: metaRes,
            loading: false
          }
        })
        if (intervalRef) clearInterval(intervalRef)
        intervalRef = setInterval(() => {
          getToken()
        }, res.expires_in * 1000)
      } else {
        dispatch({
          type: AuthorizerProviderActionType.SET_AUTH_DATA,
          payload: {
            token: null,
            user: null,
            config: metaRes,
            loading: false
          }
        })
      }
    } catch (error) {
      dispatch({
        type: AuthorizerProviderActionType.SET_AUTH_DATA,
        payload: {
          token: null,
          user: null,
          config: metaRes,
          loading: false
        }
      })
    }
  }

  $: {
    store.update(oldState => {
      return {
        ...oldState,
        config: { ...oldState.config, ...config },
        authorizerRef: new Authorizer({
          authorizerURL: config?.authorizerURL || '',
          redirectURL: config?.redirectURL
            ? config.redirectURL
            : hasWindow()
            ? window.location.origin
            : '/',
          clientID: config?.client_id || ''
        }),
        setToken: token => {
          dispatch({
            type: AuthorizerProviderActionType.SET_TOKEN,
            payload: {
              token
            }
          })
          if (token?.access_token) {
            if (intervalRef) clearInterval(intervalRef)
            intervalRef = setInterval(() => {
              getToken()
            }, token.expires_in * 1000)
          }
        },
        setAuthData: data => {
          dispatch({
            type: AuthorizerProviderActionType.SET_AUTH_DATA,
            payload: data
          })
          if (data.token?.access_token) {
            if (intervalRef) clearInterval(intervalRef)
            intervalRef = setInterval(() => {
              getToken()
            }, data.token.expires_in * 1000)
          }
        },
        setUser: user => {
          dispatch({
            type: AuthorizerProviderActionType.SET_USER,
            payload: {
              user
            }
          })
        },
        setLoading: loading => {
          dispatch({
            type: AuthorizerProviderActionType.SET_LOADING,
            payload: {
              loading
            }
          })
        },
        logout: async () => {
          dispatch({
            type: AuthorizerProviderActionType.SET_LOADING,
            payload: {
              loading: true
            }
          })
          await state.authorizerRef.logout()
          const loggedOutState = {
            user: null,
            token: null,
            loading: false,
            config: state.config
          }
          dispatch({
            type: AuthorizerProviderActionType.SET_AUTH_DATA,
            payload: loggedOutState
          })
        }
      }
    })
  }

  onMount(() => {
    getToken()
  })

  afterUpdate(() => {
    if (onStateChangeCallback) {
      onStateChangeCallback(state)
    }
  })

  setContext('authorizerContext', store)
</script>

<slot>Authorizer Provider Component</slot>

<style>
  :global(:root) {
    --primary-color: #3b82f6;
    --primary-disabled-color: #60a5fa;
    --gray-color: #d1d5db;
    --white-color: #ffffff;
    --danger-color: #dc2626;
    --success-color: #10b981;
    --text-color: #374151;
    --fonts-font-stack: -apple-system, system-ui, sans-serif;
    --fonts-large-text: 18px;
    --fonts-medium-text: 14px;
    --fonts-small-text: 12px;
    --fonts-tiny-text: 10px;
    --radius-card: 5px;
    --radius-button: 5px;
    --radius-input: 5px;
  }
</style>
