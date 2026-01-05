import jwt from 'jsonwebtoken';

export const genToken = async (res, payload, secret, exp) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: exp === '15d' ? '15d' : '15m',
  });

  return res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', token, {
    maxAge: exp === '15d' ? 15 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000, // 7D MS
    httpOnly: false,
    sameSite: 'strict',
    secure: true,
  });
};
