const express = require("express");
const router = express.Router();

const {
  addProjectController,
  readAllProjectsController,
  getProjectsByIDController,
  searchProjectsController,
  updateProjectsController,
  deleteProjectsController,
  viewRelatedProjectsController
} = require("../controllers/projectController");

//create project
router.post("/create", addProjectController);

//get all projects
router.get("/", readAllProjectsController);

//get project by id
router.get("/:id", getProjectsByIDController);

//update project
router.put("/:id", updateProjectsController);

//search projects
router.get("/search/:projectName", searchProjectsController);

//delete project
router.delete("/:id", deleteProjectsController);

//get related projects
router.get('/clients/:id', viewRelatedProjectsController);

module.exports = router;
