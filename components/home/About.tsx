"use client";
import axios from "axios";
import { Raleway } from "@next/font/google";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
});

interface AdditionalData {
  travels: number;
  success: number;
  experience: number;
  description1: string;
  description2: string;
  cover: string;
  company: string;
}

const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(null);
  const t = useTranslations("HomePage");

  useEffect(() => {
    // Fetch additional data from the API
    axios
      .get("https://shinely.tanuweb.cloud/api/v1/additional/")
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
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row mx-auto w-full justify-between items-center py-0">
          <div className="lg:w-2/3 space-y-4 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              {additionalData?.company || "Company Name"}
            </h2>
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0 text-center lg:text-left">
            <p className="text-lg text-gray-600 text-justify">
              {additionalData?.description1 || "Description 1"}
            </p>
          </div>
        </div>
        <div className="my-8">
          <img
           src={`https://shinely.tanuweb.cloud/uploads/${additionalData?.cover}`}
            className="w-full h-[50vh] lg:h-[70vh] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
