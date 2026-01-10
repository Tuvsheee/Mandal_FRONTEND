"use client";

import CarouselSlider from "@/components/home/Carousel";
import useBannerStore from "@/store/banner";
import useTravelStore from "@/store/travel";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import Image from "next/image";
import BookTravel from "@/components/home/Book";

export default function headertypePages() {
  const searchParams = useSearchParams();
  const pageType = searchParams.get("type") || "destination"; // Default to destination

  const { banner, fetchBanner } = useBannerStore();

  const filteredBanners = banner.filter((b) => b.type === pageType);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  // Show contact page only when type is contact
  if (pageType === "contact") {
    return (
      <DefaultContainer>
        <section className="relative isolate overflow-hidden">
          <CarouselSlider showArrow banner={filteredBanners} variant="tours" />
        </section>
        <BookTravel />
      </DefaultContainer>
    );
  }

  return (
    <DefaultContainer>
      <div className="w-full  text-white ">
        <section className="relative isolate overflow-hidden">
          <CarouselSlider showArrow banner={filteredBanners} variant="tours" />
        </section>
        <div className="w-full flex flex-col items-center justify-center ">
          {filteredBanners.length > 0 && filteredBanners[0]?.description && (
            <div className="w-full max-w-4xl flex my-12 mx-12">
              <span
                className="text-2xl "
                dangerouslySetInnerHTML={{
                  __html: filteredBanners[0].description || "",
                }}
              ></span>
            </div>
          )}
        </div>

        <div className="absolute -left-80 top-[1200px] w-1/2 h-full z-0 opacity-35">
          <Image
            src="/back1.avif"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </DefaultContainer>
  );
}
