"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GallerySlider from "@/components/home/GallerySlider";
import MainInformation from "@/views/hostel/MainInformation";
import Loader from "@/components/common/Loader";
import useHostelStore from "@/store/hostel";
import HostelHeading from "@/views/hostel/HostelHeading";
import { Hostel } from "@/types/hostel";
  
const HostelPage = () => { 
  const { id } = useParams();
  const [single, setSingle] = useState<Hostel | null>();
  const { fetchSingleData } = useHostelStore();
  useEffect(() => {
    fetchSingleData(id as string).then((res) => setSingle(res));
  }, []);
  //   console.log(single);
  if (single == null) { 
    return <Loader />;
  }   
  return (
    <CustomContainer className="md:px-0">
      <HostelHeading hostel={single!} />
      <GallerySlider images={single?.gallery || []} />
      <MainInformation hostel={single!} />
    </CustomContainer>
  );
};

export default HostelPage;
