"use client";
import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import IMGURL from "@/utils/constant";

interface Props {
  images: string[];
}

const GallerySlider = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const total = safeImages.length;
  if (!total) return null;

  const clamp = (i: number) => (i + total) % total;

  const prev = clamp(index - 1);
  const next = clamp(index + 1);

  const src = (p: string) => `${IMGURL}/${p}`;

  const handlePrev = () => {
    setDirection("right");
    setIndex(prev);
    setTimeout(() => setDirection(null), 600);
  };

  const handleNext = () => {
    setDirection("left");
    setIndex(next);
    setTimeout(() => setDirection(null), 600);
  };

  return (
    <>
      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-4 left-4 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <X />
          </button>

          <img
            src={src(safeImages[index])}
            className="max-h-[80vh] max-w-7xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* === CENTER-LOCK SLIDER === */}
      <div className="relative w-full h-[420px] flex items-center justify-center">
        {/* LEFT preview */}
        <div
          onClick={handlePrev}
          className="hidden md:block absolute left-1/2 -translate-x-[520px] w-[300px] h-[200px]  overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
        >
          <img
            src={src(safeImages[prev])}
            className="w-full h-full object-cover transition-all duration-700 ease-out transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-white/70 transition-opacity duration-500" />
        </div>

        {/* CENTER image (ONLY ONE CENTERED) */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative z-20 w-[720px] h-[360px]  overflow-hidden cursor-pointer shadow-xl"
        >
          <img
            key={index}
            src={src(safeImages[index])}
            className={`w-full h-full object-cover transition-all duration-700 ease-out transform hover:scale-110 ${
              direction === "left"
                ? "animate-slideInLeft"
                : direction === "right"
                ? "animate-slideInRight"
                : ""
            }`}
          />

          {/* arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* RIGHT preview */}
        <div
          onClick={handleNext}
          className="hidden md:block absolute left-1/2 translate-x-[220px] w-[300px] h-[200px]  overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
        >
          <img
            src={src(safeImages[next])}
            className="w-full h-full object-cover transition-all duration-700 ease-out transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-white/70 transition-opacity duration-500" />
        </div>
      </div>
    </>
  );
};

export default GallerySlider;
