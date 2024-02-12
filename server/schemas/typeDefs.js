const typeDefs = `#graphql
type User {
  _id: ID
  username: String
  email: String
  plantCount: Int
  savedPlants: [Plant]
  blogs: [Blog]
}

type Blog {
  _id: ID!
  blogAuthor: String
  blogText: String
  comments: [Comment]
}

type Comment {
  _id: ID!
  commentBody: String
  commentAuthor: String
}

type Plant {
  plantId: String!
  name: String
  description: String
  image: String
  sunLight: [String]
  indoor: Boolean
  watering: String
}

type AuthPayload {
  token: String!
  user: User!
}

input PlantInput {
  plantId: String!
  name: String
  description: String
  image: String
  sunlight: [String]
  indoor: Boolean
  watering: String
}

type Query {
  login(email: String!, password: String!): AuthPayload!
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
}

type Mutation {

  login(email: String!, password: String!): AuthPayload!
  addUser(username: String!, email: String!, password: String!): AuthPayload!
  removePlant(_id: ID!): User!
  savePlant(plantInput: PlantInput): User!
  addBlog(blogText: String!): User!
  removeBlog(_id: ID!): User!
  addComment(_id: ID!, commentBody: String!): Blog!
}
`;

module.exports = typeDefs;

// favouritedPlants(plantInput: PlantInput): User
// removePlant(plantId: ID!): User