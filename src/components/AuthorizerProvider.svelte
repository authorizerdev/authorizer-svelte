<script>
  import { setContext } from 'svelte'
  import { Authorizer } from '@authorizerdev/authorizer-js'
  import { state } from '../store/index'
  import { hasWindow } from '../utils/window'

  export let config
  export let onStateChangeCallback

  let stateData

  state.subscribe(data => {
    stateData = data
    onStateChangeCallback && onStateChangeCallback(stateData)
  })

  $: {
    state.update(oldState => {
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
        })
      }
    })
  }

  $: useAuthorizer = () => stateData

  setContext('useAuthorizer', useAuthorizer)
</script>

<slot>Authorizer Provider Component</slot>

<style></style>
