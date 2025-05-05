"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import axios from "axios"; 

const BASE_URL = "https://shinely.tanuweb.cloud";

interface Accommodation {
  _id: string;
  title: string;
  description: string;
  photo: string;
  link: string;
}

const AccSwiper = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const [acc, setAcc] = useState<Accommodation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/settings/`);
        const data = response.data?.data;
  
        if (data) {
          setAcc([
            {
              _id: "1",
              title: data.hostelTitle,
              description: data.hostelDescription,
              photo: `${BASE_URL}/uploads/${data.hostelCover}`, 
              link: "/accommodation/guesthouse",
            },
            {
              _id: "2",
              title: data.hotelTitle,
              description: data.hotelDescription,
              photo: `${BASE_URL}/uploads/${data.hotelCover}`, 
              link: "/accommodation/hotels",
            },
            {
              _id: "3",
              title: data.apartTitle,
              description: data.apartDescription,
              photo: `${BASE_URL}/uploads/${data.apartCover}`, 
              link: "/accommodation/apartments",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching accommodation data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleSlideClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="w-full my-8 lg:my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap mb-4">
        <span className="text-4xl font-bold text-[#5C98F2]">{t("accommodation")}</span>
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
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="travel-swiper"
      >
        {acc.map((acc) => (
          <SwiperSlide key={acc._id} className="swiper-slide">
            <div
              onClick={() => handleSlideClick(acc.link)}
              className="relative h-[350px] sm:h-[30vh] lg:h-[50vh] w-full overflow-hidden shadow-lg bg-cover bg-center transform transition duration-500 hover:scale-105 cursor-pointer rounded-lg group"
              style={{ backgroundImage: `url(${acc.photo})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 group-hover:bg-opacity-70"></div>

              {/* Title (Always Visible) */}
              <div className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-500">
                <h3 className="text-2xl sm:text-3xl font-bold text-center px-4 group-hover:opacity-0">
                  {acc.title}
                </h3>
              </div>

              {/* Description (Only Visible on Hover) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-6 text-center">
                <p className="text-sm sm:text-base">{acc.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AccSwiper;
