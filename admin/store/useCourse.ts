import { CourseInterface, useCourseProps } from "@/types";
import axios from "axios";
import { create } from "zustand";

export const useCourse = create<useCourseProps>((set, get) => ({
  allCourses: [],
  // addedLectures: [],
  allLessons: [],
  getAllCourse: async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
      { withCredentials: true },
    );
    console.log(res.data);
    set((state) => ({ allCourses: res.data.courses || [] }));
  },

  addCourse: async (
    title,
    description,
    grade,
    price,
    image,
    lessons,
    modules,
    duration,
    features,
    assets,
  ) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/add`,
      {
        title,
        description,
        price,
        grade,
        image,
        lessons,
        modules,
        duration,
        features,
        assets,
      },
      { withCredentials: true },
    );
    const { getAllCourse } = get();

    await getAllCourse();
  },
  getCourseById: async (id) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${id}`,
      { withCredentials: true },
    );
    const course = await res.data;
    return course;
  },
  createLesson: async (
    title,
    description,
    // pageNumber,
    /**  lecture, */ videoUrl,
    courseId,
  ) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/lessons/create-lesson`,
      {
        title,
        description,
        // pageNumber,
        // lectures,
        videoUrl,
        courseId,
      },
      { withCredentials: true },
    );

    const lesson = await res.data;
    return lesson;
  },
  // createLecture: async (title, description, pageNumber, resources) => {
  //   // const res = await axios.post(
  //   //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/lessons/create-lecture`,
  //   //   {
  //   //     title,
  //   //     description,
  //   //     pageNumber,
  //   //     resources,
  //   //   },
  //   //   { withCredentials: true },
  //   // );

  //   // const { lecture } = await res.data;
  //   set((state) => ({
  //     addedLectures: [
  //       ...state.addedLectures,
  //       { title, description, pageNumber, resources },
  //     ],
  //   }));
  // },
  getAllLesson: async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/lessons`,
      { withCredentials: true },
    );
    const lessons = await res.data;

    console.log(lessons);

    set(() => ({ allLessons: lessons }));
  },
  getLessonById: async (id) => {},
}));
