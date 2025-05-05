"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import useTipsStore from "@/store/tips";
import useFaqsStore from "@/store/faqs";
import TipsSwiper from "@/components/tips/TipsSwiper";
import FaqsSwiper from "@/components/tips/FaqsSwiper";

export default function TipsView() {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  const { fetchTips, tips } = useTipsStore();
  const { fetchFaqs, faqs } = useFaqsStore();
 
  useEffect(() => {
    fetchTips();
    fetchFaqs();

  }, [fetchTips, fetchFaqs]);
 
  const filteredTips = tips.filter((tips) => tips.language === locale);
  const filteredFaqs = faqs.filter((faqs) => faqs.language === locale);

  return (
    <>
      <DefaultContainer >
        <TipsSwiper showArrow tips={filteredTips} />
        <FaqsSwiper showArrow faqs={filteredFaqs} />
      </DefaultContainer>
    </>
  );
}
