"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Faqs } from "@/types/faqs";

interface Props {
  dangerouslySetInnerHTML?: { __html: string };
  faqs: Faqs[];
  showArrow: boolean;
}

const FaqsSwiper = ({ faqs, showArrow }: Props) => {
  const t = useTranslations("HomePage");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full my-8 lg:my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap mb-4">
        <span className="text-4xl font-bold">
        {t("faqs1")}
        </span>
        <span className="text-4xl font-bold text-[#5C98F2]">{t("faqs2")}</span>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq._id}
            className="border rounded-lg shadow-sm overflow-hidden"
            onClick={() => toggleFAQ(index)}
          >
            <div
              className="flex justify-between items-center cursor-pointer p-6 bg-white  transition-colors duration-700"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <span
                className={`text-2xl transform transition-transform duration-700 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-1000 ${
                openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="p-6 text-gray-600 text-lg">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqsSwiper;
