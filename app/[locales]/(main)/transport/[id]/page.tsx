"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainInformation from "@/views/transport/MainInformation";
import Loader from "@/components/common/Loader";
import HeadingDetail from "@/views/transport/HeadingDetail";
import useTransStore from "@/store/trans";
import { Trans } from "@/types/trans";
  
const DetailPage = () => { 
  const { id } = useParams();
  const [single, setSingle] = useState<Trans | null>();
  const { fetchSingleTrans} = useTransStore();
  useEffect(() => {
    fetchSingleTrans(id as string).then((res) => setSingle(res));
  }, []);
  //   console.log(single);
  if (single == null) { 
    return <Loader />;
  }   
  return (
    <CustomContainer className="md:px-0">
      <HeadingDetail trans={single!} />
      <MainInformation transport={single!} />
    </CustomContainer>
  );
};

export default DetailPage;
