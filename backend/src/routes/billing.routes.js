import { Router } from 'express';
import parser from '../lib/multer.js';
import { billing, getAllPandingequests, aprualCourse } from '../controllers/billing.controller.js';

const router = Router();

router.post('/billing', parser.single('file'), billing);
router.get('/', getAllPandingequests);
router.post("/apruve", aprualCourse)

export default router;
