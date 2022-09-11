<script>
  import { Router, Route } from 'svelte-routing'
  import Dashboard from './routes/Dashboard.svelte'
  import Login from './routes/Login.svelte'
  import ResetPassword from './routes/ResetPassword.svelte'
</script>

<Router>
  <div>
    <Route path="reset-password" component={ResetPassword} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="/"><Login /></Route>
  </div>
</Router>
