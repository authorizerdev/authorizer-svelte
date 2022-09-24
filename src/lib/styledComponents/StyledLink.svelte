<script>
  export let marginBottom = '0px'
</script>

<span class="styled-link" style="margin-bottom: {marginBottom};" on:click>
  <slot />
</span>

<style>
  .styled-link {
    color: var(--authorizer-primary-color);
    cursor: pointer;
  }
</style>
