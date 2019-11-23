const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  issue: { type: Schema.Types.ObjectId, ref: 'Issue' },
  commenter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

  // Dev input. Shared view
  timestamps: { createdAt, updatedAt },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  // What is being or has been done. Push new items to array
  // Also provides "Final Resolution" by checking if status is Res/Closed

  // For future scope
  visibility: { type: String, required: true },
  /* 
  all: visible to all - plain comment
  org: visible to devs in org - internal share
  proj: visible to devs in proj - Action Description
  */
  image: { type: String, required: false },
  // Attachments can be stored elsewhere and referenced by this
  url: { type: String, required: false },

});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
