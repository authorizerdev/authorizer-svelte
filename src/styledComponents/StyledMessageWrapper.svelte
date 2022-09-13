<script>
  import { MessageType } from '../constants'

  export let type = MessageType.Success
</script>

<div
  class="styled-message-wrapper"
  style={type === MessageType.Error
    ? 'background-color: var(--danger-color)'
    : 'background-color: var(--success-color)'}
>
  <slot />
</div>

<style>
  .styled-message-wrapper {
    padding: 10px;
    color: white;
    border-radius: var(--radius-card);
    margin: 10px 0px;
    font-size: var(--fonts-small-text);
  }
</style>
