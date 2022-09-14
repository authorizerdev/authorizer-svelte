<script>
  export let flexDirection = 'row'
  export let alignItems = 'center'
  export let justifyContent = 'center'
  export let wrap = 'wrap'
  export let width = 'inherit'
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
