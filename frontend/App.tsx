import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoginScreen from './src/screens/LoginScreen';
import EventListScreen from './src/screens/EventListScreen';
import EventDetailScreen from './src/screens/EventDetailScreen'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'http://192.168.0.X:4000/graphql',
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EventList" component={EventListScreen} />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
