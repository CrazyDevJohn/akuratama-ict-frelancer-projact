import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  health,
} from '../controllers/categories.controller.js';

const router = Router();

router.get('health', health);
router.get('/', getAllCategories);
router.post('/', createCategory);

export default router;
