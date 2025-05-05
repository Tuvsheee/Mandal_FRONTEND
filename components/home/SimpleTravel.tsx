"use client";
import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Travel } from "@/types/travel";
import { ChevronLeft, ChevronRight ,ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

import { useMediaQuery } from "react-responsive";

interface Props {


  travels: Travel[];
  showArrow: boolean;
  banner?: ReactNode;
}

const SimpleTravel = ({ travels, showArrow, banner }: Props) => {
  const t = useTranslations("HomePage");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 2 : 4,
    slidesToScroll: 1,
    nextArrow: !isMobile && showArrow ? <SampleNextArrow /> : <div></div>,
    prevArrow: !isMobile && showArrow ? <SamplePrevArrow /> : <div></div>,
  };

  // Filter travels to include only those not marked as special
  const nonSpecialTravels = travels.filter((travel) => !travel.isSpecial);

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
        className="absolute left-[-50px] top-[50%] transform translate-y-[-50%] w-12 h-12 rounded-full border bg-white hover:bg-black hover:text-white  flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        <ChevronLeft />
      </div>
    );
  }

  return (
    <>
      <div className="slider-container w-full flex flex-col">
        <div className="w-full flex justify-center">
          <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap">
            <span className="text-4xl font-bold">{t("freshly")}</span>
            <span className="text-4xl font-bold text-[#5C98F2]">{t("added")}</span>
          </div>
        </div>
        {banner && banner}
        <Slider {...settings}>
          {nonSpecialTravels.map((list) => {
            return (
              <Link
                href={`/travel/${list._id}`}
                key={list._id}
                className="w-full aspect-[3/2] flex flex-col px-2 mt-8"
              >
                <div className="w-full aspect-[3/2] relative">
                  <img
                    src={`https://shinely.tanuweb.cloud/uploads/${list.cover}`}
                    className="w-full h-[30vh] rounded-md object-cover"
                    alt=""
                  />
                  <span className="w-full absolute top-0 right-4 text-orange-400 text-end text-lg font-bold flex items-center justify-end mt-2">
                    {list.price}
                  </span>
                </div>
                
                <div className="flex flex-col w-full">
                  <span className="w-full line-clamp-2 mt-1 text-sm font-semibold text-[#5778BB]">
                    {list.title}
                  </span>
                  <span className="w-full line-clamp-2 mt-2 text-sm text-[#555555] flex items-center justify-between font-medium">
                    <p>{list.duration}</p>
                    <p>{list.category.name}</p>
                  </span>
                </div>
              </Link>
            );
          })}
        </Slider>
        <div className="w-full flex justify-center items-center mt-8">
          <Link
            href="/travel"
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-all group max-w-[160px] w-full"
          >
            <div className="flex space-x-2  border-b-2 border-black">
              <span>  {t("viewAllTravels")}</span>
              <span className="group-hover:translate-x-3 transition-transform">
                <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SimpleTravel;

