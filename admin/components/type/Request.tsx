"use client";

import useBillingStore from "@/store/useBillingStore";
import { BillInterface } from "@/types";
import React, { useEffect } from "react";

const Request = () => {
  const { allBilling, getBills } = useBillingStore();

  useEffect(() => {
    getBills();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full h-full overflow-hidden relative ">
      <div className="w-full h-full absolute overflow-scroll p-4 flex justify-start items-start flex-wrap remove-scrollbar gap-4">
        {allBilling.map((bill, index) => {
          return <Item bill={bill} key={bill._id} />;
        })}
      </div>
    </section>
  );
};

const Item = ({
  bill: { _id, billUrl, courseId, isApruved, studentId, timeDuration },
}: {
  bill: BillInterface;
}) => {
  const { aprureBill } = useBillingStore();

  const hanldeApruale = async () => {
    const res = await aprureBill(_id, studentId, courseId);

    console.log(res);
    if (res.message === "request apruved") {
      alert("request apruved", _id);
    }
  };

  return (
    <div className="bg-light-400  w-[300px] flex justify-center items-center flex-col rounded-xl overflow-hidden">
      <div className="w-full h-[200px] relative ">
        {billUrl && (
          <a href={billUrl} target="_blank">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={billUrl}
              width={300}
              height={200}
              alt="Image"
            />
          </a>
        )}
      </div>
      <div className="w-full px-2 py-3 bg-light-300">
        <div className="flex justify-evenly items-center gap-3">
          <button
            onClick={() => hanldeApruale()}
            className="px-4 py-2 bg-blue-500 cursor-pointer rounded-md my-2 mx-auto w-full hover:bg-red-400 text-light-400 font-semibold text-xl"
          >
            Apruve
          </button>
          <button className="px-4 py-2 bg-brand cursor-pointer rounded-md my-2 mx-auto w-full text-light-400 font-semibold text-xl">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;
