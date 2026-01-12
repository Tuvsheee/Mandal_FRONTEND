"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import IMGURL from "@/utils/constant";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  images: string[];
}

const GallerySlider = ({ images }: Props) => {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const total = safeImages.length;
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // direction: -1 = prev, +1 = next (for animation)
  const [dir, setDir] = useState<-1 | 1>(1);

  if (!total) return null;

  const clamp = (i: number) => (i + total) % total;
  const prev = clamp(index - 1);
  const next = clamp(index + 1);
  const src = (p: string) => `${IMGURL}/${p}`;

  const goPrev = () => {
    setDir(-1);
    setIndex((v) => clamp(v - 1));
  };

  const goNext = () => {
    setDir(1);
    setIndex((v) => clamp(v + 1));
  };

  const centerVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
    }),
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
            className="absolute top-4 left-4 text-white/90 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <X />
          </button>

          {total > 1 && (
            <>
              <button
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <ChevronLeft />
              </button>
              <button
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <ChevronRight />
              </button>
            </>
          )}

          <img
            src={src(safeImages[index])}
            className="max-h-[82vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            alt=""
          />
        </div>
      )}

      {/* SLIDER */}
      <div className="relative w-full flex items-center justify-center py-6 md:py-10">
        {/* LEFT preview (below center/arrows) */}
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="hidden md:block absolute left-1/2 -translate-x-[520px] w-[260px] h-[260px] overflow-hidden z-10"
            aria-label="Previous"
          >
            <img
              src={src(safeImages[prev])}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-white/65" />
          </button>
        )}

        {/* CENTER (above previews) */}
        <div className="relative z-30 w-[86vw] max-w-[520px] max-h-[320px] aspect-square">
          {/* image wrapper ONLY clips image */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full h-full overflow-hidden"
            aria-label="Open image"
          >
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={index}
                src={src(safeImages[index])}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                custom={dir}
                variants={centerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: "easeOut" }}
              />
            </AnimatePresence>
          </button>

          {/* ARROWS (always on top, protruding) */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 rounded-full bg-black/90 hover:bg-black text-white flex items-center justify-center z-40 shadow-md"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 rounded-full bg-black/90 hover:bg-black text-white flex items-center justify-center z-40 shadow-md"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* RIGHT preview (below center/arrows) */}
        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="hidden md:block absolute left-1/2 translate-x-[260px] w-[260px] h-[260px] overflow-hidden z-10"
            aria-label="Next"
          >
            <img
              src={src(safeImages[next])}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-white/65" />
          </button>
        )}
      </div>
    </>
  );
};

export default GallerySlider;
