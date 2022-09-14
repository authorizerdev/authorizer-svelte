<script>
  import { StyledButton, StyledSeparator } from '../styledComponents'
  import { Google, Github, Facebook, Linkedin, Apple, Twitter } from '../icons'
  import { store } from '../store'
  import { createQueryParams } from '../utils/common'

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
    state.config.is_apple_login_enabled ||
    state.config.is_twitter_login_enabled
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
  {#if state.config.is_facebook_login_enabled}
    <StyledButton
      on:click={() => {
        if (window?.location)
          window.location.href = `${state.config.authorizerURL}/oauth_login/facebook?${queryParams}`
      }}
    >
      <Facebook />
      Sign in with Facebook
    </StyledButton>
    <br />
  {/if}
  {#if state.config.is_linkedin_login_enabled}
    <StyledButton
      on:click={() => {
        if (window?.location)
          window.location.href = `${state.config.authorizerURL}/oauth_login/linkedin?${queryParams}`
      }}
    >
      <Linkedin />
      Sign in with Linkedin
    </StyledButton>
    <br />
  {/if}
  {#if state.config.is_twitter_login_enabled}
    <StyledButton
      on:click={() => {
        if (window?.location)
          window.location.href = `${state.config.authorizerURL}/oauth_login/twitter?${queryParams}`
      }}
    >
      <Twitter />
      Sign in with Twitter
    </StyledButton>
    <br />
  {/if}
  {#if hasSocialLogin && (state.config.is_basic_authentication_enabled || state.config.is_magic_link_login_enabled)}
    <StyledSeparator>OR</StyledSeparator>
  {/if}
</div>

<style></style>
