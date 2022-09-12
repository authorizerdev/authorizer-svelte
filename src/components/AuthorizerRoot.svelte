<script>
  import { StyledWrapper, StyledButton } from '../styledComponents/index'
  import { ButtonAppearance } from '../constants'
  import Google from '../icons/Google.svelte'
</script>

<!-- <StyledWrapper /> -->
<StyledButton appearance={ButtonAppearance.Default}>
  <Google />
  Sign in with Apple
</StyledButton>

<style></style>
