const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const notesSchema = new Schema(
  {
    notesName: { type: String, required: true },
    employeeName: {
      type : ObjectId,
      ref: 'Employee',
      required: true
      },
  },
  {
    timestamps: true,
  }
);

const notes = mongoose.model("notes", notesSchema);

module.exports = notes;