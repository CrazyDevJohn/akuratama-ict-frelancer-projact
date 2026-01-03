import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'dotenv/config';

import authroutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import categoriesRoutes from './routes/categories.route.js';
import lessonRoutes from './routes/lesson.route.js';
import connectDb from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get('/api/v2/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/v2/auth', authroutes);
app.use('/api/v2/categories', categoriesRoutes);
app.use('/api/v2/course', courseRoutes);
app.use('/api/v2/lessons', lessonRoutes);

// Start server
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}/api/v2/`);
});
