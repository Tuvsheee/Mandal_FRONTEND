"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import CustomContainer from "@/components/Layout/CustomContainer";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import SimpleTravel from "@/components/home/SimpleTravel";
import useTravelStore from "@/store/travel";

const TravelByCategoryPage = () => {
  const { id } = useParams(); // Get the dynamic category ID from the URL
  const locale = useLocale();
  const { fetchTravel, travels } = useTravelStore();

  useEffect(() => {
    fetchTravel();
  }, [fetchTravel]);

  const filteredTravels = travels.filter(
    (travel) => travel.language === locale && travel.category?.["_id"] === id
  );

  return (
    <DefaultContainer>
      <CustomContainer>
        <SimpleTravel travels={filteredTravels} />
      </CustomContainer>
    </DefaultContainer>
  );
};

export default TravelByCategoryPage;
