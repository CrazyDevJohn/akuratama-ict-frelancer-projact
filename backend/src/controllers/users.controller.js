import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    console.log('error in getting all users ', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
