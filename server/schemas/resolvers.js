// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    users: async () => {
      return User.find()
        .select('-__v -password');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    savePlant: async (parent, { plantInput }, context) => {
      console.log('plantInput: ', plantInput);
      // console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { favouritedPlants: plantInput } },
          { new: true, runValidators: true }
          );
          return updatedUser;
        }
      throw AuthenticationError;
    },
    //plantId needs to be changed once we figure out API
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favouritedPlants: { plantId: plantId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;
