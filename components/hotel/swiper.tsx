"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

import { Hotel } from "@/types/hotel";

interface Props {
  hotel: Hotel[];
  showArrow: boolean;
}

const HotelSwiper = ({ hotel, showArrow }: Props) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleSlideClick = (id: string) => {
    router.push(`/accommodation/hotels/${id}`);
  };

  return (
    <div className="w-full my-8 lg:my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap mb-4">
        <span className="text-4xl font-bold text-[#5C98F2]">{t("hotel")}</span>
      </div>

      {/* Swiper Section */}
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
        {hotel.map((hotelItem) => (
          <SwiperSlide key={hotelItem._id} className="swiper-slide">
            <div
              onClick={() => handleSlideClick(hotelItem._id)}
              className="relative h-[350px] sm:h-[30vh] lg:h-[50vh] w-full overflow-hidden shadow-lg bg-cover bg-center bg-opacity-100 transform transition duration-1000 brightness-100 hover:brightness-100 rounded-lg group"
              style={{
                backgroundImage: `url(https://shinely.tanuweb.cloud/uploads/${hotelItem.photo})`,
              }}
            >
              {/* Hotel Name */}
              <div className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-500">
                <h3 className="text-2xl sm:text-3xl font-bold text-center px-4 group-hover:opacity-0">
                  {hotelItem.name}
                </h3>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-1000 group-hover:bg-opacity-80"></div>

              {/* Hotel Details */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-1000 group-hover:opacity-100 px-4 text-center">
                <p className="mt-2 text-sm sm:text-base text-justify">{hotelItem.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotelSwiper;
