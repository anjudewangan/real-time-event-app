import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { Server } from 'socket.io';
import { schema } from './types/schema';
import { createContext } from './context';

async function startServer() {
  const app = express();
  app.use(cors());

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const server = new ApolloServer({
    schema,
    context: createContext,
  });

  await server.start();
  server.applyMiddleware({ app: app as any });


  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
