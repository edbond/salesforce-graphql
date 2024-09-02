# Example GraphQL Server for Salesforce

This is a simple GraphQL server built with Apollo Server and Express.js, specifically designed for managing a list of todos in a Salesforce environment.

Use this with External Graphql connector in Salesforce.


## Getting Started

1. Install dependencies:

```
npm install
```

2. Build the project:

```
npm run build
```

3. Start the server:

```
npm start
```

The server will be running at `http://localhost:4000`.

## Development

To start the development server with hot reloading, run:

```
npm run dev
```

## GraphQL API

The server exposes the following GraphQL operations:

### Queries

- `todo`: Retrieve a list of todos with filtering, sorting, and pagination options.
- `node`: Retrieve a single todo by its ID.

### Mutations

- `create_Todo`: Create a new todo.
- `delete_Todo`: Delete an existing todo by its ID.
- `update_Todo`: Update an existing todo by its ID.

For more details on the available queries, mutations, and input types, refer to the `schema.ts` file.

## Project Structure

- `index.ts`: Entry point of the application.
- `schema.ts`: Contains the GraphQL schema definition.
- `resolvers.ts`: Implements the resolvers for the GraphQL operations.
- `models/Todo.ts`: Defines the `Todo` model.
- `db.ts`: Simulates a database with a hardcoded list of todos.

## Dependencies

- `@apollo/server`: Apollo Server for building the GraphQL server.
- `graphql`: GraphQL.js library for parsing and executing GraphQL queries.
- `graphql-tag`: Utility for parsing GraphQL queries.
- `cors`: CORS middleware for Express.js.
- `express`: Web application framework for Node.js.
- `raw-body`: Utility for reading the raw request body.

## Development Dependencies

- `@types/cors`: TypeScript type definitions for `cors`.
- `@types/node`: TypeScript type definitions for Node.js.
- `ts-node-dev`: Development server with hot reloading for TypeScript.
- `typescript`: TypeScript compiler.
