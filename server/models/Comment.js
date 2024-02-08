const { Schema, model } = require('mongoose');


const commentSchema = new Schema(
    {
       commentBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        commentAuthor: {
              type: Schema.Types.ObjectId,
              ref: 'commentAuthor'
        },
    },
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;