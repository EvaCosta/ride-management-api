import { Router } from 'express';
import { FareController } from '../controllers/fareController';

const router = Router();
const fareController = new FareController();

router.post('/', (req, res) => fareController.calculateFare(req, res));

export default router;
