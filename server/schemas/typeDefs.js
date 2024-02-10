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


type AuthPayload {
  token: String!
  user: User!
}

type Query {
  login(email: String!, password: String!): AuthPayload!
}

type Query {
   me: User
   users: [User]
   user(username: String!): User
 }

input PlantInput {
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


// type User {
//   _id: ID
//   username: String
//   email: String
//   plantCount: Int
//   savedPlants: [Plant]
// }

// type Plant {
//   plantId: String!
//   description: String
//   name: String!
//   image: String
//   lowLight: Boolean
//   indoor: Boolean
//   link: String
// }

// type Comment{
//  commentBody
// }

// type Blog {
    
// }

// // type Auth {
// //   token: ID!
// //   user: User
// // }

// type AuthPayload {
//   token: String!
//   user: User!
// }

// type Query {
//   login(email: String!, password: String!): AuthPayload!
// }


// // type Query {
// //   me: User
// //   users: [User]
// //   user(username: String!): User
// // }

// input PlantInput {
//   plantId: String!
//   name: [String]
//   description: String
//   title: String!
//   image: String
//   link: String
// }

// type Mutation {
  
//   login(email: String!, password: String!): AuthPayload!
//   addUser(username: String!, email: String!, password: String!): AuthPayload!
//   favouritedPlants(plantInput: PlantInput): User
//   removePlant(plantId: ID!): User
// }