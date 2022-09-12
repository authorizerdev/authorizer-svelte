<script>
  import { Router, Route } from 'svelte-routing'
  import Dashboard from './routes/Dashboard.svelte'
  import Login from './routes/Login.svelte'
  import ResetPassword from './routes/ResetPassword.svelte'
  import { store } from '../../src/index'

  let state

  store.subscribe(data => {
    state = data
  })
</script>

<Router>
  <div>
    {#if state.loading}
      <h1>Loading...</h1>
    {:else if state.user}
      <Route path="/">
        <Dashboard />
      </Route>
    {:else}
      <Route path="reset-password">
        <ResetPassword />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    {/if}
  </div>
</Router>
