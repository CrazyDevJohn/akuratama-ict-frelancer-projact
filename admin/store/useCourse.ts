import { CourseInterface } from "@/types";
import axios from "axios";
import { create } from "zustand";

interface useCourseProps {
  allCourses: CourseInterface[];
  getAllCourse: () => void;
  getCourseById: (id:string) => any;

  addCourse: (
    title: string,
    description: string,
    grade: string,
    price: number,
    image?: string,
  ) => void;
}

export const useCourse = create<useCourseProps>((set, get) => ({
  allCourses: [],
  getAllCourse: async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {withCredentials:true});
    console.log(res.data)
    set((state) => ({ allCourses: res.data.courses || [] }));
  },

  addCourse: async (title, description, grade, price, image) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/add`, {
      title,
      description,
      price,
      grade,
      image,
    },{withCredentials:true});
    const { getAllCourse } = get();

    await getAllCourse()
  },
  getCourseById: async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${id}`, { withCredentials: true });
    const course =await res.data
    return course
  }
}));
