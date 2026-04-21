import express from 'express';
import ClientController from '../Controllers/ClientController.ts';

const router = express.Router();

router.get('/client/list', ClientController.getClients);
router.post('/client/store', ClientController.storeClients);
router.put('/client/update/:id', ClientController.updateClient);
router.delete('/client/delete/:id', ClientController.deleteClient);
router.get('/client/search/:search', ClientController.searchClients);

export default router;