"use client";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import AccSwiper from "@/components/acc/AccSwiper";

export default function AccView() {
  const locale = useLocale();
  const t = useTranslations("HomePage");



  return (
    <>
      <DefaultContainer >
        <AccSwiper />
      </DefaultContainer>
    </>
  );
}
