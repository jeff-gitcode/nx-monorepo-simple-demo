import { ApolloClient, createHttpLink, DefaultOptions, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { HYGRAPH_URL } from '../lib/constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      //   authorization: `Bearer ${HYGRAPH_PERMANENTAUTH_TOKEN}`,
    },
  };
});

export const graphQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
