<script>
  import { AuthorizerProvider } from '../../src/index'
</script>

<main>
  <AuthorizerProvider
    config={{
      authorizerURL: 'http://localhost:8080'
    }}
    onStateChangeCallback={async state => {
      console.log('state change from client ==>> ', state)
    }}
  >
    <div>Example App</div>
  </AuthorizerProvider>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
