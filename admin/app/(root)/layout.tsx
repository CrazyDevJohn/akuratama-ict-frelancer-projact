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
import { Cross, X } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, checkAuth } = useAuthStore();
  const { getAllCourse } = useCourse();
  const [isOpened, setisOpened] = useState(false);

  useEffect(() => {
    checkAuth();
    if (!user) redirect("/login");
    if (user) getAllCourse();
  }, []);

  if (!user) {
    return;
  }

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
  const [features, setFeatures] = useState([]);
  const [assets, setAssets] = useState([]);

  const [modules, setModules] = useState("");
  const [lessons, setLessons] = useState("");
  const [duration, setDuration] = useState("");

  const [activeColor, setActiveColor] = useState(
    `linear-gradient(135deg, ${CARD_COLORS[1][0]}, ${CARD_COLORS[1][1]})`,
  );

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

      <InputField
        id="Modules"
        title="Modules"
        placeholder={"40 Modules"}
        change={setModules}
      />
      <InputField
        id="Lessons"
        title="Lessons"
        placeholder={"45 Lessons"}
        change={setLessons}
      />
      <InputField
        id="Duration"
        title="Duration"
        placeholder={"6 Mothns"}
        change={setDuration}
      />

      <TikWords
        id="assets"
        title="Add Metireales."
        placeholder={
          "https://github.com/CrazyDevJohn/akuratama-ict-frelancer-projact"
        }
        change={() => {}}
        setState={setFeatures}
        data={features}
      />
      <TikWords
        id="features"
        title="Add Features."
        placeholder={"Internet Fundamentals"}
        change={() => {}}
        setState={setAssets}
        data={assets}
      />
      <div className="w-full h-11 bg-light-200 rounded-md flex justify-between items-center gap-1 px-2">
        {CARD_COLORS.map((color, index) => (
          <div
            key={`CARD-COLOR-${index.toString()}`}
            style={{
              background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
            }}
            className={cn(
              "w-8 h-8 rounded-md",
              activeColor ===
                `linear-gradient(135deg, ${color[0]}, ${color[1]})` &&
                "border-2 border-white",
            )}
            onClick={() =>
              setActiveColor(
                `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
              )
            }
          ></div>
        ))}
      </div>
      <Field className="flex justify-end items-end">
        <button
          onClick={async () => {
            await addCourse(
              title,
              description,
              grade,
              parseInt(price),
              activeColor,
              lessons,
              modules,
              duration,
              features,
              assets,
            );
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

const TikWords = ({
  id,
  title,
  placeholder,
  change,
  setState,
  data,
}: {
  id: string;
  title: string;
  placeholder: string;
  change?: any;
  setState?: any;
  data: string[] | any;
}) => {
  const [word, setWord] = useState("");

  const keyDownEv = (key: String) => {
    if (key === "Enter") {
      const isIncludedLink = data?.includes(word);

      if (word === "") {
        return;
      }

      if (isIncludedLink) {
        alert("this link allready added!" + word);
        return;
      }

      setState((prev: string[]) => [...prev, word]);
      setWord("");
    }
  };

  const handleClearItem = (i: number, d: string) => {
    const sortedList = data.filter(
      (item: string, index: number) => item !== d && index !== i,
    );

    setState(sortedList);
  };

  return (
    <div className="flex flex-col">
      <FieldLabel htmlFor={id}>{title}</FieldLabel>
      {data && (
        <div className="flex justify-start items-center pb-2 gap-2 max-w-full flex-wrap">
          {data?.map((d: string, index: number) => {
            return (
              <div
                key={index.toString()}
                className="p-1 px-2 gap-1 bg-gray-300 rounded-xl flex justify-between items-center text-xs"
              >
                {d.substring(0, 4)}
                <button onClick={() => handleClearItem(index, d)}>
                  <X size={14} color="black" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <InputField
        id={id}
        title={""}
        placeholder={placeholder}
        change={setWord}
        onKeyDown={(ev: any) => keyDownEv(ev.key)}
        noLable
        value={word}
      />
    </div>
  );
};

const InputField = ({
  id,
  title,
  placeholder,
  change,
  onKeyDown,
  noLable = false,
  value,
}: {
  id: string;
  title: string;
  placeholder: string;
  change?: any;
  onKeyDown?: any;
  noLable?: boolean;
  value?: any;
}) => {
  return (
    <Field>
      {!noLable && <FieldLabel htmlFor={id}>{title}</FieldLabel>}
      <Input
        onChange={(ev) => change(ev.target.value)}
        id={id}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        value={value}
      />
    </Field>
  );
};

export default DashboardLayout;
