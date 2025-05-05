"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Banner } from "@/types/banner";

interface Props {
  banner: Banner[];
  showArrow: boolean;
}
 
const CarouselSlider = ({ banner }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container w-full flex flex-col">
      <Slider {...settings}>
        {banner?.map((list, index) => (
          <div
            key={list._id}
            className="w-full cursor-pointer flex flex-row items-center  relative overflow-hidden"
          >
            <div className="absolute bottom-0 w-full flex flex-col mx-auto"></div>
            {list.fileType === "image" ? (
              <img
                src={`https://shinely.tanuweb.cloud/uploads/${list.file}`}
                className="md:h-[100vh] h-[30vh] md:w-full w-full object-cover  bg-cover  mx-auto"
                alt=""
              />
            ) : (
              <video
                src={`https://shinely.tanuweb.cloud/uploads/${list.file}`}
                className="md:h-[100vh] h-[30vh] md:w-full w-full object-cover  bg-cover mx-auto"
                autoPlay
                loop
                muted // Optional: mute video for smoother autoplay
              ></video>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlider;
