const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    senderID: { 
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    receiverID: { 
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required:true,
    },
    ticketTitle: { type: String, required: true },
    ticketType: { type: String, required: true },
    ticketDetails: { type: String, required: true},
    priority: { type: String, required: true },
    ticketStatus: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
