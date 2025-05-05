"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import {Link} from "@/navigation"
import { Tips } from "@/types/tips";

 interface Props {
   dangerouslySetInnerHTML?: { __html: string };
   tips: Tips[];
   showArrow: boolean;
 } 

const TipsSwiper = ({ tips, showArrow }: Props) => {
  const t = useTranslations("HomePage");
  const router = useRouter();



  return (
    <div className="w-full my-8 lg:my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap    mb-4">
            <span className="text-4xl font-bold">
             {t("travel1")} 
            </span>
            <span  className="text-4xl font-bold text-[#5C98F2]">
             {t("tips")} 
            </span>
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
            {tips.map((tips) => (
            <SwiperSlide
                key={tips._id}
               
                className="swiper-slide"
            >
                <div
                    className="relative h-[350px] sm:h-[30vh] lg:h-[30vh] w-full overflow-hidden shadow-lg bg-cover bg-center bg-opacity-100 transform transition duration-1000 brightness-100 hover:brightness-100 rounded-lg group"
                    style={{
                        backgroundImage: `url(${
                        "https://shinely.tanuweb.cloud/uploads/" + tips.photo
                        })`,
                    }}
                    >
                    {/* tips Name: Hidden on hover */}
                    <div className="absolute justify-center bottom-4  items-end text-white transition-opacity duration-0 group-hover:opacity-0 text-justify mx-4">
                        <h3 className="text-xl sm:text-2xl  flex items-end font-bold">{tips.title}</h3>
                    </div>

                    {/* Overlay: Hidden by default, shown on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-1000 group-hover:bg-opacity-80"></div>

                    {/* tips Details: Hidden by default, shown on hover */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-1000 group-hover:opacity-100 px-4 text-center">
                            <p className="mt-2 text-sm sm:text-base text-justify">{tips.description}</p>
                        
                        </div>
                    </div>


            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
};

export default TipsSwiper;