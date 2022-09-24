<script lang="ts">
	import { StyledButton, StyledFormGroup, StyledFooter, StyledLink } from '../styledComponents';
	import { store } from '../store';
	import AuthorizerVerifyOtp from './AuthorizerVerifyOtp.svelte';
	import Message from './Message.svelte';
	import { ButtonAppearance, MessageType, Views } from '../constants';
	import { isValidEmail } from '../utils/common';
	import type { AuthorizerState } from '../types';
	import type { LoginInput } from '@authorizerdev/authorizer-js';

	export let setView: Function | undefined = undefined;
	export let onLogin: Function | undefined = undefined;
	export let urlProps: Record<string, any> = {};

	let state: AuthorizerState;
	let componentState: Record<string, any> = {
		loading: false,
		error: null
	};
	let formData: Record<string, any> = {
		email: null,
		password: null
	};
	let otpData: Record<string, any> = {
		isScreenVisible: false,
		email: null
	};

	store.subscribe((data) => {
		state = data;
	});

	$: errorData = {
		email:
			formData.email === ''
				? 'Email is required'
				: formData.email && !isValidEmail(formData.email)
				? 'Please enter valid email'
				: null,
		password: formData.password === '' ? 'Password is required' : null
	};

	const onErrorClose = () => {
		componentState.error = null;
	};
	const onSubmit = async () => {
		componentState.loading = true;
		try {
			const data: LoginInput = {
				email: formData?.email || '',
				password: formData?.password || ''
			};
			if (urlProps.scope) {
				data.scope = urlProps.scope;
			}
			const res = await state.authorizerRef.login(data);
			if (res && res?.should_show_otp_screen) {
				otpData = {
					isScreenVisible: true,
					email: data?.email
				};
				return;
			}
			if (res) {
				componentState.error = null;
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
				});
			}
			if (onLogin) {
				onLogin(res);
			}
		} catch (error: any) {
			componentState.loading = false;
			componentState.error = error?.message || 'Internal error!';
		}
	};
</script>

{#if otpData.isScreenVisible}
	<AuthorizerVerifyOtp {setView} {onLogin} email={otpData.email} />
{:else}
	<div>
		{#if componentState.error}
			<Message type={MessageType.Error} text={componentState.error} onClose={onErrorClose} />
		{/if}
		<form on:submit|preventDefault={onSubmit}>
			<StyledFormGroup hasError={!!errorData.email}>
				<label slot="form-input-label" class="form-input-label" for="">
					<span> * </span>
					Email
				</label>
				<input
					slot="form-input-field"
					class={errorData.email ? 'form-input-field input-error-content' : 'form-input-field'}
					placeholder="eg. foo@bar.com"
					type="email"
					bind:value={formData.email}
				/>
				<div slot="form-input-error" class="form-input-error">
					{errorData.email}
				</div>
			</StyledFormGroup>
			<StyledFormGroup hasError={!!errorData.password}>
				<label slot="form-input-label" class="form-input-label" for="">
					<span> * </span>
					Password
				</label>
				<input
					slot="form-input-field"
					class={errorData.password ? 'form-input-field input-error-content' : 'form-input-field'}
					placeholder="********"
					type="password"
					bind:value={formData.password}
				/>
				<div slot="form-input-error" class="form-input-error">
					{errorData.password}
				</div>
			</StyledFormGroup>
			<br />
			<StyledButton
				appearance={ButtonAppearance.Primary}
				disabled={componentState.loading ||
					errorData.email ||
					errorData.password ||
					!formData.email ||
					!formData.password}
			>
				{#if componentState.loading}
					Processing ...
				{:else}
					Log In
				{/if}
			</StyledButton>
		</form>
		{#if setView}
			<StyledFooter>
				<StyledLink on:click={() => setView && setView(Views.ForgotPassword)} marginBottom={'10px'}>
					Forgot Password?
				</StyledLink>
				{#if state.config.is_sign_up_enabled}
					<div>
						Don't have an account?
						<StyledLink on:click={() => setView && setView(Views.Signup)}>Sign Up</StyledLink>
					</div>
				{/if}
			</StyledFooter>
		{/if}
	</div>
{/if}

<style></style>
