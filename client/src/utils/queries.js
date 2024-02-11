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
