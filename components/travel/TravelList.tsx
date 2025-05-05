"use client";

import TravelCard from "@/components/travel/TravelCard";
import { Travel } from "@/types/travel";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  travels: Travel[];
  onClick?: () => void; 
}


const TravelList = ({ travels }: Props) => {
  const t = useTranslations("HomePage");
  const searchParams = useSearchParams();
  const searchCat = searchParams.get("cat") || "";
  const searchSort = searchParams.get("sort") || "";
  const searchQuery = searchParams.get("search") || "";

  const router = useRouter();
  const handleSlideClick = (_id: string) => {
    router.push(`/tours/${_id}`);
  };

  const filteredTravels = travels
    .filter((travel) => {
      if (searchCat && travel.category._id !== searchCat) {
        return false;
      }
      if (searchQuery && !travel.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      if (searchSort === "price_high") {
        return priceB - priceA;
      } else if (searchSort === "price_low") {
        return priceA - priceB;
      }
      return 0;
    });

  return (
    <div className="flex flex-col w-full max-w-4xl mt-8 space-y-8">
      {filteredTravels.length > 0 ? (
        filteredTravels.map((product, index) => (
          <div key={index} onClick={() => handleSlideClick(product._id)} className="cursor-pointer">
            <TravelCard
              _id={product._id}  
              category={product.category.name}
              image={`https://shinely.tanuweb.cloud/uploads/${product.cover}`}
              title={product.title}
              description={product.description.slice(0, 50)}
              departurePeriod={product.duration}
              transportation={product.language}
              price={product.price}
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

export default TravelList;
