"use client";

import React, { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Highlight {
  title: string;
  description: string;
}

interface Props {
  highlights: Highlight[];
}

const Highlights = ({ highlights }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); 

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-white rounded-md">
      {highlights.map((highlight, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border rounded-md mb-2 overflow-hidden">
            <button
              className="flex items-center justify-between w-full p-3 font-medium text-left"
              onClick={() => toggleOpen(index)}
            >
              <span className={isOpen ? "text-orange-500" : "text-black"}>
                {highlight.title}
              </span>
              {isOpen ? (
                <ChevronUp className="text-orange-500" />
              ) : (
                <ChevronDown />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden`}
              style={{
                maxHeight: isOpen ? "200px" : "0px",
                opacity: isOpen ? 1 : 0,
                padding: isOpen ? "12px" : "0px 12px",
              }}
            >
              <p className="text-sm text-gray-600">{highlight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Highlights;
