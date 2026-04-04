<script lang="ts">
	import { StyledWrapper, StyledButton, StyledFormGroup } from '../styledComponents';
	import { store } from '../store';
	import { MessageType, ButtonAppearance } from '../constants';
	import Message from './/Message.svelte';
	import { getSearchParams } from '../utils/url';
	import PasswordStrengthIndicator from './PasswordStrengthIndicator.svelte';
	import type { AuthorizerState } from '../types';

	function isValidRedirectUri(uri: string, allowedRedirect?: string): boolean {
		try {
			const url = new URL(uri, window.location.origin);
			if (url.origin === window.location.origin) return true;
			if (allowedRedirect) {
				const allowed = new URL(allowedRedirect);
				if (url.origin === allowed.origin) return true;
			}
			return false;
		} catch {
			return false;
		}
	}

	export let onReset: Function | undefined = undefined;

	let state: AuthorizerState;
	let componentState: {
		error: string | null;
		loading: boolean;
		disableContinueButton: boolean;
	} = {
		error: null,
		loading: false,
		disableContinueButton: false
	};
	let formData: Record<string, any> = {
		password: null,
		confirmPassword: null
	};

	const { token, redirect_uri } = getSearchParams();

	$: errorData = {
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
	};

	$: componentState.error = !token ? 'Invalid token' : null;

	store.subscribe((data) => {
		state = data;
	});

	const onSubmit = async () => {
		componentState.loading = true;
		try {
			const { data: res, errors } = await state.authorizerRef.resetPassword({
				token,
				password: formData.password,
				confirm_password: formData.confirmPassword
			});
			componentState.loading = false;
			if (errors && errors.length) {
				componentState.error = errors[0].message;
				return;
			}
			componentState.error = null;
			if (onReset) {
				onReset(res);
			} else {
					const fallback = state.config.redirectURL || window.location.origin;
				const target = redirect_uri && isValidRedirectUri(redirect_uri, state.config.redirectURL)
					? redirect_uri
					: fallback;
				window.location.href = target;
			}
		} catch (error: any) {
			componentState.loading = false;
			componentState.error = error?.message || '';
		}
	};
	const setDisableButton = (value: boolean) => {
		componentState.disableContinueButton = value;
	};
	const onErrorClose = () => {
		componentState.error = null;
	};
</script>

<StyledWrapper>
	{#if componentState.error}
		<Message type={MessageType.Error} text={componentState.error} onClose={onErrorClose} />
	{/if}
	<form on:submit|preventDefault={onSubmit} name="authorizer-reset-password-form">
		<StyledFormGroup hasError={!!errorData.password}>
			<label slot="form-input-label" class="form-input-label" for="authorizer-reset-password">
				<span> * </span>
				Password
			</label>
			<input
				id="authorizer-reset-password"
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
		<StyledFormGroup hasError={!!errorData.confirmPassword}>
			<label slot="form-input-label" class="form-input-label" for="authorizer-reset-confirm-password">
				<span> * </span>
				Confirm Password
			</label>
			<input
				id="authorizer-reset-confirm-password"
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
			<PasswordStrengthIndicator value={formData.password || ''} {setDisableButton} />
			<br />
		{/if}
		<StyledButton
			appearance={ButtonAppearance.Primary}
			disabled={!formData.password ||
				!formData.confirmPassword ||
				Boolean(errorData.password) ||
				Boolean(errorData.confirmPassword) ||
				componentState.loading ||
				componentState.disableContinueButton}
		>
			{#if componentState.loading}
				Processing ...
			{:else}
				Continue
			{/if}
		</StyledButton>
	</form>
</StyledWrapper>
