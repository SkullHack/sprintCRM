const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    clientFirstName: { type: String, required: true },
    clientLastName: { type: String, required: true },
    clientContactNumber: { type: Number, required: true },
    clientJob: { type: String, required: true },
    clientAddress: { type: String, required: true  },
    clientDOB: { type: String, required: true  },
    clientEmail: { type: String, required: true  },
    clientNIC: { type: String, required: true  },
    clientCompanyName: { 
      type : ObjectId,
      ref: 'Company',
      required: true
    },
    clientUsername: { type: String, required: true },
    clientPassword: { type: String, required: true },
    clientProfilePic: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
