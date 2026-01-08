import jwt from 'jsonwebtoken';

export const genToken = (userId, res) => {
  if (userId === null) {
    res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', null, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7D MS
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });
    return;
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7D MS
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
};
