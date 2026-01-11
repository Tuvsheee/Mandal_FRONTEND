"use client";

import { Link } from "@/navigation";
import { Additional } from "@/types/additional";
import { Banner } from "@/types/banner";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  banner: Banner[];
  showArrow?: boolean;
  variant?: "home" | "tours";
}

const CarouselSlider = ({
  banner,
  showArrow = false,
  variant = "home",
}: Props) => {
  const [additional, setAdditional] = useState<Additional | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditional(res.data.data))
      .catch(console.error);
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: showArrow,
    fade: true,
    beforeChange: (_, next) => setActiveIndex(next),
    appendDots: (dots) => (
      <div className="absolute top-1/2 right-6 -translate-y-1/2 z-50">
        <ul className="flex flex-col gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
    ),
  };

  /* TYPEWRITER TITLE */
  const TypewriterTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      setDisplay("");
      let i = 0;
      const chars = Array.from(text);

      const timer = setInterval(() => {
        i++;
        setDisplay(chars.slice(0, i).join(""));
        if (i >= chars.length) clearInterval(timer);
      }, 40);

      return () => clearInterval(timer);
    }, [text, activeIndex]);

    return (
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={
          variant === "home"
            ? "text-4xl md:text-7xl font-bold drop-shadow-md"
            : "text-lg md:text-2xl font-bold"
        }
      >
        {display}
      </motion.h1>
    );
  };

  return (
    <div className="relative w-full h-screen">
      <Slider {...settings} className="h-full">
        {banner.map((slide) => (
          <div key={slide._id} className="relative w-full h-screen">
            {slide.fileType === "image" ? (
              <img
                src={`${IMGURL}/${slide.file}`}
                alt=""
                className="w-full h-screen object-cover"
              />
            ) : (
              <video
                src={`${IMGURL}/${slide.file}`}
                autoPlay
                loop
                muted
                className="w-full h-screen object-cover"
              />
            )}

            {/* OVERLAY TEXT */}
            <div
              className={`absolute inset-0 z-10 flex flex-col items-start px-32 text-white ${
                variant === "home"
                  ? "justify-center max-w-[900px]"
                  : "justify-end py-24 max-w-[700px]"
              }`}
            >
              <TypewriterTitle text={slide.title1} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlider;
