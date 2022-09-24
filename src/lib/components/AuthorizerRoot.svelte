<script type="ts">
	import { StyledWrapper } from '../styledComponents';
	import AuthorizerSignup from './AuthorizerSignup.svelte';
	import AuthorizerSocialLogin from './AuthorizerSocialLogin.svelte';
	import AuthorizerBasicAuthLogin from './AuthorizerBasicAuthLogin.svelte';
	import AuthorizerMagicLinkLogin from './AuthorizerMagicLinkLogin.svelte';
	import AuthorizerForgotPassword from './AuthorizerForgotPassword.svelte';
	import { store } from '../store';
	import { Views } from '../constants';
	import { hasWindow } from '../utils/window';
	import { createRandomString } from '../utils/common';
	import type { AuthorizerState } from '../types';

	export let onLogin: Function | undefined = undefined;
	export let onSignup: Function | undefined = undefined;
	export let onMagicLinkLogin: Function | undefined = undefined;
	export let onForgotPassword: Function | undefined = undefined;

	let state: AuthorizerState;
	let view = Views.Login;

	store.subscribe((data) => {
		state = data;
	});

	let urlProps: any;

	let searchParams = new URLSearchParams(hasWindow() ? window.location.search : ``);

	$: {
		const paramsState = searchParams.get('state') || createRandomString();
		const scope = searchParams.get('scope')
			? searchParams.get('scope')?.toString().split(' ')
			: ['openid', 'profile', 'email'];
		urlProps = {
			state: paramsState,
			scope
		};
		const redirectURL = searchParams.get('redirect_uri') || searchParams.get('redirectURL');
		if (redirectURL) {
			urlProps.redirectURL = redirectURL;
		} else {
			urlProps.redirectURL = hasWindow() ? window.location.origin : redirectURL;
		}
		urlProps.redirect_uri = urlProps.redirectURL;
	}

	const setView = (viewType: Views) => {
		view = viewType;
	};
</script>

<StyledWrapper>
	<AuthorizerSocialLogin {urlProps} />
	{#if view === Views.Login && state.config.is_basic_authentication_enabled && !state.config.is_magic_link_login_enabled}
		<AuthorizerBasicAuthLogin {setView} {onLogin} {urlProps} />
	{/if}
	{#if view === Views.Signup && state.config.is_basic_authentication_enabled && !state.config.is_magic_link_login_enabled && state.config.is_sign_up_enabled}
		<AuthorizerSignup {setView} {onSignup} {urlProps} />
	{/if}
	{#if view === Views.Login && state.config.is_magic_link_login_enabled}
		<AuthorizerMagicLinkLogin {onMagicLinkLogin} {urlProps} />
	{/if}
	{#if view === Views.ForgotPassword}
		<AuthorizerForgotPassword {setView} {onForgotPassword} {urlProps} />
	{/if}
</StyledWrapper>
