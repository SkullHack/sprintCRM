const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyRegNumber: { type: String, required: true },
    companyContactNumber: {type: Number, required: true },
    companyLogo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
