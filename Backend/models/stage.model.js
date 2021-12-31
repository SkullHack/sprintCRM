const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stageSchema = new Schema(
  {
    stageName: { type: String, required: true },
    stageDescription: { type: String, required: true},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    createdDate: { type: Date, required: true},
    status: {type: String, required: true},
    subTask: { type: String },
    substartDate: { type: Date },
    subendDate: { type: Date },
    projectID:{
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const stage = mongoose.model("stage", stageSchema);

module.exports = stage;
