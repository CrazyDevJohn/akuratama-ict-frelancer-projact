import { Router } from 'express';
import {
  getUserProfile,
  health,
  login,
  logout,
  register,
  VerifyRegister,
} from '../controllers/auth.controller.js';
import { checkAuth } from '../middilewares/auth.middleware.js';

const router = Router();

router.get('/profile', checkAuth, getUserProfile);
router.post('/health', health);
router.post('/register', register);
router.post('/verify-register', VerifyRegister);
router.post('/login', login);
router.post('/logout', logout);

export default router;
