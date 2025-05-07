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
import BookingCard from "@/views/travel-detail/BookingCard";
import SimpleTravel from "@/components/home/SimpleTravel";
import { useLocale } from "next-intl";
import Page  from "@/app/[locales]/(main)/tours/inbound/page"; 

const TravelDetailScreen = () => {
  const locale = useLocale();
  const { id } = useParams();
  const [single, setSingle] = useState<Travel | null>();
  const { fetchSingleTravel , travels} = useTravelStore();

  useEffect(() => {
    fetchSingleTravel(id as string).then((res) => setSingle(res));
  }, []);
  //   console.log(single);
  if (single == null) {
    return <Loader />;
  }     
  const filteredTravels = travels.filter((travel) => travel.language === locale);
  return (
    <CustomContainer className="px-4 md:px-0">
      <Heading travel={single!} />
      <GallerySlider images={single?.gallery || []} />
      <MainInformation travel={single!} />
      {/* in this secton booking card componet */}
      <BookingCard
        image={single.cover} // or single.gallery?.[0]
        region={single.category?.name || "Unknown"}
        date="Sep 2025"
        title={single.title}
        price={single.price}
        description={single.description}

      />
       <SimpleTravel showArrow travels={filteredTravels} />
       <Page />
    </CustomContainer>
  );
};

export default TravelDetailScreen;
