<script>
  export let viewBox
  export let width = '16px'
  export let height = '16px'
  export let fill = '#000000'
</script>

<svg
  {viewBox}
  {width}
  {height}
  {fill}
  style="position: absolute; left: {'10px'}"
>
  <slot />
</svg>
