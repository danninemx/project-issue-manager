const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  reporter: { type: Schema.Types.ObjectId, ref: 'User' },

  // type: { type: String, required: true }, // technical(default)/business process/change management/resource/third party
  // technical(default)/business process/change management/resource/third party
  type: String,
  // timing: { type: String, required: true }, // When was issue identified
  timing: Date, // When was issue identified

  // Reporter input. Shared view
  // project's provider
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' }, // immutable
  project: { type: Schema.Types.ObjectId, ref: 'Project' }, // immutable
  version: { type: Schema.Types.ObjectId, ref: 'Version' }, // added 11/25 // immutable
  // subject: String,
  // description: String,
  // organization: [{ type: Schema.Types.ObjectId, required: true, ref: 'Organization' }], // project's provider
  // project: [{ type: Schema.Types.ObjectId, required: true, ref: 'project' }], // project
  subject: { type: String, required: true },
  description: { type: String, required: true },
  url: String, // Attachments can be stored elsewhere and referenced by this
  // url: { type: String, required: false }, // Attachments can be stored elsewhere and referenced by this

  // Shared input. Shared view
  // status: { type: String, required: true },
  status: String,
  /*
  open: submitted by user
  investigating: in dev review
  implementing: being fixed
  escalated: being fixed with strong effort
  resolved: by dev
  closed: by user
  */

  // resolved: { type: Boolean, required: true }, // yes/no. Default is no
  resolved: Boolean, // true/false. Default is false

  // Dev input only. Optionally shared view
  // What is being or has been done. Push new items to array
  // Provides action descriptions by devs. (visibility on)
  // Also "Final Resolution" by checking if status is Res/Closed and getting item[actionDescriptions/length]

  // Developer input & view
  owner: { type: Schema.Types.ObjectId, ref: 'User' },

  priority: String,
  targetResolutionDate: Date,
  potentialImpact: String,
  // owner: [{ type: [Schema.Types.ObjectId], required: false, ref: 'Member' }],
  // priority: { type: String, required: false }, // default is "medium". Can be changed to low or high
  // targetResolutionDate: { type: Date, required: false },
  // potentialImpact: { type: String, required: false }, // serves as reasoning for priority

  // For future scope
  imageURL: String,
  partImpacted: String,
  // image: { type: String, required: false },
  // partImpacted: { type: String, required: false }  // which part of the project is impacted

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // sequential array

  reporterName: String,
  organizationName: String,
  projectName: String,
  versionName: String,
  issueSubject: String
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
