const stages = require("../models/stage.model");


//To retrieve stages from database
exports.viewStages = async(req,res)=>{

    try{

        const stage = await stages.find({});

        res.status(200).json({stage});

    }catch(err){

        console.log(err, 'stagesController.viewStages error');

        res.status(500).json({

            errorMessage: 'Pleae try again later'

        })

    }

};


//to delete stages 
exports.deleteStages = async(req,res) =>{
    const id = req.query.id;
    try{
     
        const deletedStage = await stages.findByIdAndDelete(id);
      
        res.status(200).json(deletedStage);
      }
    catch(err){
      console.log(err, 'stageController.delete error');
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };
  
 //to edit stages
  exports.editStages = async(req, res)=> {
   
    const id = req.body._id;
      try{
        const stage = await stages.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
  
        res.json({
          successMsg: ` Stage Updated Successfully`
        });
      }
      catch(err){
      
        res.status(500).json({
          errorMsg: 'Please try again later'
        })
      }
  };

  exports.viewAssignedStages = async(req,res)=>{
    const id = req.query.id;
      try{
        const stage = await stages.find({projectID: id});
        res.json({stage});
      }catch(err){
        console.log(err, 'stagesController.viewAssignedStages error');
        res.status(500).json({
          errorMessage: 'Please try again later'
        })
      }
  };
