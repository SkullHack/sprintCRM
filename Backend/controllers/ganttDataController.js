const GanttData = require("../models/ganttData.model");

//----------------------------------------------------------------  Get Task data function   
function getTask(data) {
  return {
    text: data.text,
    start_date: data.start_date,
    duration: data.duration,
    progress: data.progress || 0,
    parent: data.parent,
  };
}


//----------------------------------------------------------------  Add Task   
exports.addGanttDataController = async (req, res) => {
  const { id, text, start_date, duration, progress, parent, open } = req.body;
  var task = getTask(req.body);

  // to increment id
     var result = await GanttData.findOne({})
       .sort({ id: -1 })
       .select("id");

  try {
    const newGanttData = new GanttData();
    newGanttData.id = result.id + 1;
    newGanttData.text = text;
    newGanttData.start_date = start_date;
    newGanttData.duration = duration;
    newGanttData.progress = progress;
    newGanttData.parent = parent;
    newGanttData.open = open;

    await newGanttData.save();
    res.json({
      successMsg: "Gantt data saved",
    });
  } catch (err) {
    console.log("addGanttdataController error ", err);
    res.status(500).json({
      errorMsg: "addGanttdataController Error. Please Try again",
    });
  }
};


//----------------------------------------------------------------  get All Task   
exports.readAllGanttDataController = async (req, res) => {
  try {
    const tasks = await GanttData.find({});
    res.status(200).json({
      tasks,
    });
  } catch (err) {
    console.log(" readAllGanttDataController error ", err);
    res.status(500).json({
      errorMsg: "readAllGanttDataController Error. Please Try again",
    });
  }
};


//----------------------------------------------------------------  Update Task   
exports.updateGanttDataController = async (req, res) => {
  try {
    var id = req.params.id;
    var result = await GanttData.findOne({ id: id }).select("_id");
  } catch (err) {
    res.status(500).json({
      errorMsg: "Get ID error in Update Controller. Please Try again",
    });
  }

  var task = getTask(req.body);
  console.log(task);
  console.log(result);
  try {
    let ganttData = await GanttData.findById(result._id);
    if (!ganttData) {
      return res.status(404).json({
        successMsg: "ganttData not found",
      });
    }

    ganttData = await GanttData.findByIdAndUpdate(result._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      ganttData,
    });
  } catch (err) {
    console.log(" updateGanttDataController error ", err);
    res.status(500).json({
      errorMsg: "updateGanttDataController error. Please Try again",
    });
  }
};


//----------------------------------------------------------------  Delete Task   
exports.deleteGanttDataController = async (req, res) => {
  //getting id from the database
  try {
    var id = req.params.id;
    var result = await GanttData.findOne({ id: id }).select("_id");
  } catch (err) {
    res.status(500).json({
      errorMsg: "Get ID error in Delete Controller. Please Try again",
    });
  }


  try {
    let task = await GanttData.findById(result._id);
    if (!task) {
      return res.status(404).json({
        successMsg: "task not found",
      });
    }
    
    await task.remove();
    res.status(200).json({
      success: true,
      successMsg: "task deleted",
    });
  } catch (err) {
    console.log(" deleteGanttDataController error ", err);
    res.status(500).json({
      errorMsg: "deleteGanttDataController error. Please Try again",
    });
  }
};



//------------------------------ testing getting id from the database.
exports.testsort = async (req, res) => {
  try {
    var result = req.params.id;
    var id = await GanttData.findOne({ id: result }).select("_id");
    console.log(id);
    res.status(200).json({
      id,
    });
  } catch (err) {
    res.status(500).json({
      errorMsg: "Getting ID Error. Please Try again",
    });
  }
};
