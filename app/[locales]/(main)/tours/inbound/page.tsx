"use client";

import React from "react";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import CustomContainer from "@/components/Layout/CustomContainer";
import InboundCategoryList from "@/components/InboundCategoryList";
import useBannerStore from "@/store/banner";
import { useEffect } from "react";
import Slider, { Settings } from "react-slick";
import IMGURL from "@/utils/constant";

const Page = () => {
  const { banner, fetchBanner } = useBannerStore();
  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
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

  const InboundIntro = () => (
    <DefaultContainer>
      <Slider {...settings} className="h-full w-screen z-10">
        {banner
          ?.filter((list) => list.type === "in") 
          .map((list) => (
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
      <CustomContainer>
        <div className="text-center mt-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to the world of JINST OD
          </h1>
        </div>
      </CustomContainer>
    </DefaultContainer>
  );

  return (
    <>
      <InboundIntro />
      <InboundCategoryList />
    </>
  );
};

export default Page;
