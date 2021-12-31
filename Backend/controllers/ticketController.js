const tickets = require("../models/ticket.model");
const Employee = require("../models/employee");

//http://localhost:5000/tickets

exports.viewTickets = async(req,res)=>{

    try{
        
        const ticket = await tickets.find({}).populate("receiverID").populate("senderID");
        res.status(200).json({ticket});

    }catch(err){

        console.log(err, 'ticketsController.viewTicket error');

        res.status(500).json({

            errorMessage: 'Pleae try again later'

        })

    }

};

exports.getEmployee = async(req, res)=>{
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

exports.addTickets = async(req,res)=>{
    //destructuring
    const {senderID,ticketTitle,ticketDetails,ticketStatus,ticketType,priority} = req.body
  //  const senderID = "";
    const receiverID = "";

    try{
        const newTicket = new tickets();
        newTicket.ticketTitle = ticketTitle;
        newTicket.ticketDetails = ticketDetails;
        newTicket.ticketStatus = ticketStatus;
        newTicket.ticketType = ticketType;
        newTicket.priority = priority;
       newTicket.senderID = senderID;//sender -client
     //  newTicket.senderID =senderID;
        newTicket.receiverID = "60dc84486120a83238384e8e";//receiver - employee
        
        await newTicket.save();
        res.json({
            successMessage:"Ticket added successfully!!"
        })
    }
    catch(err){
        console.log("addTicket controller error", err);
        res.status(500).json({
            errorMessage:"Server Error",
        });
    }
}

exports.assignEmployee = async(req, res) =>{
    const id = req.body._id;

    try{
        const assign = await tickets.findByIdAndUpdate(id, req.body, {useFindAndModify:false})

        res.json({
            assign,
            successMsg: `${req.body.ticketTitle} ticket assigned`
        });
    }catch(err){
        console.log(err, 'ticketController.AssignEmployee error');
        res.status(500).json({
            errorMsg: 'Please Try again later'
        })
    }
};

exports.viewAssignedTickets = async(req,res)=>{
    const id = req.query.id;
      try{
        const ticket = await tickets.find({receiverID: id}).populate("senderID");
        res.json({ticket});
      }catch(err){
        console.log(err, 'ticketsController.viewAssignedTickets error');
        res.status(500).json({
          errorMessage: 'Please try again later'
        })
      }
  };

  exports.viewClientTickets = async(req,res)=>{
    const id = req.query.id;
      try{
        const ticket = await tickets.find({senderID: id}).populate("receiverID");
        res.json({ticket});
      }catch(err){
        console.log(err, 'ticketsController.viewClientTickets error');
        res.status(500).json({
          errorMessage: 'Please try again later'
        })
      }
  };

  exports.viewTicketById = async(req,res)=>{
    const id = req.query.id;
    try{
        
        const ticket = await tickets.findById(id).populate("receiverID").populate("senderID");
        res.status(200).json({ticket});

    }catch(err){

        console.log(err, 'ticketsController.viewTicket error');

        res.status(500).json({

            errorMessage: 'Pleae try again later'

        })

    }

};

