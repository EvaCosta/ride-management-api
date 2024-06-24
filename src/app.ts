import express from 'express';
import bodyParser from 'body-parser';
import fareRoutes from './core/interfaces/routes/fareRoutes';
import driverRoutes from './core/interfaces/routes/driverRoutes';
import passengerRoutes from './core/interfaces/routes/passengerRoutes';

const app = express();
const PORT = 3000;

// Middleware para o Express
app.use(bodyParser.json());

app.use('/passenger', passengerRoutes)
app.use('/driver', driverRoutes)
app.use('/fare', fareRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
