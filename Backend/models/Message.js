const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        //it includes the conversationID, sender and text
        conversationId:{
            type: String,
        },
        sender:{
            type: String,
        },
        text: {
            type: String,
        },
        status: {
            type: String,
        },

    },
    //included time span
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);