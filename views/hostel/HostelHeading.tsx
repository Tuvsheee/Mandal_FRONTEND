import {
  ChevronRight,
} from "lucide-react";
import { Link } from "@/navigation";
import React from "react";
import { Hostel } from "@/types/hostel";

interface Props {
  hostel: Hostel;
}
   
const HostelHeading = ({ hostel}: Props) => {
  const breadcrumbLinks = [
    {
      title: "Home",
      path: "/",   
    },
    {
      title: "Accommodation",
      path: "/accommodation",
    },
    {
      title: "Guesthouse & Hostel ",
      path: "/hostel",
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
      <span className="text-[#555555] text-sm mx-2">{hostel?.name}</span>
      </div>
      <hr className="border-[1px] " />
    </div>
  );
};

export default HostelHeading;
