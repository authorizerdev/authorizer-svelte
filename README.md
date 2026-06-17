# authorizer-svelte

Svelte SDK for [authorizer.dev](https://authorizer.dev). Adds authentication and authorization to your [Svelte](https://svelte.dev/) application in minutes. Current version: **1.0.0**.

For detailed component documentation see the [docs](https://docs.authorizer.dev/authorizer-svelte).

## Migration Guide: 0.x -> 1.0

v1.0.0 updates the underlying `@authorizerdev/authorizer-js` dependency to v3.x. The response shape of all SDK methods changed from returning data directly to a uniform `{ data, errors }` envelope. If you call SDK methods directly through the context store, update your call sites to destructure `data` from the response.

`AuthorizerProvider` now accepts a `protocol` prop.

## Getting Started

### Step 1 - Create an Authorizer instance

Deploy an Authorizer instance and grab the URL and client ID from the dashboard. See the [deployment guide](https://docs.authorizer.dev/deployment).

### Step 2 - Install package

```sh
npm i --save @authorizerdev/authorizer-svelte
# or
yarn add @authorizerdev/authorizer-svelte
```

### Step 3 - Configure provider and use components

Configure `AuthorizerProvider` at the root level of your application and import the default stylesheet.

`routes/+layout.svelte`

```svelte
<script>
  import { AuthorizerProvider } from '@authorizerdev/authorizer-svelte';
  import '@authorizerdev/authorizer-svelte/styles/default.css';
</script>

<AuthorizerProvider
  config={{
    authorizerURL: 'YOUR_AUTHORIZER_INSTANCE_URL',
    redirectURL: typeof window !== 'undefined' ? window.location.origin : '',
    client_id: 'YOUR_CLIENT_ID',
  }}
  protocol="graphql"
>
  <slot />
</AuthorizerProvider>
```

The `protocol` prop selects the transport used by the underlying `authorizer-js` v3 SDK: `'graphql'` (default) or `'rest'`.

`routes/+page.svelte`

```svelte
<script>
  import { getContext } from 'svelte';
  import { Authorizer } from '@authorizerdev/authorizer-svelte';

  let state;
  const store = getContext('authorizerContext');
  store.subscribe((data) => {
    state = data;
  });

  const logoutHandler = async () => {
    await state.logout();
  };
</script>

{#if state.user}
  <div>
    <h1>Hello, {state.user.email}</h1>
    {#if state.loading}
      <p>Processing...</p>
    {:else}
      <button on:click={logoutHandler}>Logout</button>
    {/if}
  </div>
{:else}
  <div class="login-container">
    <h1>Welcome to Authorizer</h1>
    <Authorizer />
  </div>
{/if}
```

### `AuthorizerProvider` props

| Prop       | Type                    | Required | Description                                                 |
| ---------- | ----------------------- | -------- | ----------------------------------------------------------- |
| `config`   | `ConfigType`            | Yes      | Authorizer connection config (see below)                    |
| `protocol` | `'graphql' \| 'rest'`   | No       | Transport protocol. Defaults to `'graphql'`                 |

### `config` fields

| Field                                    | Type      | Description                                       |
| ---------------------------------------- | --------- | ------------------------------------------------- |
| `authorizerURL`                          | `string`  | Base URL of your Authorizer instance              |
| `redirectURL`                            | `string`  | URL to redirect to after login                    |
| `client_id`                              | `string`  | Client ID from the dashboard                      |
| `is_google_login_enabled`                | `boolean` | Google social login                               |
| `is_github_login_enabled`                | `boolean` | GitHub social login                               |
| `is_facebook_login_enabled`              | `boolean` | Facebook social login                             |
| `is_linkedin_login_enabled`              | `boolean` | LinkedIn social login                             |
| `is_apple_login_enabled`                 | `boolean` | Apple social login                                |
| `is_twitter_login_enabled`               | `boolean` | Twitter/X social login                            |
| `is_microsoft_login_enabled`             | `boolean` | Microsoft social login                            |
| `is_twitch_login_enabled`                | `boolean` | Twitch social login                               |
| `is_discord_login_enabled`               | `boolean` | Discord social login                              |
| `is_roblox_login_enabled`                | `boolean` | Roblox social login                               |
| `is_basic_authentication_enabled`        | `boolean` | Email/password login                              |
| `is_magic_link_login_enabled`            | `boolean` | Magic link (passwordless) login                   |
| `is_sign_up_enabled`                     | `boolean` | Allow new user registration                       |
| `is_strong_password_enabled`             | `boolean` | Enforce strong password policy                    |
| `is_multi_factor_auth_enabled`           | `boolean` | TOTP-based two-factor authentication              |
| `is_mobile_basic_authentication_enabled` | `boolean` | Mobile (phone number + password) authentication   |
| `is_phone_verification_enabled`          | `boolean` | Phone number OTP verification                     |

These fields are populated automatically from the server's `/api/meta` response when the provider mounts. Override defaults by supplying them in the `config` prop.

---

## Support

GitHub Sponsorship: https://github.com/sponsors/authorizerdev

---

## Release

1. Bump the version in `package.json`.
2. Tag the commit: `git tag v<version>`
3. Push with tags: `git push origin main --tags`

The GitHub Actions release workflow handles npm publish and GitHub Release creation automatically.
