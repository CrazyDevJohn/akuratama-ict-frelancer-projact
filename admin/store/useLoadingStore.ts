import { LoadingState } from "@/types";
import { create } from "zustand";

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));

export default useLoadingStore;
