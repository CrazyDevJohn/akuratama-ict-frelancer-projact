import { Router } from 'express';
import { getSummarys } from '../controllers/summer.controller.js';

const router = Router();

router.get('/', getSummarys);

export default router;
