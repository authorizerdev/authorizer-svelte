<script>import { StyledWrapper } from "../styledComponents";
import AuthorizerSignup from "./AuthorizerSignup.svelte";
import AuthorizerSocialLogin from "./AuthorizerSocialLogin.svelte";
import AuthorizerBasicAuthLogin from "./AuthorizerBasicAuthLogin.svelte";
import AuthorizerMagicLinkLogin from "./AuthorizerMagicLinkLogin.svelte";
import AuthorizerForgotPassword from "./AuthorizerForgotPassword.svelte";
import { store } from "../store";
import { Views } from "../constants";
import { hasWindow } from "../utils/window";
import { createRandomString } from "../utils/common";
export let onLogin = void 0;
export let onSignup = void 0;
export let onMagicLinkLogin = void 0;
export let onForgotPassword = void 0;
export let roles = void 0;
let state;
let view = Views.Login;
store.subscribe((data) => {
  state = data;
});
let urlProps;
let searchParams = new URLSearchParams(hasWindow() ? window.location.search : ``);
$: {
  const paramsState = searchParams.get("state") || createRandomString();
  const scope = searchParams.get("scope") ? searchParams.get("scope")?.toString().split(" ") : ["openid", "profile", "email"];
  urlProps = {
    state: paramsState,
    scope
  };
  const redirectURL = searchParams.get("redirect_uri") || searchParams.get("redirectURL");
  if (redirectURL) {
    urlProps.redirectURL = redirectURL;
  } else {
    urlProps.redirectURL = hasWindow() ? window.location.origin : redirectURL;
  }
  urlProps.redirect_uri = urlProps.redirectURL;
}
const setView = (viewType) => {
  view = viewType;
};
</script>

<StyledWrapper>
	<AuthorizerSocialLogin {urlProps} {roles} />
	{#if view === Views.Login && state.config.is_basic_authentication_enabled && !state.config.is_magic_link_login_enabled}
		<AuthorizerBasicAuthLogin {setView} {onLogin} {urlProps} {roles} />
	{/if}
	{#if view === Views.Signup && state.config.is_basic_authentication_enabled && !state.config.is_magic_link_login_enabled && state.config.is_sign_up_enabled}
		<AuthorizerSignup {setView} {onSignup} {urlProps} {roles} />
	{/if}
	{#if view === Views.Login && state.config.is_magic_link_login_enabled}
		<AuthorizerMagicLinkLogin {onMagicLinkLogin} {urlProps} {roles} />
	{/if}
	{#if view === Views.ForgotPassword}
		<AuthorizerForgotPassword {setView} {onForgotPassword} {urlProps} />
	{/if}
</StyledWrapper>
