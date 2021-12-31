const router = require("express").Router();
const consultController = require('../controllers/consultController');


//related to consults
router.get('/consults/projects/clientid', consultController.viewClientIDConsultations);

router.get('/ClientConsults/consults/projects/:consultProjestID',consultController.viewSpecificConsultInfo);

router.get('/ClientConsults/:id',consultController.viewSpecificclientConsult);
const ticketController = require("../controllers/ticketController")

//related to tickets
router.get('/tickets/clientId', ticketController.viewClientTickets);

router.get('/tickets', ticketController.viewTicketById);




module.exports = router;