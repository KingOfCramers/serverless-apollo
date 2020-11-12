# Basic Serverless & GraphQL Apollo Configuration

This project is a template for creating an Apollo-GraphQL API with Serverless, on Amazon AWS Lambda.

The functions are written in Typescript. For information about loading the `.env` files, head [here](https://www.serverless.com/plugins/serverless-dotenv-plugin).

## Installation

`yarn install`

## Development

To spin up the development server locally, run `yarn dev`

This is an alias for the `serverless offline` command which uses the serverless-offline plugin to spin up a development server with our lambdas at various endpoints.

The functions can then be hit with Postman, Curl, or another service. Alternatively, we've provided the GraphQL playground library which lets you hit the various endpoints.

For more information on connecting serverless with GraphQL Apollo, go [here](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)

## Deployment

`yarn deploy`

This command set the `NODE_ENV` to production, loading the correct environment variables, and then deploys the function to the cloud (configuration inside the `serverless.ts` file).
