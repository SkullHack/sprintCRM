const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const consultSchema = new Schema(
  {
    consultTitle: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    clientName: {
      type : ObjectId,
      ref: 'Client',
      required: true
    },
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

const Consult = mongoose.model("Consult", consultSchema);

module.exports = Consult;
