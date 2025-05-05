"use client";
import RightSideInformation from "./RightSideInformation";
import React, { useEffect, useState } from "react";
import { Travel } from "@/types/travel";
import { Chrono } from "react-chrono";
import { useTranslations } from "next-intl";

interface Props {
  travel: Travel;
}
const MainInformation = ({ travel }: Props) => {

  const t = useTranslations("HomePage");

  const chronoData = travel.days.map((list: any, index: number) => {
    return {
      title: `${t("day")} ${index + 1}`,
      cardTitle: list.direction,
      url: "http://www.history.com",
      cardDetailedText: list.program,
      media: {
        name : "Direction",
        type: "IMAGE",
        source: {
          url: `https://shinely.tanuweb.cloud/uploads/${list.photos}`, 
        },
      }
    };
  });
  return (
    <div className="w-full flex md:flex-row flex-col-reverse  md:mt-[5vh] gap-4 relative">
      <div className="md:max-w-[75%] w-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{t("travel_Information")}</span>
        </div>
        <div className="w-full border border-t-black p-6 mt-2">
          <div className="flex flex-col w-full">
            <span className="text-sm text-[#555555]">{travel?.duration}</span>
          </div>
          <hr className="mt-4" />
          <div className="flex flex-col w-full">
            <div className="font-semibold w-full py-4">
              {t("information")}:
            </div>
            <div
              className="text-sm text-[#555555] text-justify w-full pr-8"
              dangerouslySetInnerHTML={{ __html: travel?.description }}
            />
          </div>
        </div>
        <div className="w-full border border-t-black p-6 mt-4 flex flex-col ">
          <div className="w-full"></div>
          <Chrono mode="VERTICAL" items={chronoData} disableToolbar />
        </div>{" "}

      </div>
      <div className="md:w-[25%] w-full ">
        <RightSideInformation travel={travel} />
        {/* <WeatherInformation /> */}
      </div>
    </div>
  );
};

export default MainInformation;
