"use client";
import React, { ReactNode, useEffect } from "react";
import MostPopularTours from "@/components/travel/MostPopularTours";
import useTravelStore from "@/store/travel";

interface DefaultContainerProps {
  children: ReactNode;
  className?: string;
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({
  children,
  className,
}) => {
  const { fetchTravel, travels } = useTravelStore();

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <div className={`   ${className}`}>
      {children}
      <MostPopularTours travels={travels} limit={3} />
    </div>
  );
};

export default DefaultContainer;
