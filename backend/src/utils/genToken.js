import jwt from 'jsonwebtoken';

export const genToken = async (res, payload, secret, exp) => {
  if (payload === null) {
    return res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', null, {
      maxAge: 0, // 7D MS
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: exp === '15d' ? '15d' : '15m',
  });

  return res.cookie('AKURATAMA_ICT_REGISTER_TOKEN', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7D MS
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
};
