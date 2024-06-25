import { Router } from 'express';
import { DriverController } from '../../../controllers/DriverController';
import { PostgresDriverRepository } from '../../infrastructure/data/repositories/PostgresDriverRepository';
import { DriverService } from '../../application/services/DriverService';

const router = Router();

const driverRepository = new PostgresDriverRepository();
const driverService = new DriverService(driverRepository);
const driverController = new DriverController(driverService);

router.post('/', (req, res) => driverController.create(req, res));
router.get('/:id', (req, res) => driverController.findById(req, res));
router.put('/:id', (req, res) => driverController.update(req, res));
router.delete('/:id', (req, res) => driverController.delete(req, res));
router.get('/', (req, res) => driverController.findAll(req, res));

export default router;
