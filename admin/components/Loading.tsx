"use client";

import useLoadingStore from "@/store/useLoadingStore";
import React from "react";
import { create } from "zustand";
import Lottie from "lottie-react";
import animationData from "./51-preloader.json";

const Loading = () => {
  const { isLoading } = useLoadingStore();
  if (!isLoading) {
    return null;
  }
  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
      <div className="w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm">
        <div className="w-72 h-60 bg-white rounded-xl flex justify-center items-center shadow-2xl border-2 border-light-300">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Loading;
