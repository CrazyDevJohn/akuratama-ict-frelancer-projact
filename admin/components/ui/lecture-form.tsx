"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCourse } from "@/store/useCourse";
import { Select, SelectValue } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger } from "./select";

export function LectureForm({
  className,
  isOpened,
  setIsOpened,
  ...props
}: React.ComponentProps<"div"> & {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}) {
  const [isLectureGridOpened, setIsLectureGridOpened] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div>
        <Button onClick={() => setIsOpened(true)}>Create New Lesson</Button>
      </div>

      <Popup
        isOpened={isOpened}
        setisOpened={setIsOpened}
        setIsLectureGridOpened={setIsLectureGridOpened}
      />
    </div>
  );
}

const Popup = ({
  isOpened,
  setisOpened,
  setIsLectureGridOpened,
}: {
  isOpened: any;
  setisOpened: any;
  setIsLectureGridOpened: any;
}) => {
  return (
    <Dialog open={isOpened} onOpenChange={setisOpened}>
      {/* <DialogTrigger>open</DialogTrigger> */}
      <DialogContent showCloseButton className="bg-light-400">
        <DialogHeader>
          <DialogTitle>Create New Lecture</DialogTitle>
          <DialogDescription>Provide all fields properly</DialogDescription>
        </DialogHeader>

        <div>
          <InputGrid
            isOpened={isOpened}
            setisOpened={setisOpened}
            setIsLectureGridOpened={setIsLectureGridOpened}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

/**
 * 
 
  title,
  description,
  pageNumber,
  lectures,
  courseId,

 
 */

export function InputGrid({
  isOpened,
  setisOpened,
  setIsLectureGridOpened,
}: {
  isOpened: any;
  setisOpened: any;
  setIsLectureGridOpened: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [courseId, setCourseId] = useState("");

  //  const [lectures, setLectures] = useState<
  //    {
  //      title: string;
  //      description: string;
  //      pageNumber: number;
  //      resources: string;
  //    }[]
  //  >([]);

  const { createLesson, allCourses } = useCourse();

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
        id="pageNumber"
        title="Page Number"
        placeholder={"1"}
        change={setPageNumber}
      />

      <InputField
        id="videoUrl"
        title="Video URL"
        placeholder={"https://example.com/video"}
        change={setVideoUrl}
      />

      <Select onValueChange={(value) => setCourseId(value)}>
        <SelectTrigger
          className={
            "overflow-hidden rounded-md border border-light-300 bg-light-400 text-left text-sm shadow-sm"
          }
        >
          <SelectValue placeholder="Select A Course" />
        </SelectTrigger>
        <SelectContent
          className={
            "overflow-hidden rounded-md border border-light-300 bg-light-400 text-left text-sm shadow-sm"
          }
        >
          {allCourses.map(
            (course: any) => (
              console.log(course),
              (
                <SelectItem key={course._id} value={course._id}>
                  {course.title}
                </SelectItem>
              )
            ),
          )}
        </SelectContent>
      </Select>

      {/* {addedLectures.length === 0 ? (
        <h3 className="text-red-500 font-bold">Please add lectures first</h3>
      ) : (
        <MultiSelect
          onValuesChange={(valuse) => {
            const selectedLectures = addedLectures.filter((lecture: any) =>
              valuse.includes(lecture.title),
            );
            setLectures(selectedLectures);
          }}
        >
          <MultiSelectTrigger className="w-full max-w-[400px]">
            <MultiSelectValue placeholder="Select lectures..." />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
            

              {addedLectures.map((lecture: any, index: number) => (
                <MultiSelectItem value={lecture.title} key={lecture.title}>
                  {lecture.title}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>

        //    <MultipleSelector
        //   selectFirstItem={false}
        //   defaultOptions={[
        //     ...addedLectures.map((lecture: any) => ({
        //       label: lecture.title,
        //       value: lecture._id,
        //     })),
        //   ]}
        //   placeholder="Select frameworks you like..."
        //   emptyIndicator={
        //     <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
        //       no results found.
        //     </p>
        //   }
        // />
      )} */}

      <Field className="flex justify-end items-end">
        <button
          onClick={async () => {
            // if (lectures.length === 0) {
            //   alert("Please select at least one lecture");
            //   return;
            // }
            await createLesson(
              title,
              description,
              pageNumber,
              // lectures,
              videoUrl,
              courseId,
            );
            setisOpened(false);
          }}
          className="w-full py-2 bg-brand text-2xl font-semibold text-light-400 rounded-md"
        >
          ADD
        </button>
      </Field>
      <Field className="flex justify-end items-end">
        <button
          onClick={() => setIsLectureGridOpened(true)}
          className="w-full py-2 bg-brand text-2xl font-semibold text-light-400 rounded-md"
        >
          Add New Lesson
        </button>
      </Field>
    </FieldGroup>
  );
}

// title,
// description,
// pageNumber,
// resources,

const LectureGrid = ({
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
          <DialogTitle>Create New Lecture</DialogTitle>
          <DialogDescription>Provide all fields properly</DialogDescription>
        </DialogHeader>

        <div>
          <LectureInputGrid isOpened={isOpened} setisOpened={setisOpened} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function LectureInputGrid({
  isOpened,
  setisOpened,
}: {
  isOpened: any;
  setisOpened: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [resources, setResources] = useState("");

  // const { createLecture } = useCourse();

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
        id="pageNumber"
        title="Page Number"
        type="number"
        placeholder={"1"}
        change={setPageNumber}
      />

      <InputField
        id="resources"
        title="Resources"
        placeholder={
          "https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j"
        }
        change={setResources}
      />

      <Field className="flex justify-end items-end">
        <button
          onClick={async () => {
            // await createLecture(title, description, pageNumber, resources);
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

// common for both course and lesson input grid, can be used for resource input grid as well

const InputField = ({
  id,
  title,
  placeholder,
  change,
  type = "text",
}: {
  id: string;
  title: string;
  placeholder: string;
  change: any;
  type?: string;
}) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{title}</FieldLabel>
      <Input
        onChange={(ev) => change(ev.target.value)}
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </Field>
  );
};
