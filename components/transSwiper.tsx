"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { Trans } from "@/types/trans";
import IMGURL from "@/utils/constant";

interface Props {
  trans: Trans[];
  showArrow: boolean;
}

const TransSwiper = ({ trans }: Props) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  // const handleSlideClick = (id: string) => {
  //   router.push(`/transport/${id}`);
  // };

  return (
    <div className="w-full my-8 lg:my-12  px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4  w-full flex-wrap my-8">
        <span className="text-4xl font-semibold ">{t("transport_services")}</span>
      </div>
      {trans.map((item) => (
        <div
          // onClick={() => handleSlideClick(item._id)}
          className="cursor-pointer overflow-hidden flex  bg-white hover:shadow-xl transition duration-300 w-full gap-12"
        > 
          <div className="w-1/3">
            <img
              src={`${IMGURL}/${item.photo}`}
              alt={item.name}
              className="w-full h-[200px] object-cover"
            />
          </div>
      

          <div className="w-2/3">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {item.name}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-4 mb-3">
              {item.description}
            </p>
            {item.price && (
              <p className="text-lg text-[#d1973e] font-semibold">
                {item.price} 
              </p>
            )}
          </div>
        </div>
        ))}
    </div>
  );
};

export default TransSwiper;
