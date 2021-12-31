const router = require("express").Router();
const consultController = require('../controllers/consultController');
const Conversation = require("../models/Conversation");


// post data
router.post('/',consultController.addNewConsult);

//get employee
router.get('/employee', consultController.getEmployee);

//get projects
router.get('/projects', consultController.viewAllConsultProjects);

//get consults by id
router.get("/:id", consultController.getConsultsByIDController);

//post consultsInfo
router.post('/:id/consultInfo', consultController.addNewConsultInfo);

//get consultsInfo
router.get('/:id/consultInfo/:consultProjestID', consultController.viewSpecificConsultInfo);

//put consultsInfo
router.put('/:id/consultInfo/:consultProjestID', consultController.editConsultInfo);

//search and get consultancy Projects
router.get('/search/:consultTitle', consultController.searchConsultancyProjects);

//delete consult project
router.delete('/:id/consultId', consultController.deleteConslts);

//delete consult infor
router.delete('/', consultController.deleteConsultInfo);

router.get('/projects/:id', consultController.viewRelatedConsultations);

router.post("/conversations", async (req,res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try{
        const savedConversation = await newConversation.save();
        //sucess
        res.status(200).json(savedConversation);
    }catch(err){
        //err
        res.status(500).json(err)
    }
});

module.exports = router;
