// import Organization from './organization';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,

  // basic info
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photoURL: { type: String, required: false },

  // backend use only
  userType: { type: String, required: true }, // reporter or developer
  // authenticationType: { type: String, required: true },

  // authorship
  submittedIssues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  // authors: { type: [String], required: true }, // syntax ref for multi-value array

  // Public view, Developer edit only
  organization: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  // associatedProducts: { type: [String], required: false },
  // associatedIssues: [{ type: Schema.Types.ObjectId, required: false, ref: 'Issue' }],
  description: { type: String, required: false },

  // image: { type: String, required: false }   // For future scope
});

// const Book = mongoose.model("Book", bookSchema);
const User = mongoose.model("User", userSchema);

module.exports = User;
