"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import HotelSwiper from "@/components/hotel/swiper";
import useHotelStore from "@/store/hotel";


export default function HotelView() {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const { fetchHotel, hotels } = useHotelStore();


  useEffect(() => {
    fetchHotel();


  }, [fetchHotel,]);
 
  const filteredHotels = hotels.filter((hotels) => hotels.language === locale);


  return (
    <>
      <DefaultContainer >
        <HotelSwiper showArrow hotel={filteredHotels} />
      </DefaultContainer>
    </>
  );
}
