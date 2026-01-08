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

  const heroBanner = banner.find((b) => b.type === "home");

  const filteredTravels = travels.filter((travel) => travel.language );

  useEffect(() => {
    fetchBanner();
    fetchTravel();
  }, [fetchBanner, fetchTravel]);



  return (
    <div className="w-full bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden">
        <CarouselSlider showArrow banner={banner} />


      </section>

      <section className="w-full bg-white text-slate-900">
        <motion.div
          className="mx-auto max-w-6xl px-6 py-8 md:py-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
              <p className="text-xl  text-black text-center">
                {heroBanner?.description || ""}
              </p>
       
    
          </motion.div>

        </motion.div>

        <HomeTravelShowcase travels={filteredTravels} />
      </section>
    </div>
  );
}
