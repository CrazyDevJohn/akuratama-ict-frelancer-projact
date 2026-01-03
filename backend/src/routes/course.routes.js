import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  health,
} from '../controllers/course.controller.js';

const router = Router();

router.get('/health', health);
router.get('/', getAllCourses); // Placeholder for getting all courses
router.get('/:category', getCoursesByCategory); // Placeholder for getting all courses
router.get('/id/:id', getCourseById); // Placeholder for getting a course by ID
router.post('/create', createCourse);

export default router;
