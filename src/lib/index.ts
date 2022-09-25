// Reexport your entry components here
import AuthorizerProvider from './components/AuthorizerProvider.svelte';
import AuthorizerSignup from './components/AuthorizerSignup.svelte';
import AuthorizerBasicAuthLogin from './components/AuthorizerBasicAuthLogin.svelte';
import AuthorizerMagicLinkLogin from './components/AuthorizerMagicLinkLogin.svelte';
import AuthorizerForgotPassword from './components/AuthorizerForgotPassword.svelte';
import AuthorizerSocialLogin from './components/AuthorizerSocialLogin.svelte';
import AuthorizerResetPassword from './components/AuthorizerResetPassword.svelte';
import AuthorizerVerifyOtp from './components/AuthorizerVerifyOtp.svelte';
import AuthorizerRoot from './components/AuthorizerRoot.svelte';

export {
	AuthorizerProvider,
	AuthorizerSignup,
	AuthorizerBasicAuthLogin,
	AuthorizerMagicLinkLogin,
	AuthorizerForgotPassword,
	AuthorizerSocialLogin,
	AuthorizerResetPassword,
	AuthorizerVerifyOtp,
	AuthorizerRoot as Authorizer
};
