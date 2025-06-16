"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import CustomContainer from "@/components/Layout/CustomContainer";
import { useLocale, useTranslations } from "next-intl";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import useTravelStore from "@/store/travel";
import OutTravel from "@/components/home/OutTravel";

const OutTravelScreen = () => {
  const { id } = useParams();
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const { fetchTravel, travels } = useTravelStore();

  useEffect(() => {
    fetchTravel();
  }, [fetchTravel]);

  const filteredTravels = travels.filter(
    (travel) => travel.language === locale && travel.category._id === id
  );

  return (
    <DefaultContainer>
      <div className="w-full ">
        <video
          src="/vedio/bg-vedio.mp4"
          autoPlay
          muted
          loop
          className="w-full h-[100vh] object-cover bg-cover rounded-lg"
        />
      </div>
      <CustomContainer>
        <OutTravel showArrow travels={filteredTravels} />
      </CustomContainer>
    </DefaultContainer>
  );
};

export default OutTravelScreen;
