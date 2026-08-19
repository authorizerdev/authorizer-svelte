<script>import { StyledButton, StyledFormGroup, StyledFooter, StyledLink } from "../styledComponents";
import { store } from "../store";
import { isValidOtp } from "../utils/common";
import { ButtonAppearance, Views, MessageType } from "../constants";
import Message from "./Message.svelte";
export let setView = void 0;
export let onLogin = void 0;
export let email;
export let urlProps = {
  state: void 0
};
let state;
let otpError = null;
let componentState = {
  error: null,
  successMessage: null,
  loading: false,
  sendingOtp: false,
  otp: null
};
store.subscribe((data) => {
  state = data;
});
$: {
  otpError = componentState.otp === "" ? "OTP is required" : componentState.otp && !isValidOtp(componentState.otp) ? "Please enter valid OTP" : null;
}
const onSubmit = async () => {
  componentState.successMessage = null;
  const data = {
    email,
    otp: componentState.otp || ""
  };
  if (urlProps.state) {
    data.state = urlProps.state;
  }
  try {
    componentState.loading = true;
    const { data: res, errors } = await state.authorizerRef.verifyOtp(data);
    componentState.loading = false;
    if (errors && errors.length) {
      componentState.error = errors[0].message;
      return;
    }
    if (res) {
      componentState.error = null;
      state.setAuthData({
        user: res.user || null,
        token: res,
        config: state.config,
        loading: false
      });
    }
    if (onLogin) {
      onLogin(res);
    }
  } catch (error) {
    componentState.loading = false;
    componentState.error = error?.message || "";
  }
};
const onSuccessClose = () => {
  componentState.successMessage = null;
};
const onErrorClose = () => {
  componentState.error = null;
};
const resendOtp = async () => {
  componentState.successMessage = null;
  try {
    componentState.sendingOtp = true;
    const { data: res, errors } = await state.authorizerRef.resendOtp({
      email
    });
    componentState.sendingOtp = false;
    if (errors && errors.length) {
      componentState.error = errors[0].message;
      return;
    }
    if (res && res?.message) {
      componentState.error = null;
      componentState.successMessage = res.message;
    }
    if (onLogin) {
      onLogin(res);
    }
  } catch (error) {
    componentState.loading = false;
    componentState.error = error?.message || "";
  }
};
</script>

{#if componentState.successMessage}
	<Message
		type={MessageType.Success}
		text={componentState.successMessage}
		onClose={onSuccessClose}
	/>
{/if}
{#if componentState.error}
	<Message type={MessageType.Error} text={componentState.error} onClose={onErrorClose} />
{/if}
<p style="text-align: center; margin: 10px 0px;">
	Please enter the OTP you received on your email address.
</p>
<br />
<form on:submit|preventDefault={onSubmit} name="authorizer-mfa-otp-form">
	<StyledFormGroup hasError={!!otpError}>
		<label slot="form-input-label" class="form-input-label" for="authorizer-verify-otp">
			<span> * </span>
			OTP (One Time Password)
		</label>
		<input
			id="authorizer-verify-otp"
			slot="form-input-field"
			class={otpError ? 'form-input-field input-error-content' : 'form-input-field'}
			placeholder="eg. AB123C"
			type="password"
			bind:value={componentState.otp}
		/>
		<div slot="form-input-error" class="form-input-error">
			{otpError}
		</div>
	</StyledFormGroup>
	<br />
	<StyledButton appearance={ButtonAppearance.Primary} disabled={!!otpError || !componentState.otp}>
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
			<StyledLink on:click={resendOtp} marginBottom={'10px'}>Resend OTP</StyledLink>
		{/if}
		{#if state.config.is_sign_up_enabled}
			<div>
				Don't have an account?
				<StyledLink on:click={() => setView && setView(Views.Signup)}>Sign Up</StyledLink>
			</div>
		{/if}
	</StyledFooter>
{/if}
