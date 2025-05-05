"use client";
import React, { useEffect, useState } from "react";
import CustomContainer from "@/components/Layout/CustomContainer";
import { useLocale } from "next-intl";
import Heading from "@/views/apartment/Heading";
import useApartmentStore from "@/store/apartment";
import { Apartment } from "@/types/apartment";
import ApartmentSwiper from "@/views/apartment/swiper";

const AllApartment = () => {
  const locale = useLocale();
  const [single, setSingle] = useState<Apartment | null>();
  const { fetchData, apartment } = useApartmentStore();
   
  useEffect(() => {
    fetchData();
  }, []); 
  const filteredData = apartment.filter((apartment) => apartment.language === locale);

  return (
    <CustomContainer>
      <Heading apartment={single!} />
      <div className="flex flex-col lg:flex-row justify-between w-full lg:w-[1200px] gap-2 lg:gap-10">
        <div className="w-full lg:w-[100%]">
          <ApartmentSwiper showArrow apartment={filteredData} />
        </div>
      </div>
    </CustomContainer>
  );
};

export default AllApartment;
