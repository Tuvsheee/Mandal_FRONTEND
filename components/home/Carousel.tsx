"use client";
import React ,{useState , useEffect} from "react";
import { useTranslations } from "next-intl";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Banner } from "@/types/banner"; 
import {FaRegCalendarAlt ,FaSearch} from "react-icons/fa"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "@/navigation";
import axiosInstance from "@/utils/axios";
import { Additional } from "@/types/additional";
import IMGURL from "@/utils/constant";

interface Props {
  banner: Banner[];
  showArrow?: boolean;
}

const CarouselSlider = ({ banner, showArrow = false }: Props) => {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [additional, setAdditional] = useState<Additional | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditional(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);

  const t = useTranslations("HomePage");
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, 
    arrows: showArrow,
    fade: true,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "1.5rem",
          transform: "translateY(-50%)",
          zIndex: 50,
        }}
      >
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    
    customPaging: () => (
      <div
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "#C59A3B",
          borderRadius: "50%",
          opacity: 0.6,
        }}
      />
    ),
    
  };

  return (
    <div className="relative w-full h-screen">
      <Slider {...settings} className="h-full">
        {banner?.map((list) => (
          <div key={list._id} className="relative w-full h-screen">
            {list.fileType === "image" ? (
              <img
                src={`${IMGURL}/${list.file}`}
                alt=""
                className="w-full h-screen object-cover"
              />
            ) : (
              <video
                src={`${IMGURL}/${list.file}`}
                className="w-full h-screen object-cover"
                autoPlay
                loop
                muted
              />
            )}
       
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center z-10 ">
              <h1 className="text-4xl md:text-6xl  drop-shadow-md">
                {list.title1}
              </h1>
              <h2 className="text-3xl md:text-5xl  text-yellow-400 drop-shadow-md mt-2">
              {list.title2}
              </h2>
              <p className="mt-4 text-md md:text-lg max-w-2xl text-white drop-shadow poppins font-p">
              {list.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Left Social Icons */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4 text-white">
        <div className="bg-white h-12 w-1"></div>
        {additional?.facebook && (
          <Link href={additional.facebook} target="_blank" className="hover:text-yellow-400">
            <img src="/icons/facebook.svg" alt="Facebook" className="w-[24px] h-[24px] rounded-sm" />
          </Link>
        )}

        {additional?.youtube && (
          <Link href={additional.youtube} target="_blank" className="hover:text-yellow-400">
            <img src="/icons/twitter.svg" alt="Twitter" className="w-[24px] h-[24px] rounded-sm" />
          </Link>
        )}

        {additional?.instagram && (
          <Link href={additional.instagram} target="_blank" className="hover:text-yellow-400">
            <img src="/icons/instagram.svg" alt="Instagram" className="w-[24px] h-[24px] rounded-sm" />
          </Link>
        )}

        <div className="bg-white h-12 w-1"></div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 z-20">
      <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm md:text-base font-medium">{t("destinations")}</label>
            <select className="py-2 px-4 rounded-full bg-white text-sm focus:outline-none">
              <option className="normal-case">Ulaanbaatar</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white text-sm md:text-base font-medium">{t("chooseTour")}</label>
            <select className="py-2 px-4 rounded-full bg-white text-sm focus:outline-none">
              <option className="normal-case">Ulaanbaatar</option>
            </select>
          </div>


          <div className="flex flex-col gap-1 col-span-2 md:col-span-2">
            <label className="text-white text-sm md:text-base font-medium">{t("date")}</label>

            <div className="flex items-center bg-white rounded-full px-4 py-2 gap-6">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-gray-500" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText={t("from")}
                className="text-sm bg-transparent focus:outline-none"
              />
            </div>

            {/* Divider */}
            <div className="self-stretch w-px bg-gray-300" />

            {/* To Date */}
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-gray-500" />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText={t("to")}
                className="text-sm bg-transparent focus:outline-none"
              />
            </div>
          </div>
          </div>
        

          <div className="flex items-end mt-6">
            <button className="bg-yellow-600 flex items-center justify-between hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-full w-full transition">
              {t("search")}
              <span className="ml-2"><FaSearch/></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default CarouselSlider;
