import { Router } from 'express';
import { PostgresPassengerRepository } from '../../infrastructure/data/repositories/PostgresPassengerRepository';
import { PassengerService } from '../../application/services/PassengerService';
import { PassengerController } from '../../../controllers/PassengerController';

const router = Router();

// Instância dos repositórios
const passengerRepository = new PostgresPassengerRepository();
// Instância dos serviços de aplicação
const passengerService = new PassengerService(passengerRepository);
// Instância dos controladores
const passengerController = new PassengerController(passengerService);

router.post('/', (req, res) => passengerController.create(req, res));
router.get('/:id', (req, res) => passengerController.findById(req, res));
router.put('/:id', (req, res) => passengerController.update(req, res));
router.delete('/:id', (req, res) => passengerController.delete(req, res));
router.get('/', (req, res) => passengerController.findAll(req, res));

export default router;
