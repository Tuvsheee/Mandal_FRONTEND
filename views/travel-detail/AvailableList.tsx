import {Calendar,CarTaxiFront,Plane,ShieldCheck,ShoppingBag,} from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const AvailableList = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full grid grid-cols-3 md:flex bg-[#F7F7F7] md:h-[15vh] h-auto p-4 md:p-0 mt-4 items-center justify-center gap-8">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <Plane size={30} />
        </div>
        <span className="text-sm">{t("flight")}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <Calendar size={30} />
        </div>
        <span className="text-sm">{t("calendar")}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <ShieldCheck size={30} />
        </div>
        <span className="text-sm">{t("shieldCheck")}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <CarTaxiFront size={30} />
        </div>
        <span className="text-sm">{t("carTaxiFront")}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <ShoppingBag size={30} />
        </div>
        <span className="text-sm">{t("shoppingBag")}</span>
      </div>
    </div>
  );
};

export default AvailableList;
