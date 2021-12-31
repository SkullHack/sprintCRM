const router = require("express").Router();
const clientsController = require('../controllers/clientsController');
const upload = require('../middleware/multer')

router.get('/', clientsController.viewSpecificClients);

router.get('/company', clientsController.viewAllCompanies);

router.put('/company', clientsController.editCompany);

router.put('/', clientsController.editClient);

router.get('/search/:companyName', clientsController.searchCompany);

router.post('/', upload.single('clientProfilePic'), clientsController.addNewClient);

router.post('/company', upload.single('companyLogo'), clientsController.addNewCompany);

router.delete('/clientId', clientsController.deleteClient);

router.delete('/companyId', clientsController.deleteCompany);

/*used for testing purpose */
router.post('/project', clientsController.addNewProject);

//route to client retrieval for consults 
router.get('/clients', clientsController.viewAllClients);

router.get('/company/:id', clientsController.viewSpecificCompany);

router.get('/:id', clientsController.viewClientsForChat);

module.exports = router;
