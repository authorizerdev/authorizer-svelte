/**
 * Export your components to apps.
 * More:
 * - https://github.com/sveltejs/component-template#consuming-components
 * - https://github.com/rollup/rollup-plugin-svelte#pkgsvelte
 * @see {@link ../package.json}
 */
import AuthorizerProvider from './AuthorizerProvider.svelte'
import AuthorizerSignup from './AuthorizerSignup.svelte'
import AuthorizerBasicAuthLogin from './AuthorizerBasicAuthLogin.svelte'
import AuthorizerMagicLinkLogin from './AuthorizerMagicLinkLogin.svelte'
import AuthorizerForgotPassword from './AuthorizerForgotPassword.svelte'
import AuthorizerSocialLogin from './AuthorizerSocialLogin.svelte'
import AuthorizerResetPassword from './AuthorizerResetPassword.svelte'
import AuthorizerVerifyOtp from './AuthorizerVerifyOtp.svelte'
import AuthorizerRoot from './AuthorizerRoot.svelte'

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
}
