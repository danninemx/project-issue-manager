const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  // partnered project possible
  organization: { type: Schema.Types.ObjectId, required: false, ref: 'Organization' }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
