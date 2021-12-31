const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ganttDataSchema = new Schema({
  id: { type: Number, default: 0 },
  text: { type: String },
  start_date: { type: String },
  duration: { type: Number },
  progress: { type: Number },
  parent: { type: Number },
  open: { type: Boolean },
});

const ganttData = mongoose.model("GanttData", ganttDataSchema);

module.exports = ganttData;
