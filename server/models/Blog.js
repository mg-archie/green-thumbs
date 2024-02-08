const { Schema, model } = require('mongoose');
const moment = require('moment');

const blogSchema = new Schema({
  blogText: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  blogAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
  comments: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
  ],
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
