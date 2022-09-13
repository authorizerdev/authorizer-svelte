<script>
  import { StyledButton, StyledSeparator } from '../styledComponents/index'
  import {
    Google,
    Github,
    Facebook,
    Linkedin,
    Apple,
    Twitter
  } from '../icons/index'
  import { store } from '../store/index'
  import { createQueryParams } from '../utils/common'
  import { ButtonAppearance } from '../constants'

  export let urlProps = {
    scope: []
  }

  let state

  store.subscribe(data => {
    state = data
  })

  $: hasSocialLogin =
    state.config.is_google_login_enabled ||
    state.config.is_github_login_enabled ||
    state.config.is_facebook_login_enabled ||
    state.config.is_linkedin_login_enabled ||
    state.config.is_apple_login_enabled
  $: queryParams = createQueryParams({
    ...urlProps,
    scope: urlProps.scope.join(' ')
  })
</script>

<div>
  {#if state.config.is_apple_login_enabled}
    <div id="appleid-signin">
      <StyledButton
        on:click={() => {
          if (window?.location)
            window.location.href = `${state.config.authorizerURL}/oauth_login/apple?${queryParams}`
        }}
      >
        <Apple />
        Sign in with Apple
      </StyledButton>
      <br />
    </div>
  {/if}
  {#if state.config.is_google_login_enabled}
    <StyledButton
      on:click={() => {
        if (window?.location)
          window.location.href = `${state.config.authorizerURL}/oauth_login/google?${queryParams}`
      }}
    >
      <Google />
      Sign in with Google
    </StyledButton>
    <br />
  {/if}
  {#if state.config.is_github_login_enabled}
    <StyledButton
      on:click={() => {
        if (window?.location)
          window.location.href = `${state.config.authorizerURL}/oauth_login/github?${queryParams}`
      }}
    >
      <Github />
      Sign in with Github
    </StyledButton>
    <br />
  {/if}
</div>

<style></style>
