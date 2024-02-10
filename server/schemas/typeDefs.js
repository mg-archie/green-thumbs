const typeDefs = `#graphql
type User {
  _id: ID
  username: String
  email: String
  plantCount: Int
  favouritedPlants: [Plant]
  blogs: [Blog]
}

type Blog {
  _id: ID!
  blogAuthor: String
  blogText: String
}

type Plant {
  plantId: String!
  description: String
  name: String!
  image: String
  lowLight: Boolean
  indoor: Boolean
  link: String
}


type AuthPayload {
  token: String!
  user: User!
}



input SavedPlantInput {
  plantId: String!
  name: String!
  description: String!
  default_image: String
  link: String
}

type Query {
  me: User
}

type Mutation {
  
  login(email: String!, password: String!): AuthPayload!
  addUser(username: String!, email: String!, password: String!): AuthPayload!
  removePlant(_id: ID!): User!
  savePlant(_id: ID!): User!
  addBlog(blogText: String!): Blog
}
`;

module.exports = typeDefs;

  // favouritedPlants(plantInput: PlantInput): User
  // removePlant(plantId: ID!): User