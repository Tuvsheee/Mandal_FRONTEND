import {
    ChevronRight,
  } from "lucide-react";
  import { Link } from "@/navigation";
  import React from "react";
  import { Apartment } from "@/types/apartment";
import { Trans } from "@/types/trans";
  
  interface Props {
    trans: Trans;
  }
     
  const HeadingDetail = ({ trans}: Props) => {
    const breadcrumbLinks = [
      {
        title: "Home",
        path: "/",   
      },
      {
        title: "Transport",
        path: "/transport",
      },
    ];
    return (
      <div className="w-full flex flex-col">
        <div className="w-full justify-end flex py-2 pb-2 md:pb-4">
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
        <span className="text-[#555555] text-sm mx-2">{trans?.name}</span>
        </div>
        <hr className="border-[1px] " />
      </div>
    );
  };
  
  export default HeadingDetail;
  