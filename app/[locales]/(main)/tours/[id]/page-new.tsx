"use client";

import React, { useEffect, useState } from "react";
import useTravelStore from "@/store/travel";
import { Travel } from "@/types/travel";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

// Components
import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";

// Hooks
import { usePickText } from "./hooks/usePickText";

const TravelDetailScreen = () => {
  const locale = useLocale();
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [single, setSingle] = useState<Travel | null>(null);
  const { fetchSingleTravel } = useTravelStore();

  // Hooks
  const pickText = usePickText(locale);

  // Fetch travel data
  useEffect(() => {
    fetchSingleTravel(id as string).then((res) => setSingle(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Safe object for accessing travel properties
  const s: any = single ?? {};

  // Extract text fields
  const titleText = pickText(s?.title) || pickText(s?.name) || "Travel";
  const durationText = s?.duration ?? s?.days ?? s?.durationDays ?? null;
  const descriptionHTML = pickText(s?.description);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection
        travel={single}
        titleText={titleText}
        activeIndex={activeIndex}
      />

      {/* Content Section */}
      <ContentSection
        travel={single}
        descriptionHTML={descriptionHTML}
        durationText={durationText}
        pickText={pickText}
      />
    </div>
  );
};

export default TravelDetailScreen;
