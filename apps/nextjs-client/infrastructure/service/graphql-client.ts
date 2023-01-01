import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:5000/graphql';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'Bearer MY_TOKEN',
  },
});
