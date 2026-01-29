const createUserWithEmailAndPassword = async (name, email, password) => {
  const res = await axios.post(
    `http://localhost:5000/api/v2/auth/register`,
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
    `http://localhost:5000/api/v2/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  
  console.log(res.data.user)
  return await res.data;
};

const sendOtp = async (otp) => {
  const res = await axios.post(
    `http://localhost:5000/api/v2/auth/verify`,
    {
      otp: otp,
    },
    {
      withCredentials: true,
    }
  );


  return await res.data;
};

const checkIsAuthonticated = async () => {
  const res = await axios.get(
    `http://localhost:5000/api/v2/auth/profile`, 
    {
      withCredentials: true,
     
    }
  );


  return await res.data;
};

const logOut = async () => {
  const res = await axios.post(
    `http://localhost:5000/api/v2/auth/logout`,
    {}, {withCredentials:true}
  );

  console.log(res.data);

  return await res.data;
};


const getCourseById= async (id) => {
  const res = await axios.get(
    `http://localhost:5000/api/v2/course/id/${id}`,
     {withCredentials:true}
  );

  console.log(res.data);

  return await res.data;
}; 

const fetchAllCourses = async () => {
  const res = await axios.get("http://localhost:5000/api/v2/course", {withCredentials:true});
  console.log("All courses ", await res.data.courses);
  return await res.data.courses
}

const fetchAllCoursesForStudent = async () => {
  const res = await axios.get("http://localhost:5000/api/v2/course/all-enrolled", {withCredentials:true});
  console.log("All courses ", await res.data.course);
  return await res.data.course
}

const uploadBill = async (file, data) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("bill", JSON.stringify(data));

          const res = await axios.post(
            "http://localhost:5000/api/v2/billing/billing",
            formData,
            {
              withCredentials: true,
              
            }
          );

          console.log(res);


        } catch (error) {
          console.log("error in uploading billl");
          console.log(error);
        }
};
      


// https://akuratama-ict-frelancer-projact.vercel.app/api/v2