<script>
  import { MessageType } from '../constants'

  export let type = MessageType.Success
</script>

<div
  class="styled-message-wrapper"
  style={type === MessageType.Error
    ? 'background-color: var(--authorizer-danger-color)'
    : 'background-color: var(--authorizer-success-color)'}
>
  <slot />
</div>

<style>
  .styled-message-wrapper {
    padding: 10px;
    color: white;
    border-radius: var(--authorizer-radius-card);
    margin: 10px 0px;
    font-size: var(--authorizer-fonts-small-text);
  }
</style>
