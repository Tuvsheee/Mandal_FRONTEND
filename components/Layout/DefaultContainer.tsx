"use client";
import React, { ReactNode, useEffect } from "react";
import MostPopularTours from "@/components/travel/MostPopularTours";
import useTravelStore from "@/store/travel";
import useCategoryStore from "@/store/category";

interface DefaultContainerProps {
  children: ReactNode;
  className?: string;
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({
  children,
  className,
}) => {
  const { fetchTravel, travels } = useTravelStore();
  const { fetchData, data: categories } = useCategoryStore();

  useEffect(() => {
    fetchTravel();
    fetchData();
  }, []);

  // Filter travels by categories with isSpecial = true and get last 3
  const specialCategoryIds = categories
    .filter((cat) => cat.isSpecial)
    .map((cat) => cat._id);

  const specialTravels = travels
    .filter((travel) => specialCategoryIds.includes(travel.category._id))
    .slice(-3);

  return (
    <div className={`   ${className}`}>
      {children}
      <MostPopularTours travels={specialTravels} limit={3} />
    </div>
  );
};

export default DefaultContainer;
