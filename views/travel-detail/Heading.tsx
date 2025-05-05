import { Travel } from "@/types/travel";
import { ChevronRight, Heart, Share2 } from "lucide-react";
import { Link } from "@/navigation";
import React from "react";
import { useTranslations } from "next-intl";

interface Props {
  travel: Travel;
}

const Heading = ({ travel }: Props) => {
  const t = useTranslations("HomePage");
  const breadcrumbLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Travels",
      path: "/travel",
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <div className="w-full justify-end md:flex py-6 hidden">
        {breadcrumbLinks.map((list, index) => {
          return (
            <div className="flex items-center" key={index}>
              <Link
                href={list.path}
                className="text-[#555555] text-sm mx-2 hover:underline "
              >
                {list.title}
              </Link>

              <ChevronRight size={15} />
            </div>
          );
        })}
        <span className="text-[#555555] text-sm mx-2">{travel?.title}</span>
      </div>
      {/* <div className="w-full flex items-center justify-between">
        <div className=" flex items-center gap-4">
          <span className="bg-[#5778BB] text-white px-4 rounded">
            {t("overseas_package")}
          </span>
          <span className="text-sm text-[#555555] md:block hidden">
            {t("rating")}: 4.5/5
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 cursor-pointer">
            <Heart size={20} color="#555555" />
            <span className="text-sm text-[#555555]">{t("save")}</span>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <Share2 size={20} color="#555555" />
            <span className="text-sm text-[#555555]">{t("share")}</span>
          </div>
        </div>
      </div> */}
      <div className="w-full mt-4">
        <span className="font-semibold text-3xl">
        {travel?.title}
        </span>
      </div>
      <hr className="border-[1px] bg-black border-black mt-3" />
    </div>
  );
};

export default Heading;
