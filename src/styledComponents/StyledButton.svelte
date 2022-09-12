<script>
  import { ButtonAppearance } from '../constants'

  export let style = {
    width: '100%'
  }
  export let appearance = 'Default'
  export let disabled = false
</script>

<button
  class="styled-button"
  style="width: {style.width};
  background-color: {disabled
    ? 'var(--primary-disabled-color)'
    : appearance === ButtonAppearance.Primary
    ? 'var(--primary-color)'
    : '#ffffff'};
    color: {appearance === ButtonAppearance.Default
    ? 'var(--text-color)'
    : '#ffffff'};
    border: {appearance === ButtonAppearance.Primary ? '0px' : '1px'};"
  {disabled}
>
  <slot />
</button>

<style>
  .styled-button {
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 64px;
    border-radius: var(--radius-button);
    border-color: var(--text-color) !important;
    border-style: solid !important;
    cursor: pointer;
    position: relative;
  }
  .styled-button:disabled {
    cursor: not-allowed;
    background-color: var(--primary-disabled-color);
  }
</style>
