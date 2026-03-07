"use client";

import React, { useEffect, useState } from "react";
import { LectureForm } from "../ui/lecture-form";
import { useCourse } from "@/store/useCourse";
import { LessonInterface } from "@/types";
import useLoadingStore from "@/store/useLoadingStore";

const Lectures = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { getAllLesson, allLessons } = useCourse();
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    setIsLoading(true);
    getAllLesson().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <section>
      {/* show all lectures */}

      <div className="pt-4">
        {allLessons.map((lecture) => (
          <Item lesson={lecture} key={lecture._id} />
        ))}
      </div>
      <div className="w-full max-w-sm">
        <LectureForm
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          className="w-full h-full overflow-hidden"
        />
      </div>
    </section>
  );
};

const Item = ({
  lesson: { title, description, _id, courseId, videoUrl, pageNumber },
}: {
  lesson: LessonInterface;
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

        <div className="bg-gradient-to-tr from-blue-500 to-purple-500 w-full h-full absolute flex justify-center items-center flex-col">
          <h1 className="text-3xl text-white capitalize pb-2 font-semibold text-center">
            {title}
          </h1>
        </div>
      </div>
      <div className="w-full px-2 py-3 bg-light-300">
        <p className="text-sm font-semibold to-gray-700 capitalize">
          {description.trim().length > 50
            ? description.substring(0, 50) + "..."
            : description}
        </p>

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

export default Lectures;
