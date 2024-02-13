import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_PLANT = gql`
  mutation savedPlant($plantInput: PlantInput!) {
    savePlant(plantInput: $plantInput) {
      _id
      username
      email
      savedPlants
    }
  }
`;

export const REMOVE_PLANT = gql`
  mutation removePlant($plantId: ID!) {
    removePlant(plantId: $plantId) {
      plantId
    }
  }
`;

export const REMOVE_BLOG = gql`
  mutation removeBlog($blogId: ID!) {
    removeBlog(blogId: $blogId) {
      _id
    }
  }
`;