const express = require("express");
const router = express.Router();
const {
  employeeRegisterController,
  employeeLoginController,
  addStageController,
  viewAllProjectManagers,
  clientLoginController
} = require("../controllers/auth");
const { notesController } = require("../controllers/notesController");

const { addProjectController } = require("../controllers/projectController");

const {
  registerValidator,
  loginValidator,
  validatorResult,
  addStageValidator,
  notesValidator,
  ClientloginValidator
} = require("../middleware/validator");

const {
  ticketValidator,
  ticketValidatorResult,
} = require("../middleware/validator");
const { addTickets } = require("../controllers/ticketController");

//register employee
router.post(
  "/register",
  registerValidator,
  validatorResult,
  employeeRegisterController
);
router.post("/login", loginValidator, validatorResult, employeeLoginController);

router.post("/login/client", ClientloginValidator, validatorResult, clientLoginController);

router.post("/tickets/add", ticketValidator, ticketValidatorResult, addTickets);
//addstage POST
router.post(
  "/addstage",
  addStageValidator,
  validatorResult,
  addStageController
);

//notes POST
router.post("/notes", notesValidator, validatorResult, notesController);

//getting only the poject managers for lead in project creation
router.get("/employee/projectManager", viewAllProjectManagers);

module.exports = router;
