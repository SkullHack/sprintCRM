const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema;

const consultInfoSchema = new Schema({
    consultName: { type: String, required: true},
    consultDate: { type: String, required: true},
    consultDescription: { type: String, required: true},
    consultProjestID: {  
        type: String,
    },
},
{
    timestamps: true,
  }
);

const ConsultInfo = mongoose.model("ConsultInfo",consultInfoSchema);

module.exports = ConsultInfo;