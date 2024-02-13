import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedPlants
    }
  }
`;

export const QUERY_PLANTS = gql`
query plants($plantIds: [ID]) {
  plants(plantIds: $plantIds) {
    plantId
    name
    description
    image
    indoor
    sunlight
    watering
  }
}
`

export const QUERY_PLANT = gql`
  query plant($plantId: ID) {
    plant(plantId: $plantId) {
      plantId
    }
  }
`

export const QUERY_ALL_BLOGS = gql`
  query allBlogs {
    allBlogs {
      _id
      blogText
      blogAuthor
      comments {
        _id
        commentBody
        commentAuthor
      }
    }
  }
`;
