const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  issue: { type: Schema.Types.ObjectId, ref: 'Issue' },
  commenter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

  // Dev input. Shared view
  subject: { type: String, required: true },
  actionDescription: [{ type: String, required: true }],
  // What is being or has been done. Push new items to array.
  // e.g. Changed priority to X and made 3 others.
  // Also provides "Final Resolution" by checking if status is Res/Closed
  // Determine string value via JS logic

  comment: String, // "How and Why" the action was taken. Subjective.

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

  timing: Date, // optional. for future scope?
  timestamps: { createdAt }, // auto generated, shared view
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
