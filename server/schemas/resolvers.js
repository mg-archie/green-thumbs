// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError();
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
        throw new AuthenticationError();
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError();
      }

      const token = signToken(user);

      return { token, user };
    },
    savePlant: async (parent, { plantId }, context) => {
      console.log('plantInput: ', plantId);
      console.log(context.user);
      if (!context.user) {
        throw new AuthenticationError();
      }
      // Find the plant by ID
      const plant = await Plant.findOneOrCreate(plantId);
     

      if (!plant) {
        throw new Error('Plant not found.');
      }
      console.log(context.user._id);
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { favouritedPlants: plant._id } },
        { new: true }
      )
      .populate("favouritedPlants");
      return updatedUser;
      
    },
    //plantId needs to be changed once we figure out API
    removePlant: async (parent, { _id }, context) => {
      console.log('_id', _id);
      console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favouritedPlants: _id } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError();
    },
    addBlog: async (parent, { blogText }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add a blog.');
      }

      try {
        // Create a new blog
        const newBlog = new Blog({
          blogText,
          blogAuthor: context.user._id,
        });

        // Save the blog to the database
        await newBlog.save();

        // Add the blog to the user's list of blogs
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { blogs: newBlog._id } },
          { new: true }
        )
        .populate('blogs');

        return user;
      } catch (error) {
        throw new Error('Failed to add blog: ' + error.message);
      }
    },

    removeBlog: async (parent, { _id }, context) => {
      console.log('_id', _id);
      console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blogs: _id } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError();
    },
    addComment: async (parent, { _id, commentBody }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add a comment.');
      }

      console.log(context.user);

      try {
        // Find the blog by ID
        const blog = await Blog.findById(_id);
        console.log(_id);

        if (!blog) {
          throw new Error('Blog not found.');
        }

        // create the comment
        const newComment =  await Comment.create({
          commentBody,
          commentAuthor: context.user._id,

        });


        console.log(newComment._id);
        console.log(context.user._id);
        //Add the comment to the user's list of blogs
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { comments: newComment._id } },
          { new: true }
        );
        console.log(context.user._id);
        console.log(newComment._id);

        // Add the comment to the blog
        const updatedBlog = await Blog.findOneAndUpdate(
          { _id },
          { $push: { comments: newComment._id } },
          { new: true }
        )
        .populate('comments');


        return updatedBlog;
      } catch (error) {
        throw new Error('Failed to add comment: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
