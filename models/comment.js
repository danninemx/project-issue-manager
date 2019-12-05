const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  version: { type: Schema.Types.ObjectId, ref: 'Version' },
  issue: { type: Schema.Types.ObjectId, ref: 'Issue' },
  commenter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

  // Dev input. Shared view
  // subject: { type: String, required: true }, //retired. too much separation
  actionDescription: [String],
  // What is being or has been done. Push new items to array.
  // e.g. Changed priority to X and made 3 others.
  // Also provides "Final Resolution" by checking if status is Res/Closed
  // Determine string value via JS logic

  comment: String, // "How and Why" the action was taken. Subjective.

  // For future scope
  visibility: String,
  /* 
  'Everyone': visible to all - plain comment
  'Organization members only': visible to devs in org - internal share

  Others for future scope.
  proj: visible to devs in proj - Action Description
  */
  avatar: String,
  // Formerly intended for attachments; relegated to description. Now for profile picture.

  // url: { type: String, required: false }, // retired.

  // timing: Date, // optional. for future scope? retired - too much separation.
  timestamps: {
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: false }
  }, // auto generated, shared view

  commenterName: String
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
