"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import React, { useEffect, useState } from "react";
import useTravelStore from "@/store/travel";
import { Travel } from "@/types/travel";
import { useParams } from "next/navigation";
import Heading from "@/views/travel-detail/Heading";
import GallerySlider from "@/components/home/GallerySlider";
import MainInformation from "@/views/travel-detail/MainInformation";
import Loader from "@/components/common/Loader";

const TravelDetailScreen = () => {
  const { id } = useParams();
  const [single, setSingle] = useState<Travel | null>();
  const { fetchSingleTravel } = useTravelStore();
  useEffect(() => {
    fetchSingleTravel(id as string).then((res) => setSingle(res));
  }, []);
  //   console.log(single);
  if (single == null) {
    return <Loader />;
  }   
  return (
    <CustomContainer className="px-4 md:px-0">
      <Heading travel={single!} />
      <GallerySlider images={single?.gallery || []} />
      <MainInformation travel={single!} />
    </CustomContainer>
  );
};

export default TravelDetailScreen;
