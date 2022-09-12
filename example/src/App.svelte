<script>
  import { AuthorizerProvider } from '../../src/index'
  import Router from './Router.svelte'
</script>

<main class="container">
  <div
    style="
        width: {'400px'};
        margin: {`10px auto`};
        border: {`1px solid #D1D5DB`};
        padding: {`25px 20px`};
        border-radius: {'5px'}
      "
  >
    <AuthorizerProvider
      config={{
        authorizerURL: 'http://localhost:8080'
      }}
      onStateChangeCallback={async state => {
        console.log('state change from client ==>> ', state)
      }}
    >
      <Router />
    </AuthorizerProvider>
  </div>
</main>

<style>
  main {
    font-family: -apple-system, system-ui, sans-serif;
    color: #374151;
    font-size: 14px;
  }

  .container {
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
