import { Router } from 'express';
import { RideController } from '../../../controllers/RideController';
import { PostgresRideRepository } from '../../infrastructure/data/repositories/PostgresRideRepository';
import { RideService } from '../../application/services/RideService';

const router = Router();

const rideRepository = new PostgresRideRepository();
const rideService = new RideService(rideRepository);
const rideController = new RideController(rideService);

router.post('/', (req, res) => rideController.create(req, res));
router.get('/:id', (req, res) => rideController.findById(req, res));
router.put('/:id', (req, res) => rideController.update(req, res));
router.delete('/:id', (req, res) => rideController.delete(req, res));
router.get('/', (req, res) => rideController.findAll(req, res));

export default router;
