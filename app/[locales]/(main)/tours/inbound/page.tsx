"use client";

import React from "react";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import CustomContainer from "@/components/Layout/CustomContainer";
import InboundCategoryList from "@/components/InboundCategoryList";

const Page = () => {
  const InboundIntro = () => (
    <DefaultContainer>
      <div className="w-full">
        <video
          src="/vedio/bg-vedio.mp4"
          autoPlay
          muted
          loop
          className="w-full h-[100vh] object-cover bg-cover rounded-lg"
        />
      </div>
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
