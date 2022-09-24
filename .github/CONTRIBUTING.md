# Contributing

We're so excited you're interested in helping with Authorizer! We are happy to help you get started, even if you don't have any previous open-source experience :blush:

## New to Open Source?

1. Take a look at [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
2. Go through the [Authorizer Code of Conduct](https://github.com/authorizerdev/authorizer-svelete/blob/main/.github/CODE_OF_CONDUCT.md)

## Where to ask questions?

1. Check our [Github Issues](https://github.com/authorizerdev/authorizer/issues) to see if someone has already answered your question.
2. Join our community on [Discord](https://discord.gg/Zv2D5h6kkK) and feel free to ask us your questions

As you gain experience with Authorizer, please help answer other people's questions! :pray:

## What to work on?

You can get started by taking a look at our [Github issues](https://github.com/authorizerdev/authorizer-svelte/issues)
If you find one that looks interesting and no one else is already working on it, comment on that issue and start contributing 🙂.

Please ask as many questions as you need, either directly in the issue or on [Discord](https://discord.gg/Zv2D5h6kkK). We're happy to help!:raised_hands:

### Contributions that are ALWAYS welcome

1. More tests
2. Improved Docs
3. Improved error messages
4. Educational content like blogs, videos, courses

## Development Setup

### Prerequisites

- OS: Linux or macOS or windows
- NodeJS: >= v16.17.1

### Familiarize yourself with Authorizer

1. [Architecture of Authorizer](http://docs.authorizer.dev/)
2. [GraphQL APIs](https://docs.authorizer.dev/core/graphql-api/)
3. [authorizer-js](https://docs.authorizer.dev/authorizer-js). authorizer-js is used under the hood to make requests to authorizer server.

### Project Setup for Authorizer svelte

1. Fork the [authorizer](https://github.com/authorizerdev/authorizer-svelte) repository (**Skip this step if you have access to repo**)
2. Clone repo: `git clone https://github.com/authorizerdev/authorizer-svelte.git` or use the forked url from step 1
3. Change directory to authorizer: `cd authorizer-svelte`
4. Install dependencies `npm install` or `yarn`
5. Update authorizer URL in `src/routes/+layout.svelte` if you are not using local instance of authorizer.
6. Make necessary changes in `src/lib`
7. Run in development mode `npm run dev` or `yarn dev`
