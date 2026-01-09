"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TravelDay {
  direction?: string; 
  program: string;
  photos: string[];
}

const DaysAccordion = ({
  days,
  IMGURL,
  t,
}: {
  days: TravelDay[];
  IMGURL: string;
  t: any;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {days.map((day, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="mb-4 border rounded overflow-hidden transition-all duration-500"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 font-semibold text-lg cursor-pointer"
            >
              <span>
                {t("day")} {index + 1}
              </span>
              <span
                className={`transform transition-transform duration-500 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                {isOpen ? (
                  <ChevronUp className="text-orange-500" />
                ) : (
                  <ChevronDown />
                )}
              </span>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out grid overflow-hidden ${
                isOpen
                  ? "max-h-[1000px] opacity-100 p-4"
                  : "max-h-0 opacity-0 p-0"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {day.photos?.map((photo, idx) => (
                  <img
                    key={idx}
                    src={`${IMGURL}/${photo}`}
                    alt={`Day ${index + 1} photo`}
                    className="w-full h-48 object-cover rounded"
                  />
                ))}
              </div>
              <p className="text-base font-semibold text-black whitespace-pre-line">
                {day.direction}
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {day.program}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DaysAccordion;
