import { Router } from 'express';
import {
  createLecture,
  createLesson,
  getAllLessons,
  getAllLessonsByCourseId,
} from '../controllers/lessons.controller.js';

const router = Router();

router.get('/:courseId', getAllLessonsByCourseId);
router.get('/', getAllLessons);
router.post('/create-lesson', createLesson);
router.post('/create-lecture', createLecture);

export default router;

// example of how to use this route in index.js
// http://localhost:5000/api/v2/lessons/6979f7d704e7458bfb024c97
