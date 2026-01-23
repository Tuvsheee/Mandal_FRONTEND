"use client";

import CarouselSlider from "@/components/home/Carousel";
import useBannerStore from "@/store/banner";
import useTravelStore from "@/store/travel";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import Image from "next/image";
import GallerySlider from "@/components/home/GallerySlider";
import Book from "@/components/home/Book";

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
          <div className="flex justify-center ">
            <Book />
          </div>
        </section>
      </DefaultContainer>
    );
  }

  return (
    <DefaultContainer>
      <div className="w-full text-white relative">
        <section className="relative isolate overflow-hidden">
          <CarouselSlider showArrow banner={filteredBanners} variant="tours" />
        </section>

        <div className="w-full flex flex-col items-center justify-center">
          {filteredBanners.length > 0 && filteredBanners[0]?.description && (
            <div className="w-full max-w-4xl mt-12 px-4 md:px-12 overflow-x-hidden">
              <span
                className="
          text-base md:text-2xl
          text-center md:text-left
          break-words
          overflow-x-hidden

          [&_*]:max-w-full
          [&_img]:h-auto
          [&_img]:max-w-full
          [&_iframe]:max-w-full
          [&_table]:block
          [&_table]:max-w-full
          [&_table]:overflow-x-auto
        "
                dangerouslySetInnerHTML={{
                  __html: filteredBanners[0].description || "",
                }}
              />
            </div>
          )}

          {pageType === "blog" &&
            filteredBanners.length > 0 &&
            filteredBanners[0]?.gallery &&
            filteredBanners[0].gallery.length > 0 && (
              <div className="w-full max-w-6xl mb-6 px-4 md:px-12">
                <GallerySlider images={filteredBanners[0].gallery || []} />
              </div>
            )}
        </div>
      </div>
    </DefaultContainer>
  );
}
