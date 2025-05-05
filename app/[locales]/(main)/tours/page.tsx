"use client";
import React, { useEffect, useState } from "react";
import { Travel } from "@/types/travel";
import Sort from "@/components/travel/TravelSort";
import CustomContainer from "@/components/Layout/CustomContainer";
import TravelHeading from "@/components/travel/TravelHeading";
import TravelList from "@/components/travel/TravelList";
import TravelFilter from "@/components/travel/TravelFilter";
import useTravelStore from "@/store/travel";
import { useLocale } from "next-intl";
  
const AllTravelScreen = () => {
  const locale = useLocale();
  const [single, setSingle] = useState<Travel | null>();
  const { fetchTravel, travels } = useTravelStore();
   
  useEffect(() => {
    fetchTravel();
  }, []); // Add dependency array 
  const filteredTravels = travels.filter((travel) => travel.language === locale);

  return (
    <CustomContainer>
      <TravelHeading name={"All travels"} />
      
      {/* Main container for filter and list */}
      <div className="flex flex-col lg:flex-row justify-between w-full lg:w-[1200px] gap-2 lg:gap-10">
        
        {/* Filter section */}
        <div className="w-full lg:w-[20%]">
          <TravelFilter />
        </div>
        
        {/* Travel list and sort section */}
        <div className="w-full lg:w-[80%]">
          <Sort />
          <TravelList travels={filteredTravels} />
        </div>
      </div>
    </CustomContainer>
  );
};

export default AllTravelScreen;
