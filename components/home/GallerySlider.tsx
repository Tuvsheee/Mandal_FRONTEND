"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";

interface Props {
  images: string[];
}
 
const GallerySlider = ({ images }: Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setCurrentImageIndex(null);
  };

  const prevImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + images.length) % images.length
      );
    }
  };

  const nextImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: !isMobile ? <SampleNextArrow /> : <div></div>,
    prevArrow: !isMobile ? <SamplePrevArrow /> : <div></div>,
    beforeChange: (current: number, next: number) => setCurrentSlide(next), // Update the current slide index
  };

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        className="absolute right-[-50px] top-[50%] transform translate-y-[-50%] w-12 h-12 rounded-full bg-white border hover:bg-black hover:text-white flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        <ChevronRight />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        className="absolute left-[-50px] top-[50%] transform translate-y-[-50%] w-12 h-12 rounded-full border bg-white hover:bg-black hover:text-white flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        <ChevronLeft />
      </div>
    );
  }

  return (
    <>
      <div className="slider-container w-full flex flex-col mt-4">
        {currentImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            {/* Close Button */}
            <button
              className="absolute top-4 left-4 text-white text-2xl"
              onClick={closeImageModal}
            >
              <X />
            </button>

            {/* Previous Image Button */}
            <button
              className="absolute left-8 text-white text-3xl"
              onClick={prevImage}
            >
              <ChevronLeft />
            </button>

            {/* Next Image Button */}
            <button
              className="absolute right-8 text-white text-3xl"
              onClick={nextImage}
            >
              <ChevronRight />
            </button>

            {/* Display Current Image */}
            <div className="max-w-full max-h-full px-4 sm:px-0">
              <img
                src={
                  "https://shinely.tanuweb.cloud/uploads/" +
                  images[currentImageIndex]
                }
                alt={`Travel Location ${images[currentImageIndex]}`}
                className="object-contain h-[50vh] w-full sm:h-[60vh] md:h-[70vh] lg:h-[80vh] lg:w-[80vw] xl:w-[70vw]"
              />
            </div>
          </div>
        )}
        <Slider {...settings}>
          {images?.map((list, index) => {
            return (
              <div
                onClick={() => {
                  handleImageClick(index);
                }}
                key={list}
                className={`w-full px-2 aspect-[3/2]    ${
                  currentSlide == index
                    ? "self-center"
                    : index == currentSlide - 1
                    ? "float-start"
                    : "float-end"
                }`}
              >
                <img
                  src={`https://shinely.tanuweb.cloud/uploads/${list}`}
                  className="h-full object-cover w-full rounded-md"
                  alt=""
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default GallerySlider;
