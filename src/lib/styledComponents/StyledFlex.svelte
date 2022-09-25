<script lang="ts">
	export let flexDirection: string = 'row';
	export let alignItems: string = 'center';
	export let justifyContent: string = 'center';
	export let wrap: string = 'wrap';
	export let width: string = 'inherit';
</script>

<div
	class="styled-flex"
	style="flex-direction: {flexDirection};
	align-items: {alignItems};
	justify-content: {justifyContent};
	flex-wrap: {wrap};
	width: {width};"
>
	<slot />
</div>

<style>
	.styled-flex {
		display: flex;
	}
</style>
