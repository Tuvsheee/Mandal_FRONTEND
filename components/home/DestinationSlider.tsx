"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // import autoplay styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { Category } from "@/types/category";
import { Link } from "@/navigation";

interface Props {
  dangerouslySetInnerHTML?: { __html: string };
  category: Category[];
  showArrow: boolean;
}

const DestinationSwiper = ({ category, showArrow }: Props) => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  
  // Create a ref to store the Swiper instance
  const swiperRef = useRef<any>(null);


  return (
    <div className="w-full my-8 lg:my-4 max-w-7xl mx-auto ">
      <div className="flex items-center justify-center space-x-2 max-w-[1200px] w-full py-0 md:px-0 flex-wrap mb-4">
        <span className="text-4xl font-bold">{t("top")}</span>
        <span className="text-4xl font-bold text-[#5C98F2]">{t("destinations")}</span>
      </div>

      {/* Swiper Section */}
      <div
        onMouseEnter={() => {
          // Stop autoplay on hover if swiperRef is defined
          swiperRef.current?.autoplay.stop();
        }}
        onMouseLeave={() => {
          // Restart autoplay after hover if swiperRef is defined
          swiperRef.current?.autoplay.start();
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // include Autoplay module
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true} // Enable infinite loop
          autoplay={{
            delay: 2000, // Auto-move every 2 seconds
            disableOnInteraction: false, // Prevent user interactions from stopping autoplay
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper; // Store the Swiper instance in the ref
          }}
          className="travel-swiper"
        >
          {category.map((category) => (
            <SwiperSlide
              key={category._id}
              className="swiper-slide"
            >
              <div
                className="relative h-[350px] sm:h-[40vh] lg:h-[40vh] w-full overflow-hidden shadow-lg bg-cover bg-center bg-opacity-100 transform transition duration-1000 brightness-100 hover:brightness-100 rounded-lg group"
                style={{
                  backgroundImage: `url(${"https://shinely.tanuweb.cloud/uploads/" + category.photo})`,
                }}
              > 
                {/* Category Name: Hidden on hover */}
                <div className="flex justify-center mt-56 text-white transition-opacity duration-0 group-hover:opacity-0">
                  <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                </div>

                {/* Overlay: Hidden by default, shown on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-1000 group-hover:bg-opacity-80 py-4"></div>

                {/* Category Details: Hidden by default, shown on hover */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-1000 group-hover:opacity-100 px-4 text-center">
                  <p className="mt-2 text-sm sm:text-base text-justify">{category.description}</p>
                  <Link
                    href={`/travel/`}
                    className="mt-4 text-blue-500 hover:underline"
                  >
                    View all travels
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DestinationSwiper;
