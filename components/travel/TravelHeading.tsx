import { Travel } from "@/types/travel";
import {
  ChevronRight,
  Heart,
  MessageCircleIcon,
  MessageSquareText,
  Share2,
} from "lucide-react";
import { Link } from "@/navigation";
import React from "react";

interface Props {
  name: string;
}

const TravelHeading = ({ name }: Props) => {
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
      <div className="w-full justify-end flex pb-6">
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
        <span className="text-[#555555] text-sm mx-2">{name}</span>
      </div>
      <hr className="border-[1px] " />
    </div>
  );
};

export default TravelHeading;
