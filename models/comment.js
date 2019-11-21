const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  commenter: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }], // Allows user participation

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
  url: { type: String, required: false }, // Attachments can be stored elsewhere and referenced by this

});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
