// import Member from './member';
// import Product from './project';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  url: { type: String, required: false },

  // Defined in this file
  project: [{ type: [Schema.Types.ObjectId], ref: 'Project' }],
  member: [{ type: [Schema.Types.ObjectId], ref: 'Member' }]
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
