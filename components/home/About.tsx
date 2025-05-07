"use client";
import axios from "axios";
import { Raleway } from "@next/font/google";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import DefaultContainer from "../Layout/DefaultContainer";
import { Additional } from "@/types/additional";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
});


const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [additionalData, setAdditionalData] = useState<Additional | null>(null);
  const t = useTranslations("HomePage");

  useEffect(() => {
    // Fetch additional data from the API
    axiosInstance
      .get("/additional")
      .then((res) => setAdditionalData(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));

    // IntersectionObserver for triggering CountUp when in view
    const section = document.querySelector("#statistics-section");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
// asdsad 
  return (
    <DefaultContainer>
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src={`${IMGURL}/${additionalData?.aboutCover1}`}
          alt="Cover"
          className="w-full h-[100vh] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
          {/* Logo */}
          <div className="mb-4">
            <img
              src={`${IMGURL}/${additionalData?.logo}`}
              alt="Logo"   
              className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto rounded-full bg-white p-2"
            />
          </div>

          {/* Main Titles */}
          <h1 className="text-3xl md:text-5xl font-bold">JINST OD TRAVEL</h1>
          <h2 className="text-xl md:text-3xl text-yellow-400 mt-2">
            DISCOVER MONGOLIA’S <span className="italic">UNTAMED BEAUTY</span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm md:text-lg max-w-2xl text-white drop-shadow">
            Journey through endless steppes, majestic mountains, and timeless nomadic culture.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl flex my-12 mx-12">
        <div className="w-1/3">
          <span className="text-2xl font-bold">{additionalData?.description1}</span>
        </div>
        <div className="w-2/3">
          <span className="text-lg">{additionalData?.description2}</span>
        </div>
      </div>

      <div className="w-full ">
        <img 
            src={`${IMGURL}/${additionalData?.aboutCover2}`}
            alt="Cover"
            className="w-full h-[100vh] object-cover"
          />
      </div>
    </DefaultContainer>
  );
};

export default About;
