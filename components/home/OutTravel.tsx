"use client";
import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Travel } from "@/types/travel";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import IMGURL from "@/utils/constant";

interface Props {
  travels: Travel[];
  showArrow: boolean;
  banner?: ReactNode;
}

const OutTravel = ({ travels, showArrow, banner }: Props) => {
  const t = useTranslations("HomePage");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  const specialTravels = travels.filter((travel) => travel.isOut === true);

  
  return (
    <div className="slider-container w-full flex flex-col items-center mt-12 px-4">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{t("specialPricesTitle")}</h2>
        <p className="text-2xl md:text-3xl font-bold">{t("specialPricesSubtitle")}</p>
      </div>

      {/* Optional banner */}
      {banner && banner}

      {/* Slider */}
      <div className="w-full max-w-7xl">
        <Slider {...settings}>
          {specialTravels.map((list) => (
            <Link
              key={list._id}
              href={`/tours/${list._id}`}
              className="px-2 group"
            >
              <div className="relative w-full h-[220px] overflow-hidden">
                <img
                  src={`${IMGURL}/${list.cover}`}
                  alt={list.title}
                  className="w-full h-full object-cover "
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 left-0 right-0 p-4 text-white">
                  <h3 className="text-sm font-bold line-clamp-2">{list.title}</h3>
                  <p className="text-xs mt-1 line-clamp-3">{list.description}</p>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 bg-white text-black text-sm font-semibold px-3 py-1 rounded shadow">
                  {list.duration}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>

      {/* More Button */}
      <div className="mt-8">
        <Link
          href="/travel"
          className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          {t("viewAllTravels")}
        </Link>
      </div>
    </div>
  );
};

export default OutTravel;
