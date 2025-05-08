"use client";
import { useTranslations, useLocale } from "next-intl";
import { useEffect } from "react";
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

  const filteredData = Array.isArray(trans)
    ? trans.filter((item) => item.language === locale)
    : [];

  return (
    <DefaultContainer>
      <TransSwiper showArrow trans={filteredData} />
    </DefaultContainer>
  );
}
