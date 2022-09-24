<script type="ts">
	import { ButtonAppearance } from '../constants';

	export let style: Record<string, string> = {
		width: '100%'
	};
	export let appearance: ButtonAppearance = ButtonAppearance.Default;
	export let disabled: boolean = false;
</script>

<button
	class="styled-button"
	style="width: {style.width};
  background-color: {disabled
		? 'var(--authorizer-primary-disabled-color)'
		: appearance === ButtonAppearance.Primary
		? 'var(--authorizer-primary-color)'
		: 'var(--authorizer-white-color)'};
    color: {appearance === ButtonAppearance.Default
		? 'var(--authorizer-text-color)'
		: 'var(--authorizer-white-color)'};
    border: {appearance === ButtonAppearance.Primary ? '0px' : '1px'};"
	{disabled}
	on:click
>
	<slot />
</button>

<style>
	.styled-button {
		padding: 15px 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 375px;
		max-height: 64px;
		border-radius: var(--authorizer-radius-button);
		border-color: var(--authorizer-text-color) !important;
		border-style: solid !important;
		cursor: pointer;
		position: relative;
	}
	.styled-button:disabled {
		cursor: not-allowed;
		background-color: var(--authorizer-primary-disabled-color);
	}
</style>
