<script lang="ts">
	import { StyledButton, StyledFormGroup } from '../styledComponents';
	import { store } from '../store';
	import { MessageType, ButtonAppearance } from '../constants';
	import { isValidEmail } from '../utils/common';
	import Message from './Message.svelte';
	import type { AuthorizerState } from '../types';
	import type { MagicLinkLoginInput } from '@authorizerdev/authorizer-js';

	export let onMagicLinkLogin: Function | undefined = undefined;
	export let urlProps: {
		state: string;
		redirect_uri?: string | null;
	};
	export let roles: string[] | undefined = undefined;

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

	const onErrorClose = () => {
		componentState.error = null;
	};
	const onSubmit = async () => {
		try {
			componentState.loading = true;

			const data: MagicLinkLoginInput = {
				email: componentState.email || '',
				state: urlProps.state || '',
				redirect_uri: urlProps.redirect_uri || ''
			};

			if (roles && roles.length) {
				data.roles = roles;
			}

			const res = await state.authorizerRef.magicLinkLogin(data);
			componentState.loading = false;
			if (res) {
				componentState.error = null;
				componentState.successMessage = res.message || ``;
				if (onMagicLinkLogin) {
					onMagicLinkLogin(res);
				}
			}
			if (urlProps.redirect_uri) {
				setTimeout(() => {
					window.location.replace(urlProps.redirect_uri || '');
				}, 3000);
			}
		} catch (error: any) {
			componentState.loading = false;
			componentState.error = error?.message || '';
		}
	};
</script>

{#if componentState.successMessage}
	<Message type={MessageType.Success} text={componentState.successMessage} />
{:else}
	{#if componentState.error}
		<Message type={MessageType.Error} text={componentState.error} onClose={onErrorClose} />
	{/if}
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
{/if}
