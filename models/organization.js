const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  url: { type: String, required: false },
  email: String,
  member: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
