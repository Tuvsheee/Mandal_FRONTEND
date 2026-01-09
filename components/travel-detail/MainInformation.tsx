"use client";
import React, { useState } from "react";
import { Travel } from "@/types/travel";
import { useTranslations } from "next-intl";

interface Props {
  travel: Travel;
}
const MainInformation = ({ travel }: Props) => {
  const t = useTranslations("HomePage");

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex md:flex-row flex-col  md:mt-[10vh] relative gap-8 ">
        <div className="md:max-w-[70%] w-full flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">{travel.title}</span>
          </div>
          <div className="w-full  mt-4">
            <div
              className="text-sm text-[#555555] text-justify w-full"
              dangerouslySetInnerHTML={{ __html: travel?.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInformation;
