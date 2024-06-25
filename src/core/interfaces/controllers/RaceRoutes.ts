import express from 'express';
import { RaceController } from '../../../controllers/RaceControllers';

const router = express.Router();
const raceController = new RaceController();

router.post('/', (req, res) => raceController.acceptRace(req, res));

export default router;
