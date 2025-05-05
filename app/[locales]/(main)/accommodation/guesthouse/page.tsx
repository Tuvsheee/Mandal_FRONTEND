"use client";
import React, { useEffect, useState } from "react";
import CustomContainer from "@/components/Layout/CustomContainer";
import { useLocale } from "next-intl";
import { Hostel } from "@/types/hostel";
import useHostelStore from "@/store/hostel";
import HostelList from "@/views/hostel/HostelList";
import HostelHeading from "@/views/hostel/HostelHeading";

const AllHostelScreen = () => {
  const locale = useLocale();
  const [single, setSingle] = useState<Hostel | null>();
  const { fetchData, hostel } = useHostelStore();
   
  useEffect(() => {
    fetchData();
  }, []); 
  const filteredHostel = hostel.filter((hostel) => hostel.language === locale);

  return (
    <CustomContainer>
      <HostelHeading hostel={single!}/>
      <div className="flex flex-col lg:flex-row justify-between w-full lg:w-[1200px] gap-2 lg:gap-10">
        {/* Travel list and sort section */}
        <div className="w-full lg:w-[100%]">
      
          <HostelList hostel={filteredHostel} />
        </div>
      </div>
    </CustomContainer>
  );
};

export default AllHostelScreen;
