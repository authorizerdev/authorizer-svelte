<script>
  import { Router, Route } from 'svelte-routing'
  import Dashboard from './routes/Dashboard.svelte'
  import Login from './routes/Login.svelte'
  import ResetPassword from './routes/ResetPassword.svelte'
  import { store } from '../../src/store/index'

  let state

  store.subscribe(data => {
    state = data
  })
</script>

<Router>
  <div>
    {#if state.loading}
      <h1>Loading...</h1>
    {:else if state.token}
      <Route path="/" component={Dashboard} />
    {:else}
      <Route path="reset-password" component={ResetPassword} />
      <Route path="/" component={Login} />
    {/if}
  </div>
</Router>
