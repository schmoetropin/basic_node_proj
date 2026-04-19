import express from 'express';
import * as ClientController from '../Controllers/ClientController.ts';

const router = express.Router();

router.get('/client', ClientController.getClients);

export default router;