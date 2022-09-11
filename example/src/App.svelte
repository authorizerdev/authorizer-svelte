<script>
	import {
		AuthorizerProvider,
		AuthorizerSignup,
		AuthorizerBasicAuthLogin,
		AuthorizerMagicLinkLogin,
		AuthorizerForgotPassword,
		AuthorizerSocialLogin,
		AuthorizerResetPassword,
		AuthorizerVerifyOtp,
		Authorizer 
	} from '../../src/index'
</script>

<main>
	<AuthorizerProvider />
	<AuthorizerSignup />
	<AuthorizerBasicAuthLogin />
	<AuthorizerMagicLinkLogin />
	<AuthorizerForgotPassword />
	<AuthorizerSocialLogin />
	<AuthorizerResetPassword />
	<AuthorizerVerifyOtp />
	<Authorizer />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>