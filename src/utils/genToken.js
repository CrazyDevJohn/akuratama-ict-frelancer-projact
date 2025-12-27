import jwt from 'jsonwebtoken';

export const genToken = async (res, payload, secret, exp) => {
  const token = jwt.sign(payload, secret);

  return res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',

    sameSite: 'strict',
    maxAge: exp === '15d' ? 15 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000,
  });
};
