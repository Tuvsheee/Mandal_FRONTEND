"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GallerySlider from "@/components/home/GallerySlider";
import MainInformation from "@/views/hotel/MainInformation";
import Loader from "@/components/common/Loader";
import useHotelStore from "@/store/hotel";
import HotelHeading from "@/views/hotel/heading";
import { Hotel } from "@/types/hotel";
  
const HotelDetailPage = () => { 
  const { id } = useParams();
  const [single, setSingle] = useState<Hotel | null>();
  const { fetchSingleHotel } = useHotelStore();
  useEffect(() => {
    fetchSingleHotel(id as string).then((res) => setSingle(res));
  }, []);
  //   console.log(single);
  if (single == null) { 
    return <Loader />;
  }   
  return (
    <CustomContainer className="md:px-0">
      <HotelHeading hotel={single!} />
      <GallerySlider images={single?.gallery || []} />
      <MainInformation hotel={single!} />
    </CustomContainer>
  );
};

export default HotelDetailPage;
