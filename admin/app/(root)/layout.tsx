"use client";

import { redirect, usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCourse } from "@/store/useCourse";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import { CARD_COLORS, cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, checkAuth } = useAuthStore();
  const { getAllCourse}=useCourse()
  const [isOpened, setisOpened] = useState(false);
  const pathname = usePathname();

  
  useEffect(() => {
    checkAuth();
    if (!user) redirect("/login");
    if (user)getAllCourse()
  }, []);

  if (!user) {
    return 
  }

  // if (pathname === "/") {
  //   return redirect('/users')
  // }

  return (
    <section className="w-screen h-screen relative bg-light-400 flex justify-center items-center flex-col px-4 py-6 md:px-8 md:py-6">
      <Header setisOpened={setisOpened} />
      <div className=" gap-4 w-full h-full flex justify-start items-start ">
        <Sidebar />
        <main className="bg-primary-light w-full h-full rounded-2xl p-4 overflow-hidden">
          {children}
        </main>
        <Popup isOpened={isOpened} setisOpened={setisOpened} />
      </div>
    </section>
  );
};

const Popup = ({
  isOpened,
  setisOpened,
}: {
  isOpened: any;
  setisOpened: any;
}) => {
  return (
    <Dialog open={isOpened} onOpenChange={setisOpened}>
      {/* <DialogTrigger>open</DialogTrigger> */}
      <DialogContent showCloseButton className="bg-light-400">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>Provide all fields properly</DialogDescription>
        </DialogHeader>

        <div>
          <InputGrid isOpened={isOpened} setisOpened={setisOpened} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function InputGrid({
  isOpened,
  setisOpened,
}: {
  isOpened: any;
  setisOpened: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [price, setPrice] = useState("");
  const [activeColor, setActiveColor] = useState(`linear-gradient(135deg, ${CARD_COLORS[1][0]}, ${CARD_COLORS[1][1]})`);

  const { addCourse } = useCourse();

  return (
    <FieldGroup className="grid max-w-sm grid-cols-2">
      <InputField
        id="title"
        title="Title"
        placeholder={"Grade 7 ICT"}
        change={setTitle}
      />
      <InputField
        id="description"
        title="Description"
        placeholder={"The Course Is ..."}
        change={setDescription}
      />
      <InputField
        id="grade"
        title="Grade"
        placeholder={"Grade 7"}
        change={setGrade}
      />
      <InputField
        id="price"
        title="Price"
        placeholder={"999.00"}
        change={setPrice}
      />
      <div className="w-full h-11 bg-light-200 rounded-md flex justify-between items-center gap-1 px-2">
        {
          CARD_COLORS.map((color, index) => (
            <div key={`CARD-COLOR-${index.toString()}`}
              style={{ background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`, }}
              className={cn("w-8 h-8 rounded-md", activeColor === `linear-gradient(135deg, ${color[0]}, ${color[1]})` && "border-2 border-white" )}
              onClick={()=> setActiveColor(`linear-gradient(135deg, ${color[0]}, ${color[1]})`,)}
            ></div>
          ))
        }
      </div>
      <Field className="flex justify-end items-end">
        <button
          onClick={async () => {
            await addCourse(title, description, grade, parseInt(price), activeColor);
            setisOpened(false);
          }}
          className="w-full py-2 bg-brand text-2xl font-semibold text-light-400 rounded-md"
        >
          ADD
        </button>
      </Field>
    </FieldGroup>
  );
}

const InputField = ({
  id,
  title,
  placeholder,
  change,
}: {
  id: string;
  title: string;
  placeholder: string;
  change: any;
}) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{title}</FieldLabel>
      <Input
        onChange={(ev) => change(ev.target.value)}
        id={id}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default DashboardLayout;
