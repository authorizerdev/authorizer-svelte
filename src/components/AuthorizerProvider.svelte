<script>
  import { setContext } from 'svelte'
  import { Authorizer } from '@authorizerdev/authorizer-js'
  import { hasWindow } from '../utils/window'
  export let config
  export let onStateChangeCallback
  $: state = {
    config: {
      authorizerURL: '',
      redirectURL: '/',
      client_id: '',
      is_google_login_enabled: false,
      is_github_login_enabled: false,
      is_facebook_login_enabled: false,
      is_linkedin_login_enabled: false,
      is_apple_login_enabled: false,
      is_twitter_login_enabled: false,
      is_email_verification_enabled: false,
      is_basic_authentication_enabled: false,
      is_magic_link_login_enabled: false,
      is_sign_up_enabled: false,
      is_strong_password_enabled: true
    },
    user: null,
    token: null,
    loading: false,
    setLoading: () => {},
    setToken: () => {},
    setUser: () => {},
    setAuthData: () => {},
    authorizerRef: new Authorizer({
      authorizerURL: `http://localhost:8080`,
      redirectURL: hasWindow() ? window.location.origin : '/',
      clientID: ''
    }),
    logout: async () => {}
  }
  $: useAuthorizer = () => {
    return {
      ...state,
      config: { ...state.config, ...config },
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
  }
  setContext('useAuthorizer', useAuthorizer)
</script>

<slot>Authorizer Provider Component</slot>

<style></style>
