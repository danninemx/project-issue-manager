// import User from './user';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  title: { type: String, required: false }, // CEO, Tech Lead, Engineer II, etc.
  role: { type: String, required: false }, // admin/manager/member/guest

  // If an org exists, at least the creator should be within
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
