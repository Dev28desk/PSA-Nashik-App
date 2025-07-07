
import express from 'express';
import dotenv from 'dotenv';
import { connectRedis } from './services/redis';
import { initializeDatabase } from './config/database';
import authRouter from './modules/auth/auth.routes';
import { studentRouter } from './modules/students/student.routes';
import paymentRouter from './payments/payment.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Initialize services
    await initializeDatabase();
    connectRedis();
    console.log('Database and Redis connected');

    // Middleware
    app.use(express.json());

    // Routes
    app.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    app.use('/api/auth', authRouter);
    app.use('/api/students', studentRouter);
    app.use('/api/payments', paymentRouter);

    // Error handling
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Internal server error' });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
