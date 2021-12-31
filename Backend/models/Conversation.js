const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        //array for storing sender and receiver details in an array 
        members: {
            type: Array,
        },
    },
    //included time span
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);