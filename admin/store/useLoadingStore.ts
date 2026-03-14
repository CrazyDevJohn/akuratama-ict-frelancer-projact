import { LoadingState } from "@/types";
import { create } from "zustand";

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingText: "Loading...",
  setLoadingText: (text) => set({ loadingText: text }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));

export default useLoadingStore;
