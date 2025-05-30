"use client";
import React from "react";
import { Travel } from "@/types/travel";
import { useTranslations } from "next-intl";
import IMGURL from "@/utils/constant";
import { useLocale } from "next-intl";

interface Props {
  travel: Travel;
}

// Define the structure of a single day item
interface TravelDay {
  direction: string;
  program: string;
  photos: string;
}

const MainInformation = ({ travel }: Props) => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      {travel.days.map((day: TravelDay, index: number) => {
        const isEven = index % 2 === 0;
        const dayText =
          locale === "kr"
            ? `${index + 1} ${t("day")}` // Day after number in Korean
            : `${t("day")} ${index + 1}`; // Day before number in other locales

        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            } items-start md:gap-16`}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full mt-2">
              <img
                src={`${IMGURL}/${day.photos}`}
                alt={day.direction}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Text */}
            <div className="md:w-1/2 w-full">
              <h2 className="text-xl font-bold my-2">
                {dayText} - {day.direction}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{day.program}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainInformation;
