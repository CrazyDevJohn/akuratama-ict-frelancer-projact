"use client";

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
import useUserStore from "@/store/useUserStore";
import useLoadingStore from "@/store/useLoadingStore";

const User = () => {
  const { users, getUsers } = useUserStore();
  const { setIsLoading, setLoadingText } = useLoadingStore();

  React.useEffect(() => {
    setIsLoading(true);
    setLoadingText("Loading all Users!");
    getUsers().finally(() => {
      setIsLoading(false);
      console.log("loaded users");
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden relative">
      <div className="w-full h-full absolute overflow-scroll pt-8 remove-scrollbar">
        {users?.map((user, index) => {
          return (
            <div
              key={`selct-${index.toString()}`}
              className="relative w-full mb-6 flex justify-between items-center gap-4"
            >
              <div className="flex justify-start items-center gap-4">
                <Image
                  src={"/images/avatar.png"}
                  width={40}
                  height={40}
                  alt="User Image"
                />
                <h1 className="text-xl font-semibold text-gray-800 ">
                  {user.name}
                </h1>

                <h3 className="text-ae font-semibold text-gray-700">
                  {user.email}
                </h3>
                <h1 className="text-xl font-semibold text-gray-800 ">
                  {user?.isAdmin ? "Admin" : "User"}
                </h1>
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
