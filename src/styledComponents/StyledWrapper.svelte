<div class="styled-wrapper">
  <slot />
</div>

<style>
  .styled-wrapper {
    font-family: var(--fonts-font-stack);
    color: var(--text-color);
    font-size: var(--fonts-medium-text);
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
</style>
