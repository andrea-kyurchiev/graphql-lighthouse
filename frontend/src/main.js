import { createApp } from 'vue';
import { createApolloProvider } from '@vue/apollo-option';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import App from './App.vue';
import router from './router';
import store from './store';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

createApp(App)
  .use(store)
  .use(router)
  .use(apolloProvider)
  .mount('#app');