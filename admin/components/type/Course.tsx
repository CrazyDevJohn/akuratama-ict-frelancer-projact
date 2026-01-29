"use client";
import { CARD_COLORS } from "@/lib/utils";
import { useCourse } from "@/store/useCourse";
import { CourseInterface } from "@/types";
import Image from "next/image";
import React, { useEffect } from "react";




const Course = () => {
  const { allCourses, getAllCourse } = useCourse();

  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full h-full overflow-hidden relative ">
      <div className="w-full h-full absolute overflow-scroll p-4 flex justify-start items-start flex-wrap remove-scrollbar gap-4">
        {allCourses?.map((course, index) => {
          return (
            <Item course={course} key={`Course-item-${index.toString()}`} />
          );
        })}
      </div>
    </section>
  );
};


const Item = ({
  course: { title, description, id, price, image, grade },
}: {
  course: CourseInterface;
}) => {
  return (
    <div className="bg-light-400  w-[300px] flex justify-center items-center flex-col rounded-xl overflow-hidden">
      <div className="w-full h-[200px] relative ">
        {/* {image && (
          <img
            className="w-full h-full object-cover rounded-xl"
            src={image}
            width={300}
            height={200}
            alt="Image"
          />
        )} */}

        <div style={{
          background:image,
        }}
        className="w-full h-full absolute flex justify-center items-center flex-col"
        >
          <h1 className="text-3xl text-white capitalize pb-2 font-semibold text-center">{ title}</h1>
          <h2 className="text-2xl text-white capitalize pb-2 font-semibold">
            {grade}
          </h2>
          

        </div>
      </div>
      <div className="w-full px-2 py-3 bg-light-300">
        <p className="text-sm font-semibold to-gray-700 capitalize">
          {description}
        </p>
        <h2 className="text-xl font-semibold">RS.{price}</h2>
        <div className="flex justify-evenly items-center gap-3">
          <button className="px-4 py-2 bg-blue-500 cursor-pointer rounded-md my-2 mx-auto w-full  text-light-400 font-semibold text-xl">
            Desable
          </button>
          <button className="px-4 py-2 bg-brand cursor-pointer rounded-md my-2 mx-auto w-full text-light-400 font-semibold text-xl">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
