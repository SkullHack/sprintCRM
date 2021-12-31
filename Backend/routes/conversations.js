const router = require("express").Router();
const Conversation = require("../models/Conversation");

//posting the new Conversations
//accepts the senderId & receiverId 

router.post("/", async (req,res) => {
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

//get new Conversations of a user
//userId is passed here for finding purposes

router.get("/:userId", async (req,res) => {
    try{
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]},
        });
        //sucess
        res.status(200).json(conversation);
    }catch(err){
        //err
        res.status(500).json(err);
    }
});

module.exports = router;