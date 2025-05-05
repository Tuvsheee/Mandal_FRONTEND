"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import TransSwiper from "@/components/transSwiper";
import useTransStore from "@/store/trans";

export default function TransView() {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const { fetchTrans, trans } = useTransStore();


  useEffect(() => {
    fetchTrans();

  }, [fetchTrans]);
 
  const filteredData = trans.filter((trans) => trans.language === locale);;

  return (
    <>
      <DefaultContainer >
        <TransSwiper showArrow trans={filteredData} />
      </DefaultContainer>
    </>
  );
}
 