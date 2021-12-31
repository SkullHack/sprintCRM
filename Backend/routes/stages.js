const router = require("express").Router();
let stage = require("../models/stage.model");
const stagesController = require('../controllers/stagesController');
const viewnoteController = require('../controllers/viewnoteController');
const notesController = require('../controllers/notesController');



// router.route("/").get((req, res) => {
//   stage
//     .find()
//     .then((stages) => res.json(stages))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/addd").post((req, res) => {
  const stageName = req.body.stageName;
  const stageId = req.body.stageId;
  const startDate = Date.parse(req.body.startDate);
  const endDate = Date.parse(req.body.endDate);
  const assignee = req.body.assignee;
  const subtask = req.body.subtask;

  const newstage = new stage({
    stageName,
    stageId,
    startDate,
    endDate,
    assignee,
    subtask,
  });

 newstage
    .save()
    .then(() => res.json("Stage added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get('/', stagesController.viewStages);

router.delete('/stageId', stagesController.deleteStages);

router.put('/update', stagesController.editStages);

router.get('/notes/empid', viewnoteController.viewNotes);

router.delete('/notes/noteid', notesController.deletenote);

router.get('/findproject/projectId', stagesController.viewAssignedStages);



module.exports = router;
