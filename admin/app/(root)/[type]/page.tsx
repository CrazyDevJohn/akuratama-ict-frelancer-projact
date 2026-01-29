import Course from "@/components/type/Course";
import Request from "@/components/type/Request";
import User from "@/components/type/User";
import { TypeProps } from "@/types";
import React from "react";

const page = async ({ params, searchParams }: TypeProps) => {
  const type = ((await params)?.type as string) || "";
  return (
    <section className="w-full h-full p-3">
      <h1 className="text-4xl font-bold capitalize text-gray-800">{type}</h1>
      {type === "users" ? <User /> : type === "course" ? <Course /> : type === "request" ? <Request/> : <></>}
    </section>
  );
};

export default page;
