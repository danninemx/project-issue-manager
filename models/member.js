// import User from './user';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  _id: Schema.Types.ObjectId,
  // If an org exists, at least the creator should be within
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  title: { type: String, required: false }, // CEO, Tech Lead, Engineer II, etc.
  role: { type: String, required: false } // admin/manager/member/guest
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;