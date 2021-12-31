const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    occupation: { type: String },
    accessLevel: { type: Number },
    mobilePhone: { type: Number },
    AddressNum: { type: String },
    AddressLineOne: { type: String },
    AddressLineTwo: { type: String },
    province: { type: String },
    postcode: { type: Number },
    nic: { type: String },
  },
  {
    timestamps: true,
  }
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
