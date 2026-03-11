import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  health,
  allEnrolled,
} from '../controllers/course.controller.js';

const router = Router();

router.get('/health', health);
router.get('/', getAllCourses); // Placeholder for getting all courses
router.post('/add', createCourse);
router.get('/all-enrolled', allEnrolled);
router.get('/:id', getCourseById); // Placeholder for getting a course by ID

export default router;
