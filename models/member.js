const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  title: { type: String, required: false }, // CEO, Tech Lead, Engineer II, etc.
  role: { type: String, required: false }, // admin/manager/member/guest

  // One membership info is for one user from one org.
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
