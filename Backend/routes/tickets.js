const router = require("express").Router();
let Ticket = require("../models/ticket.model");
const ticketController = require("../controllers/ticketController")


router.get('/', ticketController.viewTickets);

router.get('/employees', ticketController.getEmployee);

router.put('/', ticketController.assignEmployee);

router.get('/employeeId', ticketController.viewAssignedTickets);

module.exports = router;
