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

  $: useAuthorizer = () => {
    return {
      ...stateData,
      config: { ...stateData.config, ...config },
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
