"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GallerySlider from "@/components/home/GallerySlider";
import MainInformation from "@/views/apartment/MainInformation";
import Loader from "@/components/common/Loader";
import { Apartment } from "@/types/apartment";
import useApartmentStore from "@/store/apartment";
import HeadingDetail from "@/views/apartment/HeadingDetail";
  
const DetailPage = () => { 
  const { id } = useParams();
  const [single, setSingle] = useState<Apartment | null>();
  const { fetchSingleData} = useApartmentStore();
  useEffect(() => {
    fetchSingleData(id as string).then((res) => setSingle(res));
  }, []);
  //   console.log(single);
  if (single == null) { 
    return <Loader />;
  }   
  return (
    <CustomContainer className="md:px-0">
      <HeadingDetail apartment={single!} />
      <GallerySlider images={single?.gallery || []} />
      <MainInformation apartment={single!} />
    </CustomContainer>
  );
};

export default DetailPage;
