import { gql } from '@apollo/client';
// import { gql } from 'apollo-angular';

// import { gql } from 'graphql-request';

// User
export const GET_ALL_USER = gql`
  query {
    allUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const CREATE_USER = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation (
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    removeUser(id: $id) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

// JSON_FORM
export const GET_JSON_FORM = gql`
  query {
    allJsonForms {
      formFields
      formList
    }
  }
`;

// AUTH
export const SIGN_UP = gql`
  mutation ($registerUser: UserInput!) {
    signUp(registerUser: $registerUser) {
      id
      firstName
      lastName
      email
      password
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN = gql`
  query ($request: LoginUser!) {
    login(request: $request) {
      id
      firstName
      lastName
      email
      password
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation {
    refresh {
      id
      firstName
      lastName
      email
      password
      accessToken
      refreshToken
    }
  }
`;

export const FIND_ALL = gql`
  query finAll {
    findAll {
      id
      email
      firstName
      lastName
      password
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout {
      accessToken
      refreshToken
    }
  }
`;
