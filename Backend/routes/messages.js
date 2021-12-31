const router = require("express").Router();
const Message = require("../models/Message");


//posting the new messages

router.post("/", async (req,res) => {
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        //sucess
        res.status(200).json(savedMessage);
    }catch(err){
        //err
        res.status(500).json(err);
    }
});


//get the conversations using the conversationId

router.get("/:conversationId", async (req, res) => {
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        //sucess
        res.status(200).json(messages);
    }catch(err){
        //err
        res.status(500).json(err);
    }
});

router.put("/", async (req,res)=>{
    const id = req.body._id;

    try{
        const updateStatus = await Message.findByIdAndUpdate(id, req.body, {useFindAndModify:false})

        res.json({
            updateStatus,
            successMsg: `${req.body.status} status assigned`
        });
    }catch(err){
        console.log(err, 'updateStatus error');
        res.status(500).json({
            errorMsg: 'Please Try again later'
        })
    }
});

module.exports = router;