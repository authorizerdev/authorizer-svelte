<script>
  import { ButtonAppearance } from '../constants'

  export let style = {
    width: '100%'
  }
  export let appearance = ButtonAppearance.Default
  export let disabled = false
</script>

<button
  class="styled-button"
  style="width: {style.width};
  background-color: {disabled
    ? 'var(--primary-disabled-color)'
    : appearance === ButtonAppearance.Primary
    ? 'var(--primary-color)'
    : 'var(--white-color)'};
    color: {appearance === ButtonAppearance.Default
    ? 'var(--text-color)'
    : 'var(--white-color)'};
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
