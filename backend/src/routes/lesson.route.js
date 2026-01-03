import { Router } from 'express';
import { getAllLessons } from '../controllers/lesson.controller.js';

const router = Router();

router.get('/', getAllLessons);

export default router;
