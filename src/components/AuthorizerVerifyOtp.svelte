<script>
  import {
    StyledButton,
    StyledFormGroup,
    StyledFooter,
    StyledLink
  } from '../styledComponents'
  import { store } from '../store'
  import { capitalizeFirstLetter, isValidOtp } from '../utils/common'
  import { MessageType } from '../constants/index'
  import { ButtonAppearance } from '../constants/index'
  import { Views } from '../constants/index'
  import Message from './Message.svelte'

  export let setView
  export let onLogin
  export let email

  let state
  let otpError = null
  let componentState = {
    error: null,
    successMessage: null,
    loading: false,
    sendingOtp: false,
    otp: null
  }

  store.subscribe(data => {
    state = data
  })

  $: {
    otpError =
      componentState.otp === ''
        ? 'OTP is required'
        : componentState.otp && !isValidOtp(componentState.otp)
        ? 'Please enter valid OTP'
        : null
  }

  const onSubmit = async () => {
    componentState.successMessage = null
    try {
      componentState.loading = true
      const res = await state.authorizerRef.verifyOtp({
        email,
        otp: componentState.otp
      })
      componentState.loading = false
      if (res) {
        componentState.error = null
        state.setAuthData({
          user: res.user || null,
          token: {
            access_token: res.access_token,
            expires_in: res.expires_in,
            refresh_token: res.refresh_token,
            id_token: res.id_token
          },
          config: globalConfig,
          loading: false
        })
      }
      if (onLogin) {
        onLogin(res)
      }
    } catch (error) {
      componentState.loading = false
      componentState.error = error.message
    }
  }
  const onSuccessClose = () => {
    componentState.successMessage = null
  }
  const onErrorClose = () => {
    componentState.error = null
  }
  const resendOtp = async () => {
    componentState.successMessage = null
    try {
      componentState.sendingOtp = true
      const res = await state.authorizerRef.resendOtp({
        email
      })
      componentState.sendingOtp = false
      if (res && res?.message) {
        componentState.error = null
        componentState.successMessage = res.message
      }
      if (onLogin) {
        onLogin(res)
      }
    } catch (error) {
      componentState.loading = false
      componentState.error = error.message
    }
  }
</script>

{#if componentState.successMessage}
  <Message
    type={MessageType.Success}
    text={componentState.successMessage}
    onClose={onSuccessClose}
  />
{/if}
{#if componentState.error}
  <Message
    type={MessageType.Error}
    text={componentState.error}
    onClose={onErrorClose}
  />
{/if}
<p style="text-align: center; margin: 10px 0px;">
  Please enter the OTP you received on your email address.
</p>
<br />
<form on:submit|preventDefault={onSubmit}>
  <StyledFormGroup hasError={otpError}>
    <label slot="form-input-label" class="form-input-label" for="">
      <span> * </span>
      OTP (One Time Password)
    </label>
    <input
      slot="form-input-field"
      class={otpError
        ? 'form-input-field input-error-content'
        : 'form-input-field'}
      placeholder="eg. AB123C"
      type="password"
      bind:value={componentState.otp}
    />
    <div slot="form-input-error" class="form-input-error">
      {capitalizeFirstLetter(otpError)}
    </div>
  </StyledFormGroup>
  <br />
  <StyledButton
    appearance={ButtonAppearance.Primary}
    disabled={otpError || !componentState.otp}
  >
    {#if componentState.loading}
      Processing ...
    {:else}
      Submit
    {/if}
  </StyledButton>
</form>
{#if setView}
  <StyledFooter>
    {#if componentState.sendingOtp}
      <div style="margin-bottom: 10px;">Sending ...</div>
    {:else}
      <StyledLink on:click={resendOtp} marginBottom={'10px'}>
        Resend OTP
      </StyledLink>
    {/if}
    {#if state.config.is_sign_up_enabled}
      <div>
        Don't have an account?
        <StyledLink on:click={() => setView(Views.Signup)}>Sign Up</StyledLink>
      </div>
    {/if}
  </StyledFooter>
{/if}
