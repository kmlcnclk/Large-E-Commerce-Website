// // import { ApolloClient, InMemoryCache } from "@apollo/client";

// // const client = new ApolloClient({
// //   uri: "https://countries.trevorblades.com",
// //   cache: new InMemoryCache(),
// // });

// // export default client;

// import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
// import { setContext } from "@apollo/client/link/context";

// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     graphqlErrors.forEach(({ message, locations, path }) => {
//       // console.log(`GraphQl error ${message}`);
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });
//   }
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const link = from([
//   errorLink,
//   new HttpLink({ uri: "http://localhost:3000/api/graphql" }),
// ]);

// const authLink = setContext((_, { headers }) => {
//   //   const token = getAccessTokenLocal()[0];

//   const token = "";

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer: ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(link),
//   cache: new InMemoryCache(),
// });

// export default client;

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { useMemo } from 'react';
import { onError } from '@apollo/client/link/error';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // console.log(`GraphQl error ${message}`);
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createIsomorphicLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    // const { resolvers } = require("../pages/api/Server/Resolvers/resolvers");
    // const { typeDefs } = require("../pages/api/Server/TypeDefs/typeDefs");
    const { schema } = require('./schema');

    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require('@apollo/client/link/http');

    const link = from([errorLink, new HttpLink({ uri: '/api/graphql' })]);

    return link;
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Category: {
          keyFields: ['name', 'slug', '_id'],
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
