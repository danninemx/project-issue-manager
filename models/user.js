const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // basic info
  email: { type: String, required: true, unique: true },
  displayName: String,

  firstName: String, // may not find use
  lastName: String,
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  photoURL: { type: String, required: false },

  // authorship
  // submittedIssues: [{ type: [Schema.Types.ObjectId], ref: 'Issue' }],
  // authors: { type: [String], required: true }, // syntax ref for multi-value array

  // backend use only
  userType: { type: String, required: true }, // user/reporter or developer

  // Developer type only
  affiliatedOrganization: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  affiliatedProject: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
