"use client";
import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const TravelFilter = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const locale = useLocale(); // Current locale (mn, en, kr)
 
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>();


  const handleSearch = () => {
    setSelectedCat("");
    const params = new URLSearchParams(window.location.search);

    params.set("cat", "");

    router.push(`/travel?${params.toString()}`);
  };

  const handlePop = (id: string) => {
    setSelectedCat(id);
    const params = new URLSearchParams(window.location.search);

    params.set("cat", id);

    router.push(`/travel?${params.toString()}`);
  };

  return (
    <div className="w-full text-sm flex flex-col gap-4">
      <div className="">
        <button
          className="w-full flex justify-between items-center text-left pt-4"
          onClick={handleSearch}
        >
          <span
            className={`${
              selectedCat === "" ? "text-black font-semibold" : "text-gray-400"
            }`}
          >
            {t("all")}
          </span>
        </button>
      </div>
      
    </div>
  );
};

export default TravelFilter;
