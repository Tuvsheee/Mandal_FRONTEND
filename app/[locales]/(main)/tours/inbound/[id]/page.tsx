"use client";
import React, { useEffect } from "react";
import CustomContainer from "@/components/Layout/CustomContainer";
import { useLocale, useTranslations } from "next-intl";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import SimpleTravel from "@/components/home/SimpleTravel";
import useTravelStore from "@/store/travel";

const AllTravelScreen = () => {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const { fetchTravel, travels } = useTravelStore();

  useEffect(() => {
    fetchTravel();
  }, [fetchTravel]);

  const filteredTravels = travels.filter(
    (travel) => travel.language === locale
  );

  return (
    <DefaultContainer>
      <CustomContainer>
        <SimpleTravel travels={filteredTravels} />
      </CustomContainer>
    </DefaultContainer>
  );
};

export default AllTravelScreen;
