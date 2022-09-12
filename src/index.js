/**
 * Export your components to apps.
 * More:
 * - https://github.com/sveltejs/component-template#consuming-components
 * - https://github.com/rollup/rollup-plugin-svelte#pkgsvelte
 * @see {@link ../package.json}
 */
import AuthorizerProvider from './components/AuthorizerProvider.svelte'
import AuthorizerSignup from './components/AuthorizerSignup.svelte'
import AuthorizerBasicAuthLogin from './components/AuthorizerBasicAuthLogin.svelte'
import AuthorizerMagicLinkLogin from './components/AuthorizerMagicLinkLogin.svelte'
import AuthorizerForgotPassword from './components/AuthorizerForgotPassword.svelte'
import AuthorizerSocialLogin from './components/AuthorizerSocialLogin.svelte'
import AuthorizerResetPassword from './components/AuthorizerResetPassword.svelte'
import AuthorizerVerifyOtp from './components/AuthorizerVerifyOtp.svelte'
import AuthorizerRoot from './components/AuthorizerRoot.svelte'
import { store } from './store/index'

export {
  AuthorizerProvider,
  AuthorizerSignup,
  AuthorizerBasicAuthLogin,
  AuthorizerMagicLinkLogin,
  AuthorizerForgotPassword,
  AuthorizerSocialLogin,
  AuthorizerResetPassword,
  AuthorizerVerifyOtp,
  AuthorizerRoot as Authorizer,
  store
}
