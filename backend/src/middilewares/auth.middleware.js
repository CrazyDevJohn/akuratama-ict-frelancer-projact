import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.AKURATAMA_ICT_REGISTER_TOKEN;

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'Authentication token missing' });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_LOGIN);
    if (!id) {
      return res
        .status(401)
        .json({ status: false, message: 'Authentication token missing' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ status: false, message: 'User not found' });
    }

    req.user = { ...user._doc, password: null }; // Exclude password
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.cookies('AKURATAMA_ICT_REGISTER_TOKEN', '');
    return res
      .status(500)
      .json({ status: false, message: 'Internal server error' });
  }
};
