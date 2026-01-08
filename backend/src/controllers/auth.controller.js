import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { sendMail } from '../lib/mail.js';
import { genToken } from '../utils/genToken.js';

export const health = (req, res) => {
  return res
    .status(200)
    .json({ status: 'OK', message: 'Auth service is healthy' });
};

export const register = async (req, res) => {
  console.log('✅ Register request body:', req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: 'All fields are required' });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res
        .status(409)
        .json({ status: false, message: 'User already exists' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendMail(
      email,
      'Welcome to Akuratama ICT',
      `<h1>Hello ${name},</h1><p>Thank you for registering at Akuratama ICT.</p><br/><h1>Your OTP is: ${otp}</h1>`,
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword,
      otp,
    };

    await genToken(res, user, process.env.JWT_SECRET_REGISTER, '15m');

    return res
      .status(200)
      .json({ status: true, message: 'User otp send successfully' });
  } catch (error) {
    console.log(`error in register controller: ${error}`);
    return res.status(500).json({ status: false, message: 'error', error });
  }
};

export const VerifyRegister = async (req, res) => {
  const { otp } = req.body;
  const token = await req.cookies.AKURATAMA_ICT_REGISTER_TOKEN;
  try {
    if (!otp) {
      return res
        .status(400)
        .json({ status: false, message: 'OTP is required' });
    }

    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token, authorization denied' });
    }

    const { otp: oldOtp, ...user } = jwt.verify(
      token,
      process.env.JWT_SECRET_REGISTER,
    );

    if (parseInt(otp) !== parseInt(oldOtp)) {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
    }

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return res
      .status(201)
      .json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    console.log(`error in VerifyRegister controller: ${error}`);
    return res.status(500).json({ status: false, message: 'error', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: 'All fields are required' });
    }

    const isExistingUser = await User.findOne({ email });
    if (!isExistingUser) {
      return res
        .status(404)
        .json({ status: false, message: 'User does not exist' });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isExistingUser.password,
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ status: false, message: 'Invalid credentials' });
    }

    await genToken(
      res,
      { id: isExistingUser._id },
      process.env.JWT_SECRET_LOGIN,
      '15d',
    );

    const currentUser = {
      ...isExistingUser._doc,
      password: null,
    };

    await sendMail(
      email,
      'Login Notification - Akuratama ICT',
      `<h1>Hello ${isExistingUser.name},</h1><p>Your account was just logged in. If this wasn't you, please secure your account immediately.</p>`,
    );

    return res.status(200).json({
      status: true,
      user: currentUser,
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.log(`error in VerifyRegister controller: ${error}`);
    return res.status(500).json({ status: false, message: 'error', error });
  }
};

export const getUserProfile = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found',
    });
  }

  return res.status(200).json({
    status: true,
    user: user,
  });
};

export const logout = async (req, res) => {
  try {
    res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', '', { maxAge: 0 });
    res.clearCookie('AKURATAMA_ICT_REGISTER_TOKEN');
    req.session.destroy();
    res.status(200).json({ message: 'Logout successully' });
  } catch (err) {
    console.log('Error in log out controller ', err.message);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};
