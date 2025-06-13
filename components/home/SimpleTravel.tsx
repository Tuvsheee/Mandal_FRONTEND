"use client";
import React, { ReactNode } from "react";
import { Travel } from "@/types/travel";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import IMGURL from "@/utils/constant";
import { useMediaQuery } from "react-responsive";

interface Props {
  travels: Travel[];
  banner?: ReactNode;
}

const SimpleTravelGrid = ({ travels, banner }: Props) => {
  const t = useTranslations("HomePage");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  console.log(travels, "tardf");
  const specialTravels = travels.filter((travel) => travel.isOut === false);

  return (
    <div className="w-full flex flex-col items-center mt-24 px-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          {t("specialPricesTitle")}
        </h2>
        <p className="text-2xl md:text-3xl font-bold">
          {t("specialPricesSubtitle")}
        </p>
      </div>

      {/* Optional banner */}
      {banner && <div className="mb-6 w-full max-w-7xl">{banner}</div>}

      {/* Grid layout */}
      <div className="grid gap-6 w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {specialTravels.map((list) => (
          <Link
            key={list._id}
            href={`/tours/${list._id}`}
            className="group border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white transform hover:scale-105 duration-1000"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <img
                src={`${IMGURL}/${list.cover}`}
                alt={list.title}
                className="w-full h-full object-cover"
              />

              {/* Favorite Icon */}
              <div className="absolute top-2 right-2 z-10">
                <button className="bg-white/80 rounded-full p-1 text-sm hover:bg-white">
                  ❤️
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col gap-1">
              <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
                {list.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {list.description}
              </p>
              <div className="text-base font-semibold text-black">
                {list.price}
              </div>

              <div className="text-sm text-gray-700">{list.duration}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-8">
        <Link
          href="/travel"
          className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          {t("viewAllTravels")}
        </Link>
      </div>
    </div>
  );
};

export default SimpleTravelGrid;
