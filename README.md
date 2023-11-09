# authorizer-svelte

Svelte SDK for [authorizer.dev](https://authorizer.dev) integration in your [svelte-js](https://svelte.dev/) application. This will allow you to have authentication and authorization ready in minutes.

For detailed information about all the components check [docs](https://docs.authorizer.dev/authorizer-svelte)

## Getting Started

Here is a quick guide on getting started with `@authorizerdev/authorizer-svelte` package.

### Step 1 - Create Instance

Get Authorizer URL by instantiating [Authorizer instance](/deployment) and configuring it with necessary [environment variables](/core/env).

### Step 2 - Install package

Assuming you have svelte-js application up and running, install following package in your application

```sh
npm i --save @authorizerdev/authorizer-svelte
OR
yarn add @authorizerdev/authorizer-svelte
```

### Step 3 - Configure Provider and use Authorizer Component

Authorizer comes with global context `authorizerContext` which is available once you have configured `AuthorizerProvider` component.

Configure `AuthorizerProvider` at root level in your application and import `default.css`.

> Note: You can override default style with `css` variables. Check [docs](https://docs.authorizer.dev/authorizer-svelte) for more details.

`eg: routes/+layout.svelte`

```svelte
<script>
	import { AuthorizerProvider } from '@authorizerdev/authorizer-svelte';
	import '@authorizerdev/authorizer-svelte/styles/default.css';
</script>

<AuthorizerProvider
    config={{
        authorizerURL: `YOUR_AUTHORIZER_INSTANCE_URL`
        redirectURL: typeof window != 'undefined' ? window.location.origin : ``
        client_id: 'YOUR_CLIENT_ID'
    }}
>
    <slot />
</AuthorizerProvider>
```

**Use `Authorizer` Component**

`eg: routes/+page.svelte`

```svelte
<script>
	import { getContext } from 'svelte';
	import { Authorizer } from '@authorizerdev/authorizer-svelte';

	/**
	 * @type {{ token: string; user: any; loading: boolean; logout: Function; }}
	 */
	let state;

	const store = getContext('authorizerContext');

	store.subscribe((/** @type {any} */ data) => {
		state = data;
	});

	const logoutHandler = async () => {
		await state.logout();
	};
</script>

{#if state.user}
	<div>
		<h1>Hey 👋,</h1>
		<span>{state.user.email}</span>
		<br />
		{#if state.loading}
			<h3>Processing....</h3>
		{:else}
			<h3 style="color: #3B82F6; cursor: pointer;" on:click={logoutHandler}>Logout</h3>
		{/if}
	</div>
{:else}
	<div class="login-container">
		<h1>Welcome to Authorizer</h1>
		<br />
		<Authorizer />
	</div>
{/if}
```

## Support our work

Github Sponsorship: https://github.com/sponsors/authorizerdev
