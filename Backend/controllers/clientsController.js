const Client = require("../models/client.model");
const Company = require("../models/company.model");
const Project = require("../models/project.model");
const bcrypt = require("bcryptjs");

exports.viewSpecificClients = async (req, res) => {
  const id = req.query.id;
  try {
    const clients = await Client.find({ clientCompanyName: id });
    res.json({ clients });
  } catch (err) {
    console.log(err, "clientsController.viewSpecificClients error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.viewSpecificCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const companies = await Company.findById(id);
    res.json(companies);
  } catch (err) {
    console.log(err, "clientsController.viewSpecificCompany error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.viewClientsForChat = async (req, res) => {
  const id = req.params.id;
  try {
    const clients = await Client.findById(id);
    res.json({ clients });
  } catch (err) {
    console.log(err, "clientsController.viewClientsForChat error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.viewAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json({
      companies,
    });
  } catch (err) {
    console.log(err, "clientsController.viewAllCompanies error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.searchCompany = async (req, res) => {
  try {
    var regex = new RegExp(req.params.companyName, "i");
    Company.find({ companyName: regex }).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err, "clientsController.searchCompany error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.addNewClient = async (req, res) => {
  const {
    clientFirstName,
    clientLastName,
    clientContactNumber,
    clientJob,
    clientAddress,
    clientDOB,
    clientEmail,
    clientNIC,
    clientCompanyName,
    clientUsername,
    clientPassword,
    clientProfilePic,
  } = req.body;

  try {
    const newClient = new Client();
    newClient.clientFirstName = clientFirstName;
    newClient.clientLastName = clientLastName;
    newClient.clientContactNumber = clientContactNumber;
    newClient.clientJob = clientJob;
    newClient.clientAddress = clientAddress;
    newClient.clientDOB = clientDOB;
    newClient.clientEmail = clientEmail;
    newClient.clientNIC = clientNIC;
    newClient.clientCompanyName = clientCompanyName;
    newClient.clientUsername = clientUsername;

    const salt = await bcrypt.genSalt(10);
    newClient.clientPassword = await bcrypt.hash(clientPassword, salt);

    newClient.clientProfilePic = clientProfilePic;

    await newClient.save();
    res.json({
      successMsg: "Added Client Successfully",
    });
  } catch (err) {
    console.log("clientsController error - Add Client ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

exports.addNewCompany = async (req, res) => {
  const {
    companyName,
    companyAddress,
    companyRegNumber,
    companyContactNumber,
    companyLogo,
  } = req.body;

  const company = await Company.findOne({ companyName });
  if (company) {
    return res.status(400).json({
      errorMsg: `${req.body.companyName} already exists`,
    });
  }

  try {
    const newCompany = new Company();
    newCompany.companyName = companyName;
    newCompany.companyAddress = companyAddress;
    newCompany.companyRegNumber = companyRegNumber;
    newCompany.companyContactNumber = companyContactNumber;
    newCompany.companyLogo = companyLogo;

    await newCompany.save();
    res.json({
      successMsg: `${req.body.companyName} Company Added Successfully`,
    });
  } catch (err) {
    console.log("clientsController error - Add Company ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Reload and Try again",
    });
  }
};

exports.deleteClient = async (req, res) => {
  const id = req.query.id;
  try {
    const project = await Project.find({ clientID: id });
    console.log(project);
    if (Object.keys(project).length == "") {
      const deletedClient = await Client.findByIdAndDelete(id);
      res.status(200).json(deletedClient);
    } else {
      res.status(500).json({
        errorMessage: "Cannot delete client!",
      });
    }
  } catch (err) {
    console.log(err, "clientsController.delete error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.editCompany = async (req, res) => {
  const id = req.body._id;
  try {
    const company = await Company.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    res.json({
      successMsg: `${req.body.companyName} Company Updated Successfully`,
    });
  } catch (err) {
    console.log(err, "clientsController.updateCompany error");
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};

exports.editClient = async (req, res) => {
  const id = req.body._id;
  try {
    const client = await Client.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    res.json({
      successMsg: `Details of ${req.body.clientFirstName} Updated Successfully`,
    });
  } catch (err) {
    console.log(err, "clientsController.updateClient error");
    res.status(500).json({
      errorMsg: "Please try again later",
    });
  }
};

/*Used for testing purpose */
exports.addNewProject = async (req, res) => {
  const {
    projectName,
    startDate,
    endDate,
    requirements,
    key,
    team,
    type,
    category,
    lead,
    designId,
    version,
    deploymentType,
    vcLink,
    clientID,
  } = req.body;

  try {
    const newProject = new Project();
    newProject.projectName = projectName;
    newProject.startDate = startDate;
    newProject.endDate = endDate;
    newProject.requirements = requirements;
    newProject.key = key;
    newProject.team = team;
    newProject.type = type;
    newProject.category = category;
    newProject.lead = lead;
    newProject.designId = designId;
    newProject.version = version;
    newProject.deploymentType = deploymentType;
    newProject.vcLink = vcLink;
    newProject.clientID = clientID;

    await newProject.save();
    res.json({
      successMsg: "Added project Successfully",
    });
  } catch (err) {
    console.log("clientsController error - Add project ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

/*********************************************************** */

exports.deleteCompany = async (req, res) => {
  const id = req.query.id;
  try {
    const client = await Client.find({ clientCompanyName: id });

    if (Object.keys(client).length == "") {
      const deletedCompany = await Company.findByIdAndDelete(id);

      res.status(200).json(deletedCompany);
    } else {
      res.status(500).json({
        errorMessage: "Cannot delete company!",
      });
    }
  } catch (err) {
    console.log(err, "clientsController.delete error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

//add retrieval for consult
exports.viewAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json({
      clients,
    });
  } catch (err) {
    console.log(err, "clientsController.viewAllClients error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
