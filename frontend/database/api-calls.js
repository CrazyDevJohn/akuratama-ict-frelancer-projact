const createUserWithEmailAndPassword = async (name, email, password) => {
  const res = await axios.post(
    `https://akuratama-ict-frelancer-projact.vercel.app/api/v2/auth/register`,
    {
      name,
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return await res.data;
};

const logiWithEmailAndPasword = async (email, password) => {
  const res = await axios.post(
    `https://akuratama-ict-frelancer-projact.vercel.app/api/v2/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return await res.data;
};

const sendOtp = async (otp) => {
  const res = await axios.post(
    `https://akuratama-ict-frelancer-projact.vercel.app/api/v2/auth/verify`,
    {
      otp: otp,
    },
    {
      withCredentials: true,
    }
  );

  return await res.data;
};
