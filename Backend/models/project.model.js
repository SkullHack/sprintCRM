const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    projectKey: { type: String, required: true },
    projectType: { type: String, required: true },
    projectCategory: { type: String, required: true },
    lead: {
      type: ObjectId,
      ref: "Employee",
    },
    clientCompanyName: {
      type: ObjectId,
      ref: "Company",
    },
    clientID: {
      type: ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

// projectName: { type: String, required: true },
// startDate: { type: Date, required: true },
// endDate: { type: Date },
// requirements: { type: String },
// key: { type: String, required: true },
// team: [{ type: String }],
// type: { type: String },
// category: { type: String },
// lead: { type: String },
// designId: { type: String },
// version: { type: String },
// deploymentType: { type: String },
// vcLink: { type: String },
// clientID: { type: String },
