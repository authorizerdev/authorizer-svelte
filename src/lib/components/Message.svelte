<script lang="ts">
  import { MessageType } from '../constants'
  import { Close } from '../icons'
  import { StyledMessageWrapper, StyledFlex } from '../styledComponents'
  import { capitalizeFirstLetter } from '../utils/common'

  export let type = MessageType.Success
  export let text = ''
  export let onClose:() => void
</script>

<StyledMessageWrapper {type}>
  <StyledFlex justifyContent="space-between">
    <div style="flex: 1;">{capitalizeFirstLetter(text)}</div>
    {#if onClose}
      <span style="cursor: pointer;" on:click={onClose}>
        <Close />
      </span>
    {/if}
  </StyledFlex>
</StyledMessageWrapper>
