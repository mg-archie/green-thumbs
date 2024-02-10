const typeDefs = `#graphql
type User {
  _id: ID
  username: String
  email: String
  plantCount: Int
  favouritedPlants: [Plant]
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

type Query {
  me: User
}

input SavedPlantInput {
  plantId: String!
  name: String!
  description: String!
  default_image: String
  link: String
}

type Mutation {
  
  login(email: String!, password: String!): AuthPayload!
  addUser(username: String!, email: String!, password: String!): AuthPayload!
  
  savePlant(_id: ID!): User!
}
`;

module.exports = typeDefs;

  // favouritedPlants(plantInput: PlantInput): User
  // removePlant(plantId: ID!): User