import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const usersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const User = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-full overflow-hidden relative">
      <div className="w-full h-full absolute overflow-scroll p-4 remove-scrollbar">
        {usersArray?.map((user, index) => {
          return (
            <div
              key={`selct-${index.toString()}`}
              className="relative w-full h-24 flex justify-between items-center gap-4"
            >
              <div className="flex justify-start items-center gap-4">
                <Image
                  src={"/images/avatar.png"}
                  width={40}
                  height={40}
                  alt="User Image"
                />
                <h1 className="text-xl font-semibold text-gray-800 ">
                  John friday
                </h1>
                <h3 className="text-ae font-semibold text-gray-700">
                  Crazydevjohn@gmail.com
                </h3>
              </div>

              <div>
                <UserSelect />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UserSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={"Active"} />
      </SelectTrigger>
      <SelectContent className="bg-light-400">
        <SelectGroup>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Blocked">Blocked</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default User;
