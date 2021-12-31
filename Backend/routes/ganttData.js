const express = require("express");
const router = express.Router();

const {
  addGanttDataController,
  readAllGanttDataController,
  updateGanttDataController,
  deleteGanttDataController,
  testsort,
} = require("../controllers/ganttDataController");

//create new task ( ganttdata)
router.post("/data/task", addGanttDataController);

//get all ganttdata
router.get("/data", readAllGanttDataController);

//update ganttdata
router.put("/data/task/:id", updateGanttDataController);

//delete ganttdata
router.delete("/data/task/:id", deleteGanttDataController);

//test controller
router.get("/testsort/:id", testsort);

module.exports = router;
