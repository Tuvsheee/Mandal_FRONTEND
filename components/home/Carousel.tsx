"use client";

import { Link } from "@/navigation";
import { Additional } from "@/types/additional";
import { Banner } from "@/types/banner";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Props {
  banner: Banner[];
  showArrow?: boolean;
}

const CarouselSlider = ({ banner, showArrow = false }: Props) => {
  const [additional, setAdditional] = useState<Additional | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditional(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const slides = banner?.filter((b) => b.type === "home") || [];

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

  /* ---------------- TYPEWRITER COMPONENT ---------------- */
  const TypewriterTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      setDisplay("");
      let i = 0;
      const chars = Array.from(text);

      const interval = setInterval(() => {
        i++;
        setDisplay(chars.slice(0, i).join(""));
        if (i >= chars.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }, [text, activeIndex]);

    return (
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-4xl md:text-7xl font-bold drop-shadow-md"
      >
        {display}
      </motion.h1>
    );
  };
  /* ------------------------------------------------------ */

  return (
    <div className="relative w-full h-screen">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide._id} className="relative w-full h-screen">
            {slide.fileType === "image" ? (
              <img
                src={`${IMGURL}/${slide.file}`}
                className="w-full h-screen object-cover"
                alt=""
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
            <div className="absolute inset-0 flex flex-col justify-center items-start text-white text-left px-32 z-10 max-w-44">
           

                 <TypewriterTitle text={slide.title1} />

      
            </div>
          </div>
        ))}
      </Slider>
      {/* LEFT SOCIAL ICONS */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 text-white">
        <div className="bg-white h-12 w-1" />

        {additional?.facebook && (
          <Link
            href={additional.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
          >
            <img
              src="/icons/facebook.svg"
              alt="Facebook"
              className="w-6 h-6 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
          </Link>
        )}

        {additional?.youtube && (
          <Link
            href={additional.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
          >
            <img
              src="/icons/twitter.svg"
              alt="YouTube"
              className="w-6 h-6 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
          </Link>
        )}

        {additional?.instagram && (
          <Link
            href={additional.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              className="w-6 h-6 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
          </Link>
        )}

        {additional?.kakao && (
          <Link
            href={additional.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
          >
            <img
              src="/icons/kakao.svg"
              alt="Kakao"
              className="w-6 h-6 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
          </Link>
        )}

        <div className="bg-white h-12 w-1" />
      </div>
    </div>
  );
};

export default CarouselSlider;
