import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import getRawBody from 'raw-body';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);

    // Log the raw request body without consuming it
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: 'utf-8'
    }, (err, body) => {
      if (err) {
        console.error('Error reading request body:', err);
        return res.status(400).send('Bad Request');
      }

      console.log(`Raw Request Body:`, body);

      // Modify the request body if it matches the pattern
      const modifiedBody = body.replace(/"variables":""/g, '"variables":{}');

      // Update the request body if it was modified
      if (modifiedBody !== body) {
        body = modifiedBody;
        console.log(`Modified Request Body:`, modifiedBody);
      }

      // Reset req.body with the parsed body
      req.body = JSON.parse(body);

      next();
    });
  });

  // Add Content-Type header to all requests
  app.use((req, res, next) => {
    req.headers['content-type'] = 'application/json';
    next();
  });

  // Enable CORS for all routes
  app.use(cors());

  // Apply the Apollo Server middleware
  app.use(
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000`);
}

startServer();