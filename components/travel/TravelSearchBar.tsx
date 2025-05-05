import { Search } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const TravelSearchBar = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full flex items-center border-[#FDE046] border rounded-lg overflow-hidden text-sm px-4">
      <input
        type="text"
        className="w-full flex py-2 px-4  "
        placeholder={t("search")}
      />
      <Search />
    </div>
  );
};

export default TravelSearchBar;
