<script>
  import {
    StyledButton,
    StyledFormGroup,
    StyledFooter,
    StyledLink
  } from '../styledComponents'
  import { store } from '../store'
  import { Views, MessageType, ButtonAppearance } from '../constants'
  import { isValidEmail } from '../utils/common'
  import Message from './Message.svelte'
  import PassowrdStrengthIndicator from './PassowrdStrengthIndicator.svelte'

  export let setView
  export let onSignup
  export let urlProps = {}

  let state
  let componentState = {
    error: null,
    successMessage: null,
    loading: false,
    disableSignupButton: false
  }
  let formData = {
    email: null,
    password: null,
    confirmPassword: null
  }

  $: errorData = {
    email:
      formData.email === ''
        ? 'Email is required'
        : formData.email && !isValidEmail(formData.email)
        ? 'Please enter valid email'
        : null,
    password:
      formData.password === ''
        ? 'Password is required'
        : formData.password &&
          formData.confirmPassword &&
          formData.confirmPassword !== formData.password
        ? `Password and confirm passwords don't match`
        : null,
    confirmPassword:
      formData.confirmPassword === ''
        ? 'Confirm password is required'
        : formData.password &&
          formData.confirmPassword &&
          formData.confirmPassword !== formData.password
        ? `Password and confirm passwords don't match`
        : null
  }

  store.subscribe(data => {
    state = data
  })

  const onSubmit = async () => {
    try {
      componentState.loading = true
      const data = {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword
      }
      if (urlProps.scope) {
        data.scope = urlProps.scope
      }
      if (urlProps.redirect_uri) {
        data.redirect_uri = urlProps.redirect_uri
      }
      const res = await state.authorizerRef.signup(data)
      if (res) {
        componentState.error = null
        if (res.access_token) {
          componentState.error = null
          state.setAuthData({
            user: res.user || null,
            token: {
              access_token: res.access_token,
              expires_in: res.expires_in,
              refresh_token: res.refresh_token,
              id_token: res.id_token
            },
            config: state.config,
            loading: false
          })
        } else {
          componentState.error = null
          componentState.successMessage = res?.message ? res.message : null
        }
        if (onSignup) {
          onSignup(res)
        }
      }
    } catch (error) {
      componentState.loading = false
      componentState.error = error.message
    }
  }
  const onErrorClose = () => {
    componentState.error = null
  }
  const setDisableButton = value => {
    componentState.disableSignupButton = value
  }
</script>

{#if componentState.successMessage}
  <Message type={MessageType.Success} text={componentState.successMessage} />
{:else}
  {#if componentState.error}
    <Message
      type={MessageType.Error}
      text={componentState.error}
      onClose={onErrorClose}
    />
  {/if}
  <form on:submit|preventDefault={onSubmit}>
    <StyledFormGroup hasError={errorData.email}>
      <label slot="form-input-label" class="form-input-label" for="">
        <span> * </span>
        Email
      </label>
      <input
        slot="form-input-field"
        class={errorData.email
          ? 'form-input-field input-error-content'
          : 'form-input-field'}
        placeholder="eg. foo@bar.com"
        type="email"
        bind:value={formData.email}
      />
      <div slot="form-input-error" class="form-input-error">
        {errorData.email}
      </div>
    </StyledFormGroup>
    <StyledFormGroup hasError={errorData.password}>
      <label slot="form-input-label" class="form-input-label" for="">
        <span> * </span>
        Password
      </label>
      <input
        slot="form-input-field"
        class={errorData.password
          ? 'form-input-field input-error-content'
          : 'form-input-field'}
        placeholder="********"
        type="password"
        bind:value={formData.password}
      />
      <div slot="form-input-error" class="form-input-error">
        {errorData.password}
      </div>
    </StyledFormGroup>
    <StyledFormGroup hasError={errorData.confirmPassword}>
      <label slot="form-input-label" class="form-input-label" for="">
        <span> * </span>
        Confirm Password
      </label>
      <input
        slot="form-input-field"
        class={errorData.confirmPassword
          ? 'form-input-field input-error-content'
          : 'form-input-field'}
        placeholder="********"
        type="password"
        bind:value={formData.confirmPassword}
      />
      <div slot="form-input-error" class="form-input-error">
        {errorData.confirmPassword}
      </div>
    </StyledFormGroup>
    {#if state.config.is_strong_password_enabled}
      <PassowrdStrengthIndicator
        value={formData.password || ''}
        {setDisableButton}
      />
      <br />
    {/if}
    <StyledButton
      appearance={ButtonAppearance.Primary}
      disabled={!formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        errorData.email ||
        errorData.password ||
        errorData.confirmPassword ||
        componentState.loading ||
        componentState.disableSignupButton}
    >
      {#if componentState.loading}
        Processing ...
      {:else}
        Sign Up
      {/if}
    </StyledButton>
  </form>
  {#if setView}
    <StyledFooter>
      <div>
        Already have an account?
        <StyledLink on:click={() => setView(Views.Login)}>Log In</StyledLink>
      </div>
    </StyledFooter>
  {/if}
{/if}

<style></style>
