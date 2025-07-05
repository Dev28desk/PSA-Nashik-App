
import express from 'express';
import dotenv from 'dotenv';
import { connectRedis } from './services/redis';
import authRouter from './modules/auth/auth.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize services
connectRedis();

// Middleware
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/auth', authRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
