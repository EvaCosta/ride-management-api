import express from 'express';
import bodyParser from 'body-parser';
import fareRoutes from './core/interfaces/controllers/fareRoutes';
import driverRoutes from './core/interfaces/controllers/driverRoutes';
import passengerRoutes from './core/interfaces/controllers/passengerRoutes';
import raceRoutes from './core/interfaces/controllers/RaceRoutes';

const app = express();
const PORT = 3000;

// Middleware para o Express
app.use(bodyParser.json());

app.use('/passenger', passengerRoutes)
app.use('/driver', driverRoutes)
app.use('/fare', fareRoutes);
app.use('/race', raceRoutes)

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
