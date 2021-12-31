const notes = require("../models/notes.model");


//notes controller
exports.notesController = async (req, res) => {
    const {notesName,employeeName} = req.body;
    try{
      const newnotes = new notes();
      newnotes.notesName = notesName;
      newnotes.employeeName = employeeName;
      await newnotes.save();
      res.json({
        successMsg1: "NOTES ADDED SUCESSULLY",
      });
    }catch (err){
      console.log("notesController error", err);
        res.status(500).json({
          errorMsg1: "server error. please try again"
        });
    }
    };

    //to delete notes
    exports.deletenote = async(req,res) =>{
      const id = req.query.id;
      try{
        const deletednote = await notes.findByIdAndDelete(id);
        res.status(200).json(deletednote);
      }catch(err){
        console.log(err, 'noteController.delete error');
        res.status(500).json({
          errorMessage: 'Please try again later',
      });
      }
    };

    