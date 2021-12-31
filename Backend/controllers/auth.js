const Employee = require("../models/employee");
const stage = require("../models/stage.model");
const Client = require("../models/client.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtExpire, jwtSecret } = require("../config/keys");

//register employee

exports.employeeRegisterController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    occupation,
    mobilePhone,
    AddressNum,
    AddressLineOne,
    AddressLineTwo,
    province,
    postcode,
    nic,
  } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({
        errorMsg: "Email already exists",
      });
    }

    const newEmployee = new Employee();
    newEmployee.firstName = firstName;
    newEmployee.lastName = lastName;
    newEmployee.email = email;

    const salt = await bcrypt.genSalt(10);
    newEmployee.password = await bcrypt.hash(password, salt);
    newEmployee.occupation = occupation;
    if (
      occupation === "Admin" ||
      occupation === "Project Manager" ||
      occupation === "HOD"
    ) {
      newEmployee.accessLevel = 1;
    } else {
      newEmployee.accessLevel = 0;
    }

    newEmployee.mobilePhone = mobilePhone;
    newEmployee.AddressNum = AddressNum;
    newEmployee.AddressLineOne = AddressLineOne;
    newEmployee.AddressLineTwo = AddressLineTwo;
    newEmployee.province = province;
    newEmployee.postcode = postcode;
    newEmployee.nic = nic;

    await newEmployee.save();
    res.json({
      successMsg: "New Employee Added Successfully!",
    });
  } catch (err) {
    console.log("employeeRegisterController error", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

//employee login
exports.employeeLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({
        errorMsg: "Invalid credentials.",
      });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMsg: "Invalid credentials.",
      });
    }

    //payload
    const payload = {
      employee: {
        _id: employee._id,
      },
    };

    await jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpire },
      (err, token) => {
        if (err) console.log("jwt error: ", err);
        const {
          _id,
          firstName,
          lastName,
          email,
          password,
          occupation,
          mobilePhone,
          AddressNum,
          AddressLineOne,
          AddressLineTwo,
          province,
          postcode,
          nic,
          accessLevel,
        } = employee;

        res.json({
          token,
          employee: {
            _id,
            firstName,
            lastName,
            email,
            password,
            occupation,
            mobilePhone,
            AddressNum,
            AddressLineOne,
            AddressLineTwo,
            province,
            postcode,
            nic,
            accessLevel,
          },
        });
      }
    );
  } catch (err) {
    console.log("employeeLoginController error", err);
    res.status(500).json({
      errorMsg: "Server Error.",
    });
  }
};

exports.clientLoginController = async (req, res) => {
  const { clientEmail, password } = req.body;

  try {
    const clients = await Client.findOne({ clientEmail });
    if (!clients) {
      return res.status(400).json({
        errorMsg: "Invalid credentials.",
      });
    }
    const isMatch = await bcrypt.compare(
      req.body.clientPassword,
      clients.clientPassword
    );
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        errorMsg: "Invalid credentials.",
      });
    }

    //payload
    const payload = {
      clients: {
        _id: clients._id,
      },
    };

    await jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpire },
      (err, token) => {
        if (err) console.log("jwt error: ", err);
        const {
          _id,
          clientFirstName,
          clientLastName,
          clientEmail,
          clientJob,
          clientAddress,
          clientDOB,
          clientContactNumber,
          clientProfilePic,
        } = clients;

        res.json({
          token,
          clients: {
            _id,
            clientFirstName,
            clientLastName,
            clientEmail,
            clientJob,
            clientAddress,
            clientDOB,
            clientContactNumber,
            clientProfilePic,
          },
        });
      }
    );
  } catch (err) {
    console.log("ClientLoginController error Backend", err);
    res.status(500).json({
      errorMsg: "Server Error.",
    });
  }
};

//stage controller
exports.addStageController = async (req, res) => {
  const {
    projectID,
    stageName,
    stageDescription,
    startDate,
    endDate,
    createdDate,
    status,
    subTask,
    substartDate,
    subendDate,
  } = req.body;
  console.log(req.body);

  try {
    const newstage = new stage();
    newstage.stageName = stageName;
    newstage.stageDescription = stageDescription;
    newstage.startDate = startDate;
    newstage.endDate = endDate;
    newstage.createdDate = createdDate;
    newstage.status = status;
    newstage.subTask = subTask;
    newstage.substartDate = substartDate;
    newstage.subendDate = subendDate;
    newstage.projectID = projectID;

    await newstage.save();
    res.json({
      successMsg: "STAGE ADDED SUCESSFULLY",
    });
  } catch (err) {
    console.log("addStageController error", err);
    res.status(500).json({
      errorMsg: "server error. please try again",
    });
  }
};

exports.viewAllProjectManagers = async (req, res) => {
  try {
    const employeePM = await Employee.find({ occupation: "Project Manager" });
    res.status(200).json({
      employeePM,
    });
  } catch (err) {
    console.log(err, "viewAllProjectManagers error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
