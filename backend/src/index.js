import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'dotenv/config';
import axios from 'axios';

import authroutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import categoriesRoutes from './routes/categories.route.js';
import lessonRoutes from './routes/lesson.route.js';
import connectDb from './lib/db.js';
import { sendMail } from './lib/mail.js';
import billingRoutes from "./routes/billing.routes.js"
import { checkAuth } from './middilewares/auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('trust proxy', 1);

app.get('/api/v2/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/v2/auth', authroutes);
app.use('/api/v2/categories', categoriesRoutes);
app.use('/api/v2/course',checkAuth, courseRoutes);
app.use('/api/v2/lessons', lessonRoutes);
app.use("/api/v2/billing", checkAuth, billingRoutes)

const connect = async () => {
  await connectDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/api/v2/`);
      });
    })
    .catch((er) => console.log(er));
};

connect();
// Start server
