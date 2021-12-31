const Project = require("../models/project.model");

//adding project
exports.addProjectController = async (req, res) => {
  const {
    projectName,
    projectKey,
    projectType,
    projectCategory,
    clientCompanyName,
    lead,
    clientID,
  } = req.body;

  try {
    const newProject = new Project();
    newProject.projectName = projectName;
    newProject.projectKey = projectKey;
    newProject.projectType = projectType;
    newProject.projectCategory = projectCategory;
    newProject.clientCompanyName = clientCompanyName;
    newProject.lead = lead;
    newProject.clientID = clientID;

    await newProject.save();
    res.json({
      successMsg: "Project Creation Success!",
    });
  } catch (err) {
    console.log("projectController error - Add Project ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

//api/projects/
exports.readAllProjectsController = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate({
        path: "clientCompanyName",
        select: ["companyName", "companyLogo"],
      })
      .populate({
        path: "lead",
        select: ["_id", "firstName", "lastName", "email"],
      });
    res.status(200).json({
      projects,
    });
  } catch (err) {
    console.log(" readAllProjectsController error ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

//getting project by ID
//api/projects/:id
exports.getProjectsByIDController = async (req, res) => {
  try {
    const pid = req.params.id;
    console.log(pid);

    const project = await Project.findById(pid)
      .populate("clientCompanyName")
      .populate("lead")
      .populate("clientID");
    if (!project) {
      return res.status(404).json({
        successMsg: "Project not found",
      });
    }
    res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(" getProjectsByIDController error ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try againn",
    });
  }
};

//search projects
exports.searchProjectsController = async (req, res) => {
  try {
    var regex = new RegExp(req.params.projectName, "i");
    Project.find({ projectName: regex }).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err, "searchProjectsController error");
    res.status(500).json({
      errorMessage: "Please try again",
    });
  }
};

//update project
///api/projects/:id
exports.updateProjectsController = async (req, res) => {
  try {
    const projectID = req.params.id;

    const project = await Project.findById(projectID);

    if (project) {
      project.projectName = req.body.projectName || project.projectName;
      project.projectKey = req.body.projectKey || project.projectKey;
      project.projectType = req.body.projectType || project.projectType;
      project.projectCategory =
        req.body.projectCategory || project.projectCategory;

      const updateProject = await project.save();
      res.status(200).json({
        success: true,
        project,
      });
    } else if (!project) {
      return res.status(404).json({
        errorMsg: "Project not found",
      });
    }
  } catch (err) {
    console.log(" updateProjectsController error ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

//delete project
//api/projects/:id
exports.deleteProjectsController = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        successMsg: "Project not found",
      });
    }
    await project.remove();
    res.status(200).json({
      success: true,
      successMsg: "Project is deleted",
    });
  } catch (err) {
    console.log(" deleteProjectsController error ", err);
    res.status(500).json({
      errorMsg: "Server Error. Please Try again",
    });
  }
};

//retrieve projects of given client ID
exports.viewRelatedProjectsController = async(req,res)=>{
  const id = req.params.id;
    try{
      const project = await Project.find({clientID: id}).populate("clientCompanyName").populate("lead");
      res.json({project});
    }catch(err){
      console.log(err, 'viewRelatedProjects error');
      res.status(500).json({
        errorMessage: 'Please try again later'
      })
    }
};
