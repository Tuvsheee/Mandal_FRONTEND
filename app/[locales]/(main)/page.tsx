"use client";

import CarouselSlider from "@/components/home/Carousel";
import HomeTravelShowcase from "@/components/home/HomeTravelShowcase";
import useBannerStore from "@/store/banner";
import useTravelStore from "@/store/travel";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const { banner, fetchBanner } = useBannerStore();
  const { fetchTravel, travels } = useTravelStore();

  useEffect(() => {
    fetchBanner();
    fetchTravel();
  }, [fetchBanner, fetchTravel]);

  // ✅ ЗӨВХӨН HOME TYPE
  const homeBanners = banner.filter((b) => b.type === "home");

  const heroBanner = homeBanners[0];
  const filteredTravels = travels.filter((t) => t.language);

  return (
    <div className="w-full bg-slate-950 text-white">
      {/* HERO CAROUSEL */}
      <section className="relative isolate overflow-hidden">
        <CarouselSlider banner={homeBanners} showArrow variant="home" />
      </section>

      {/* DESCRIPTION */}
      <section className="w-full bg-white text-slate-900">
        <motion.div
          className="mx-auto max-w-6xl px-6 py-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xl text-center text-black">
            {heroBanner?.description || ""}
          </p>
        </motion.div>

        <HomeTravelShowcase travels={filteredTravels} />
      </section>
    </div>
  );
}
