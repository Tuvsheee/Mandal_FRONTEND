"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import IMGURL from "@/utils/constant";

interface Props {
  images: string[];
}

const GallerySlider = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Fullscreen Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            className="absolute top-4 left-4 text-white text-2xl"
            onClick={closeModal}
          >
            <X />
          </button>
          <img
            src={`${IMGURL}/${images[selectedIndex]}`}
            alt={`Image ${selectedIndex}`}
            className="object-contain h-[70vh] w-full max-w-7xl"
          />
        </div>
      )}

      {/* Main Image Display */}
      <div
        className="rounded-xl overflow-hidden cursor-pointer w-full max-w-7xl"
        onClick={openModal}
      >
        <img
          src={`${IMGURL}/${images[selectedIndex]}`}
          alt="Main"
          className=" w-full  h-[300px] md:h-[450px] object-cover rounded-xl"
        />
      </div>

      {/* Thumbnail List */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {images.map((img, index) => (
          <div
            key={img}
            onClick={() => handleThumbnailClick(index)}
            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
              index === selectedIndex ? "border-white" : "border-transparent"
            }`}
          >
            <img
              src={`${IMGURL}/${img}`}
              alt={`Thumbnail ${index}`}
              className="w-28 h-20 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GallerySlider;
