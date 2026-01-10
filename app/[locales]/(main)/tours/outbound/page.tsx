"use client";

import CarouselSlider from "@/components/home/Carousel";
import HomeTravelShowcase from "@/components/home/HomeTravelShowcase";
import useBannerStore from "@/store/banner";
import useTravelStore from "@/store/travel";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Destination() {
  const { banner, fetchBanner } = useBannerStore();
  const { fetchTravel, travels } = useTravelStore();

  const filteredBanners = banner.filter((b) => b.type === "tours");

  const filteredTravels = travels.filter((travel) => travel.language);

  useEffect(() => {
    fetchBanner();
    fetchTravel();
  }, [fetchBanner, fetchTravel]);

  return (
    <div className="w-full bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden">
        <CarouselSlider showArrow banner={filteredBanners} variant="tours" />
      </section>

      <section className="w-full bg-white text-slate-900">
        <HomeTravelShowcase travels={filteredTravels} />
      </section>
    </div>
  );
}
