// src/lib/apollo.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "../store/auth";

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

export const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    const token = useAuthStore.getState().token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
