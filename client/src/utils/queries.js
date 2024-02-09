import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedPlants {
        plantId
        name
        description
        image
        link
      }
    }
  }
`;