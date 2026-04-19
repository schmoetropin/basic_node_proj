import express from 'express';
import ClientController from '../Controllers/ClientController.ts';

const router = express.Router();

router.get('/client/list', ClientController.getClients);
router.post('/client/store', ClientController.storeClients);

export default router;