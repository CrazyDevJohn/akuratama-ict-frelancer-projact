import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'dotenv/config';

import authroutes from './routes/auth.routes.js';
import connectDb from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/v2/auth', authroutes);

// Start server
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
