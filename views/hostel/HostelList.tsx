"use client";

import TravelCard from "@/components/travel/TravelCard";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { Hostel } from "@/types/hostel";
import HostelCard from "./HostelCard";

interface Props {
  hostel: Hostel[];
  onClick?: () => void; 
}

const HostelList = ({ hostel }: Props) => {
  const t = useTranslations("HomePage");
  const searchParams = useSearchParams();
  
  const router = useRouter();
  const handleSlideClick = (_id: string) => {
    router.push(`/accommodation/guesthouse/${_id}`);
  };

  return (
    <div className="flex flex-col w-full max-w-[1200px] mt-8 space-y-8">
      {hostel.length > 0 ? (
        hostel.map((product, index) => (
          <div key={index} onClick={() => handleSlideClick(product._id)} className="cursor-pointer">
            <HostelCard
              _id={product._id}  
              photo={`https://shinely.tanuweb.cloud/uploads/${product.photo}`}
              name={product.name}
              description={product.description}
              information={product.information}
              location={product.location}
              rating={5}
            />
          </div>
        ))
      ) : (
        <p>{t("noTravelsFound")}</p>
      )}
    </div>
  );
};

export default HostelList;
