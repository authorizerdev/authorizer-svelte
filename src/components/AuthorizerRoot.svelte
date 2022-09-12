<script>
  import { StyledWrapper, StyledButton } from '../styledComponents/index'
  import { ButtonAppearance } from '../constants'
  import Apple from '../icons/Apple.svelte'
</script>

<!-- <StyledWrapper /> -->
<StyledButton appearance={ButtonAppearance.Default}>
  <Apple />
  Sign in with Apple
</StyledButton>

<style></style>
