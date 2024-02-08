const { Schema, model } = require('mongoose');

const plantSchema = require('./Plant');


const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    // set savedPlants to be an array of data that adheres to the plantSchema
    favouritedPlants: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Plant',
      },
    ],
    blogs: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Blog',
      },
    ], 
  });

const User = model('User', userSchema);

module.exports = User;
