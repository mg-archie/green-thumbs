const typeDefs = `
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

type Comment{
 commentBody
}

type Blog {
    
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
}

input PlantInput {
  plantId: String!
  authors: [String]
  description: String
  title: String!
  image: String
  link: String
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  favouritedPlants(plantInput: PlantInput): User
  removePlant(plantId: ID!): User
}
`;

module.exports = typeDefs;