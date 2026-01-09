"use client";
import { Additional } from "@/types/additional";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import DefaultContainer from "../Layout/DefaultContainer";

const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [additionalData, setAdditionalData] = useState<Additional | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  /* ---------------- TYPEWRITER COMPONENT ---------------- */
  const TypewriterTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      setDisplay("");
      let i = 0;
      const chars = Array.from(text);

      const interval = setInterval(() => {
        i++;
        setDisplay(chars.slice(0, i).join(""));
        if (i >= chars.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }, [text, activeIndex]);

    return (
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-xl md:text-2xl font-bold drop-shadow-md"
      >
        {display}
      </motion.h1>
    );
  };
  // asdsad
  return (
    <DefaultContainer>
      <div className="relative w-full h-screen">
        {/* Background Image */}
        {additionalData?.aboutCover1 && (
          <img
            src={`${IMGURL}/${additionalData.aboutCover1}`}
            alt="Cover"
            className="w-full h-[100vh] object-cover"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
          <div className="absolute inset-0 flex flex-col justify-end items-start text-white text-left px-32 py-24 z-10 max-w-[800px]">
            <TypewriterTitle text={additionalData?.description1 || ""} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex my-12 mx-12">
        <span className="text-2xl ">{additionalData?.description2}</span>
      </div>
    </DefaultContainer>
  );
};

export default About;
