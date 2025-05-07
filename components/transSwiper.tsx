"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { Trans } from "@/types/trans";

interface Props {
  trans: Trans[];
  showArrow: boolean;
}

const TransSwiper = ({ trans, showArrow }: Props) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleSlideClick = (id: string) => {
    router.push(`/transport/${id}`);
  };

  return (
    <div className="w-full my-8 lg:my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap mb-4">
        <span className="text-4xl font-bold">{t("travel1")}</span>
        <span className="text-4xl font-bold text-[#5C98F2]">{t("transport")}</span>
      </div>


      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={showArrow}
        pagination={{ clickable: true }}
        loop={true}
        className="travel-swiper"
      >
        {trans.map((item) => (
          <SwiperSlide key={item._id} className="swiper-slide">
            <div
              onClick={() => handleSlideClick(item._id)}
              className="relative h-[350px] sm:h-[50vh] lg:h-[50vh] w-full overflow-hidden shadow-lg bg-cover bg-center cursor-pointer transform transition duration-500 hover:scale-105 rounded-lg group"
              style={{ backgroundImage: `url(https://shinely.tanuweb.cloud/uploads/${item.photo})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-500 group-hover:bg-opacity-80"></div>

              {/* Title (Hidden on Hover) */}
              <div className="absolute bottom-4 left-4 text-white transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="text-xl sm:text-2xl font-bold">{item.name}</h3>
              </div>

              {/* Description (Visible on Hover) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-6 text-center">
                <p className="text-sm sm:text-base">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TransSwiper;
