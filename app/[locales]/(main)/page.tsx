"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import { useTranslations } from "next-intl";
import useTravelStore from "@/store/travel";
import { useEffect } from "react";
import SpecialTravel from "@/components/home/SpecialTravel";
import GridInformation from "@/components/home/GridInformation";
import CarouselSlider from "@/components/home/Carousel";
import useBannerStore from "@/store/banner";
import { useLocale } from "next-intl";
import SimpleTravel from "@/components/home/SimpleTravel";
import DefaultContainer from "@/components/Layout/DefaultContainer";


import useTeamStore from "@/store/team";

export default function Home() {
  const locale = useLocale();
  const { fetchTravel, travels } = useTravelStore();
  const { fetchTeam, team } = useTeamStore();
 
  const { banner , fetchBanner} = useBannerStore();

  useEffect(() => {
    fetchTravel();
    fetchBanner();
    fetchTeam();
  }, [fetchTravel, fetchBanner ,fetchTeam, fetch]);

  const t = useTranslations("HomePage");

  // Filter travels and categories based on the locale
  const filteredTravels = travels.filter((travel) => travel.language === locale);
 

  return (
    <>
      <DefaultContainer >
        <CarouselSlider showArrow banner={banner} />
        <CustomContainer className=" md:px-0 overflow-hidden">
          <SimpleTravel showArrow travels={filteredTravels} />
      
        </CustomContainer>
      </DefaultContainer>
    </>
  );
}
