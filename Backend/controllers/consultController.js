const Consult = require('../models/consult.model');
const Employee = require('../models/employee');
const ConsultInfo = require("../models/consultInfo.model");

exports.addNewConsult = async(req,res)=>{

    const { consultTitle, startDate, endDate, clientName, employeeName } = req.body;
    try{

        const newConsult = new Consult();
        newConsult.consultTitle = consultTitle;
        newConsult.startDate = startDate;
        newConsult.endDate = endDate;
        newConsult.clientName = clientName;
        newConsult.employeeName = employeeName;

        await newConsult.save();
        res.json({
            successMsg: " CONSULT CREATED SUCESSFULLY ",
        });

    }catch (err){
        //return error message as reponse if any error caught
        console.log(" addNewConsult in consultController error ", err);
        res.status(500).json({
            errorMsg: " Server error, Please Try Again ",
        });

    }
};

exports.addNewConsultInfo = async(req,res)=>{
    const { consultName, consultDate, consultDescription, consultProjestID } = req.body;
    try{

        const newConsultInfo = new ConsultInfo();
        newConsultInfo.consultName = consultName;
        newConsultInfo.consultDate = consultDate;
        newConsultInfo.consultDescription = consultDescription;
        newConsultInfo.consultProjestID = consultProjestID;

        await newConsultInfo.save();
        res.json({
            successMsg: " CONSULT INFO ADDED SUCESSFULLY ",
        });

    }catch(err){
        //return error message as reponse if any error caught
        console.log(" newConsultInfo in consultController error ", err);
        res.status(500).json({
            errorMsg: " Server error, Please Try Again ",
        });
    }
};

exports.getEmployee = async(req, res)=>{
    //const level = req.query.level;
    try{
        const employees = await Employee.find({accessLevel:0});
        res.json({employees});
    }catch(err){
        console.log(err, 'consultController.getEmployee error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
};

exports.viewAllConsultProjects = async(req,res)=>{
    try{
        //get all consults from database and store in consults variable
        const consultancyProjects = await Consult.find({}).populate("clientName").populate("employeeName");

        //return the variable as response
        res.status(200).json({consultancyProjects})
    }catch(err){
        //print error in console
      console.log(err, 'consultController.viewAllConsultProjects error');

      //return error message as reponse if any error caught
      res.status(500).json({
        errorMessage: 'Please try again later'
      })
    }
  };

  //getting consult by ID
  exports.getConsultsByIDController = async (req, res) => {
      try{

        const consult = await Consult.findById(req.params.id).populate("employeeName");
        //null check
        if(!consult) {
            return res.status(404).json({
                successMsg: " is empty"
            });
        }
        res.status(200).json({
            consult,
        });

      }catch(err){
        console.log(" getConsultsByIDController error", err);
        //return error message as reponse if any error caught
        res.status(500).json({
            errorMsg: " Server Error. Please Try again",
        });
      }
  };

  exports.viewRelatedConsultations = async(req,res)=>{
    const id = req.params.id;
      try{
        const consult = await Consult.find({employeeName: id}).populate("employeeName").populate("clientName");
        res.json({consult});
      }catch(err){
        console.log(err, 'viewRelatedConsultations error');
        res.status(500).json({
          errorMessage: 'Please try again later'
        })
      }
  };

  exports.viewSpecificConsultInfo = async (req,res) => {
      const consultprojectId = req.params.consultProjestID;
      try{
          const ConsultInfos = await ConsultInfo.find({consultProjestID: consultprojectId}).populate("");
          res.json({ConsultInfos});
      }catch(err){
          console.log(err, 'consultcontroller.viewSpecificConsultInfo error');
          res.status(500).json({
              errorMessage: 'please try again later'
          })
      }
  };

  //filter and display Consultancy Projects
  //based on value given by user
  exports.searchConsultancyProjects = async(req, res)=>{
    try{
        //store the recieved value in regex and find in database
        var regex = new RegExp(req.params.consultTitle,'i');
        Consult.find({consultTitle: regex}).then((result)=>{
            res.status(200).json(result)
        })
    }catch(err){
      console.log(err, 'consultcontroller.searchConsultancyProjects error');
      res.status(500).json({
        errorMessage: 'Please try again later'
      })
    }
  };

  //backend for update consult info
  exports.editConsultInfo = async(req, res) =>{

    const id = req.body._id;
    try{
        const ConsultInfoUpdate = await ConsultInfo.findByIdAndUpdate(id, req.body, {useFindAndModify:false})

        res.json({
            successMsg: `${req.body.consultName} consult Info Updated Successfully`
          });

    }catch(err){

        console.log(err, 'consultController.editConsultInfo error');
        res.status(500).json({
            errorMsg: 'Please try again later'
        })
    }
  };

  //DELETE CONSULT PROJECTS FROM db
  exports.deleteConslts = async(req,res) => {
      const id = req.query.id;
      try{
          //checking if there are consult info
        const consultinfo = await ConsultInfo.find({consultProjestID: id});
        //if have dont delete
        if(Object.keys(consultinfo).length == ""){
            //if no consult info delete
            const deletedConsult = await Consult.findByIdAndDelete(id);

            res.status(200).json(deletedConsult);
        

        }else{
            res.status(500).json({
                errorMessage: 'Cannot delete Consultancy project',
            });
        }

          
      }catch(err){
        console.log(err, 'consultController.deleteConslts error');
        res.status(500).json({
            errorMessage: 'please try again later',
    
        });
      }
  };

  //delete consult Info
  exports.deleteConsultInfo = async(req, res)=> {
    const id = req.body._id;
    try{
        const deletedConsultInfo = await ConsultInfo.findByIdAndDelete(id);

        //check whether not successfully deleted - check it returns null
        //return null means not deleted successfully
        //else success
        if(deletedConsultInfo == null){
            res.status(500).json({
                errorMessage: 'Cannot delete Consult Info project',
            });
        }else{
            res.status(200).json({
                successMsg: `${deletedConsultInfo.consultName} Consult Info Deleted Successfully`
              });
        }
    }catch(err){
      console.log(err, 'consultController.delete consult info error');
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };


  //client vie consultController
  exports.viewClientIDConsultations = async(req,res)=>{
    const id = req.query.id;
      try{
        const consult = await Consult.find({clientName: id}).populate("employeeName");
        res.json({consult});
      }catch(err){
        console.log(err, 'viewClientIDConsultations error');
        res.status(500).json({
          errorMessage: 'Please try again later'
        })
      }
  };

  exports.viewSpecificclientConsult = async(req,res)=>{
    const id = req.params.id;
      try{
        const consult = await Consult.findById(id);
        res.json({consult});
      }catch(err){
        console.log(err, 'viewSpecificclientConsult error');
        res.status(500).json({
          errorMessage: 'Please try again later'
        })
      }
  };