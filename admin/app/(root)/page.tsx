"use client";

import { Button } from "@/components/ui/button";
import useBillingStore from "@/store/useBillingStore";
import useLoadingStore from "@/store/useLoadingStore";
import useSummeryStore from "@/store/useSummery";
import { CircleDollarSign, Library, Users, UsersRound } from "lucide-react";
import { useEffect } from "react";

const cardData = [
  {
    title: "Total Visitors",
    value: "1,234",
    icon: Users,
  },
  {
    title: "Total Sales",
    value: "$12,345",
    icon: CircleDollarSign,
  },
  {
    title: "Total Courses",
    value: "567",
    icon: Library,
  },
  {
    title: "Happy Students",
    value: "890",
    icon: UsersRound,
  },
];

export default function Page() {
  const { summary, getSummarys } = useSummeryStore();
  const { setIsLoading, setLoadingText } = useLoadingStore();
  console.log(summary);

  useEffect(() => {
    setIsLoading(true);
    setLoadingText("Loading Dashboard!");
    getSummarys().finally(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <section className="w-full h-full relative flex justify-between items-start flex-wrap px-4 py-6 md:px-8 md:py-6">
      <div className="w-full md:w-2/3 h-full relativ">
        <div className="w-full h-36 relative bg-gradient-to-br from-error to-art rounded-xl shadow-xl overflow-hidden">
          <img
            src={"/images/bg-bottom.png"}
            className="w-full h-full object-cover absolute right-0 pointer-events-none"
          />
          <div className="flex justify-center items-start flex-col p-4 z-10 absolute gap-1">
            <h1 className="text-4xl text-muted font-semibold">Hello Sir.</h1>
            <p className="text-sm text-light-300 font-semibold">
              Start Your Work With Some Decks!
            </p>
            <Button>Explore More</Button>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {summary.map((item) => (
              <div
                key={item.title}
                className="w-full h-24 bg-light-300 rounded-lg shadow-md flex justify-start items-start px-4 py-3 gap-2 flex-col"
              >
                <h3 className="text-base font-semibold text-green-600">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold letter-spacing">
                  {item.value} +
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 h-full relative"></div>
    </section>
  );
}
