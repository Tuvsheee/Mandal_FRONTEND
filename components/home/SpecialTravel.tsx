"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Travel } from "@/types/travel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/navigation";
import { useMediaQuery } from "react-responsive";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";


interface Props {
  dangerouslySetInnerHTML?: { __html: string };
  travels: Travel[];
  showArrow: boolean;
}

const SpecialTravel = ({ travels, showArrow }: Props) => {
  const t = useTranslations("HomePage");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const locale = useLocale();

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: !isMobile && showArrow ? <SampleNextArrow /> : <div></div>,
    prevArrow: !isMobile && showArrow ? <SamplePrevArrow /> : <div></div>,
  };

  // Filter travels to include only those marked as special
  const specialTravels = travels.filter((travel) => travel.isSpecial);

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
    <div className="slider-container w-full flex flex-col mt-24">
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap">
          <span className="text-4xl font-bold">{t("special")}</span>
          <span className="text-4xl font-bold text-[#5C98F2]">{t("travel")}</span>
        </div>
      </div>

      <Slider {...settings}>
        {specialTravels.map((list) => {
        const price = parseFloat(String(list.price ?? "0").replace(/[^\d.-]/g, "")); // Extract numeric part
        const sale = Number(list.sale ?? 0);
        const discountedPrice = price - price * (sale / 100);  

          return (
            <Link
              href={`/travel/${list._id}`}
              key={list._id}
              className="w-full flex flex-row items-center p-2 border rounded-lg relative overflow-hidden flex-nowrap mt-8"
            >
              <div className="absolute top-0 right-0 bg-[#FEC72D] md:px-12 px-4 py-1 md:py-4 rounded-l-full hidden md:block">
                <span className="text-white font-bold">{t("special")}</span>
              </div>
              <div className="w-full h-full flex md:flex-row flex-col">
                <div className="md:w-[50%] w-full md:p-10 px-2 h-full">
                  <div className="relative w-full rounded-lg overflow-hidden group transition-all duration-300">
                    <div className="w-full h-full absolute bg-black bg-opacity-40 top-0 group-hover:bg-opacity-0 transition-all duration-300 z-100 "></div>
                    <img
                      src={`https://shinely.tanuweb.cloud/uploads/${list.cover}`}
                      alt=""
                      className="w-full h-[30vh] object-cover rounded scale-100 group-hover:scale-125 transition-all duration-300"
                    />
                    <div className="absolute top-0 right-0 bg-[#FEC72D] md:px-12 px-4 py-1 md:py-4 rounded-l-full md:hidden">
                      <span className="text-white font-bold">{t("special")}</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-[50%] w-full md:p-10 p-2 px-4 text-sm flex flex-col md:items-start items-center">
                  <span className="w-full">{list.title}</span>
                  <div className="flex items-center gap-4 mt-4 w-full">
                    <span className="text-[#F23F44] bg-[#FDECEB] px-4 text-center py-1 rounded">
                      {t("date")}
                    </span>
                    <span className="text-[#4467AD] font-semibold">{list.date}</span>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <span className="line-clamp-3">{list.description}</span>
                  </div>
                  <div className="flex md:flex-row flex-col items-end justify-between w-full md:mt-4 mt-4">
                    <div className="flex flex-col w-full">
                      <span className="text-[#F23F44] font-semibold">{list.duration}</span>
                      <div className="flex gap-6 mt-4">
                        <span className="text-2xl text-[#737D86] line-through">{list.price}</span>
                        <span className="text-2xl text-black font-bold">
                          {discountedPrice}$
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#202226] self-end mt-4 text-white font-semibold flex items-center justify-center px-6 py-3 rounded hover:bg-opacity-80">
                    {t("placeOrder")}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default SpecialTravel;
