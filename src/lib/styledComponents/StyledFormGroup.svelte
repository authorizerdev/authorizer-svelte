<script lang="ts">
	export let hasError: boolean = true;
</script>

<div class="styled-form-group">
	<slot name="form-input-label" />
	<slot name="form-input-field" />
	{#if hasError}
		<slot name="form-input-error" />
	{/if}
</div>

<style>
	.styled-form-group {
		width: 100%;
		border: 0px;
		background-color: var(--authorizer-white-color);
		padding: 0 0 15px;
	}
	div :global(.form-input-label) {
		padding: 2.5px;
	}
	div :global(.form-input-label > span) {
		color: var(--authorizer-danger-color);
	}
	div :global(.form-input-field) {
		width: 94.5%;
		margin-top: 5px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: var(--authorizer-radius-input);
		border: 1px;
		border-style: solid;
		border-color: var(--authorizer-text-color);
	}
	div :global(.input-error-content) {
		border-color: var(--authorizer-danger-color) !important;
	}
	div :global(.input-error-content:hover) {
		outline-color: var(--authorizer-danger-color);
	}
	div :global(.input-error-content:focus) {
		outline-color: var(--authorizer-danger-color);
	}
	div :global(.form-input-error) {
		font-size: 12px;
		font-weight: 400;
		color: red;
		border-color: var(--authorizer-danger-color);
	}
</style>
