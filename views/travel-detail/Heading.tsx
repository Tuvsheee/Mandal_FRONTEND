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
    
      <div className="w-full flex flex-col my-12">
        <span className="font-semibold text-[30px]">
          {travel?.title}
        </span>
        <span className="text-[20px] mt-2 ">
          {travel?.description}
        </span>
      </div>
     
    </div>
  );
};

export default Heading;
