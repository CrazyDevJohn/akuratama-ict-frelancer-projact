"use client";

import useLoadingStore from "@/store/useLoadingStore";
import React from "react";
import { create } from "zustand";
import Lottie from "lottie-react";
import animationData from "./51-preloader.json";

const Loading = () => {
  const { isLoading, loadingText } = useLoadingStore();
  if (!isLoading) {
    return null;
  }
  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden z-50">
      <div className="w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-sm">
        <div className="w-72 h-72 bg-white rounded-xl flex flex-col justify-center items-center shadow-2xl border-2 border-light-300">
          <Lottie
            animationData={animationData}
            loop={true}
            className="h-full object-cover"
          />

          <h1 className="mb-10 mx-auto text-xl font-semibold text-light-100">
            {loadingText}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Loading;
