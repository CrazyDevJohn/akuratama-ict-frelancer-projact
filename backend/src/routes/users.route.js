import { Router } from 'express';
import { getAllUsers } from '../controllers/users.controller.js';

const router = Router();

// Define your user-related routes here
router.get('/all', getAllUsers);

router.post('/', (req, res) => {
  res.send('Create a new user');
});

router.get('/:id', (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});

router.put('/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`);
});

export default router;
