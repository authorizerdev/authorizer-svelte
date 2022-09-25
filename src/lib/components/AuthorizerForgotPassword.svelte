<script type="ts">
	import { StyledButton, StyledFormGroup, StyledFooter, StyledLink } from '../styledComponents';
	import { store } from '../store';
	import { isValidEmail } from '../utils/common';
	import { MessageType, ButtonAppearance, Views } from '../constants';
	import Message from './Message.svelte';
	import type { AuthorizerState } from '../types';

	export let setView: Function | undefined = undefined;
	export let onForgotPassword: Function | undefined = undefined;
	export let urlProps: Record<string, string> = {};

	let state: AuthorizerState;
	let componentState: {
		error: string | null;
		successMessage: string | null;
		loading: boolean;
		email: string | null;
	} = {
		error: null,
		successMessage: null,
		loading: false,
		email: null
	};

	$: emailError =
		componentState.email === ''
			? 'Email is required'
			: componentState.email && !isValidEmail(componentState.email)
			? 'Please enter valid email'
			: null;

	store.subscribe((data) => {
		state = data;
	});

	const onSubmit = async () => {
		try {
			componentState.loading = true;
			const res = await state.authorizerRef.forgotPassword({
				email: componentState.email || '',
				state: urlProps.state || '',
				redirect_uri: urlProps.redirect_uri || state.config.redirectURL || window.location.origin
			});
			componentState.loading = false;
			if (res && res.message) {
				componentState.error = null;
				componentState.successMessage = res.message;
			}
			if (onForgotPassword) {
				onForgotPassword(res);
			}
		} catch (error: any) {
			componentState.loading = false;
			componentState.error = error?.message || '';
		}
	};
	const onErrorClose = () => {
		componentState.error = null;
	};
</script>

{#if componentState.successMessage}
	<Message type={MessageType.Success} text={componentState.successMessage} />
{:else}
	{#if componentState.error}
		<Message type={MessageType.Error} text={componentState.error} onClose={onErrorClose} />
	{/if}
	<p style="text-align: center; margin: 10px 0px;">
		Please enter your email address.
		<br />
		We will send you an email to reset your password.
	</p>
	<br />
	<form on:submit|preventDefault={onSubmit}>
		<StyledFormGroup hasError={!!emailError}>
			<label slot="form-input-label" class="form-input-label" for="">
				<span> * </span>
				Email
			</label>
			<input
				slot="form-input-field"
				class={emailError ? 'form-input-field input-error-content' : 'form-input-field'}
				placeholder="eg. foo@bar.com"
				type="email"
				bind:value={componentState.email}
			/>
			<div slot="form-input-error" class="form-input-error">
				{emailError}
			</div>
		</StyledFormGroup>
		<br />
		<StyledButton
			appearance={ButtonAppearance.Primary}
			disabled={!componentState.email || Boolean(emailError) || componentState.loading}
		>
			{#if componentState.loading}
				Processing ...
			{:else}
				Send Email
			{/if}
		</StyledButton>
	</form>
	{#if setView}
		<StyledFooter>
			<div>
				Remember your password?
				<StyledLink on:click={() => setView && setView(Views.Login)}>Log In</StyledLink>
			</div>
		</StyledFooter>
	{/if}
{/if}
