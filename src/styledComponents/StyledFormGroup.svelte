<script>
  export let hasError = false
</script>

<div class="styled-form-group">
  <slot name="form-input-label" class="form-input-label" />
  <slot
    name="form-input-field"
    class="form-input-field {hasError ? 'input-error-content' : ''}"
    style="border-color: {hasError
      ? 'var(--danger-color)'
      : 'var(--text-color)'};"
  />
  <slot name="form-input-error" class="form-input-error" />
</div>

<style>
  .styled-form-group {
    width: 100%;
    border: 0px;
    background-color: var(--white-color);
    padding: 0 0 15px;
  }
  .styled-form-group .form-input-label {
    padding: 2.5px;
  }
  .input-error-content:hover {
    outline-color: var(--danger-color);
  }
  .styled-form-group .form-input-field {
    width: 100%;
    margin-top: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--radius-input);
    border: 1px;
    border-style: solid;
  }
  .styled-form-group .form-input-error {
    font-size: 12px;
    font-weight: 400;
    color: red;
  }
</style>
