<script>
  export let flexDirection = 'row'
  export let alignItems = 'center'
  export let justifyContent = 'center'
  export let wrap = 'wrap'
</script>

<div
  class="styled-flex"
  style="flex-direction: {flexDirection};
  align-items: {alignItems};
  justify-content: {justifyContent};
  flex-wrap: {wrap};"
>
  <slot />
</div>

<style>
  .styled-flex {
    display: flex;
  }
</style>
