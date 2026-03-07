import { UseSummeryStoreProps } from "@/types";
import axios from "axios";
import { create } from "zustand";

const useSummeryStore = create<UseSummeryStoreProps>((set) => ({
  summary: [
    // {
    //   title: "Avelable Courses",
    //   value: 521,
    // },
    // {
    //   title: "Available Lectures",
    //   value: 521,
    // },
    // {
    //   title: "Total Requests",
    //   value: 521,
    // },
    // {
    //   title: "Happy Students",
    //   value: 521,
    // },
  ],

  getSummarys: async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/summery`,
      {
        withCredentials: true,
      },
    );

    const data = await res.data;

    set((_state) => ({
      summary: [
        {
          title: "Avelable Courses",
          value: data.courseCount,
        },
        {
          title: "Available Lectures",
          value: data.lessonCount,
        },
        {
          title: "Total Requests",
          value: data.requestCount,
        },
        {
          title: "Happy Students",
          value: data.userCount,
        },
      ],
    }));
  },
}));

export default useSummeryStore;
