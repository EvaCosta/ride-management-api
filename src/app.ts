import express from 'express';
import bodyParser from 'body-parser';
import { DriverController } from './core/interfaces/controllers/driverController';
import { PassengerController } from './core/interfaces/controllers/passengerController';
import { DriverService } from './core/application/services/DriverService';
import { PassengerService } from './core/application/services/PassengerService';
import { PostgresDriverRepository } from './core/interfaces/repositories/PostgresDriverRepository';
import { PostgresPassengerRepository } from './core/interfaces/repositories/PostgresPassengerRepository';

const app = express();
const PORT = 3000;

// Middleware para o Express
app.use(bodyParser.json());

// Instância dos repositórios
const driverRepository = new PostgresDriverRepository();
const passengerRepository = new PostgresPassengerRepository();

// Instância dos serviços de aplicação
const driverService = new DriverService(driverRepository);
const passengerService = new PassengerService(passengerRepository);

// Instância dos controladores
const driverController = new DriverController(driverService);
const passengerController = new PassengerController(passengerService);

// Rotas
app.post('/driver', (req, res) => driverController.create(req, res));
app.get('/driver/:id', (req, res) => driverController.findById(req, res));
app.put('/driver/:id', (req, res) => driverController.update(req, res));
app.delete('/driver/:id', (req, res) => driverController.delete(req, res));
app.get('/driver', (req, res) => driverController.findAll(req, res));

app.post('/passenger', (req, res) => passengerController.create(req, res));
app.get('/passenger/:id', (req, res) => passengerController.findById(req, res));
app.put('/passenger/:id', (req, res) => passengerController.update(req, res));
app.delete('/passenger/:id', (req, res) => passengerController.delete(req, res));
app.get('/passenger', (req, res) => passengerController.findAll(req, res));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
