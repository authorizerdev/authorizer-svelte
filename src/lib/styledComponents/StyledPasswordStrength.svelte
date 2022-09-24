<script lang="ts">
	import { passwordStrengthIndicatorOpacity } from '../constants';

	export let strength: string = 'default';
</script>

<div
	class="styled-password-strength"
	style="opacity: {passwordStrengthIndicatorOpacity[strength]};"
>
	<slot />
</div>

<style>
	.styled-password-strength {
		width: 100%;
		height: 10px;
		flex: 0.75;
		border-radius: 5px;
		margin-right: 5px;
		background-color: var(--authorizer-primary-color);
	}
</style>
