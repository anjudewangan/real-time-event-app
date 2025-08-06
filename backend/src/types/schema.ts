import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    events: [Event!]!
    me: User
  }

  type Mutation {
    joinEvent(eventId: ID!): Event!
  }
`;

const resolvers = {
  Query: {
    events: () => [],
    me: () => ({ id: "1", name: "Test User", email: "test@example.com" })
  },
  Mutation: {
    joinEvent: (_: any, { eventId }: any) => {
      return {
        id: eventId,
        name: "Sample Event",
        location: "Somewhere",
        startTime: new Date().toISOString(),
        attendees: []
      };
    }
  }
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
