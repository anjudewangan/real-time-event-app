// src/index.ts
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer, { cors: { origin: "*" } });

  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { user: req.user, io };
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(4000, () => {
    console.log('🚀 Server running at http://localhost:4000/graphql');
  });
})();
