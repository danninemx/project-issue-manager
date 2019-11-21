// import Issue from './issue';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  version: [{ type: [Schema.Types.ObjectId], ref: 'Version' }],
  teamMember: [{ type: [Schema.Types.ObjectId], ref: 'Member' }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
