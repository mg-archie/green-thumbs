const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
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
      match: [/.+@.+\..+/, 'Must use a valid email address'],
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) 
{console.log(this.isNew);
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.pre('insertMany', async function (next, docs){
  for (let i=0; i<docs.length; i++){
    const doc = docs[i];
    const saltRounds = 10;
    doc.password = await bcrypt.hash(doc.password, saltRounds);
  }
  next()
})

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `plantCount` with the number of saved books we have
userSchema.virtual('plantCount').get(function () {
  return this.favouritedPlants.length;
});
// when we query a user, we'll also get another field called `commentCount` with the number of saved books we have
userSchema.virtual('commentCount').get(function () {
  return this.comment
})
// when we query a user, we'll also get another field called `blogCount` with the number of saved books we have
userSchema.virtual('blogCount').get(function () {
  return this.blogs.length;
});



const User = model('User', userSchema);

module.exports = User;
