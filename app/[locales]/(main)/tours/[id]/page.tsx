"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomContainer from "@/components/Layout/CustomContainer";
import useTravelStore from "@/store/travel";
import { Travel } from "@/types/travel";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";
import Loader from "@/components/common/Loader";
import GallerySlider from "@/components/home/GallerySlider";
import MainInformation from "@/components/travel-detail/MainInformation";
import { title } from "process";

const TravelDetailScreen = () => {
  const locale = useLocale();
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [single, setSingle] = useState<Travel | null>(null);
  const { fetchSingleTravel, travels } = useTravelStore();

  useEffect(() => {
    fetchSingleTravel(id as string).then((res) => setSingle(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!single) return <Loader />;

  const pickText = (v: any): string => {
    if (v === null || v === undefined) return "";

    if (typeof v === "string" || typeof v === "number") return String(v);

    if (Array.isArray(v)) {
      return v
        .map((x) => pickText(x))
        .filter(Boolean)
        .join("\n");
    }

    if (typeof v === "object") {
      const locKey = String(locale);
      const locShort = locKey.split("-")[0];

      if (
        v[locKey] &&
        (typeof v[locKey] === "string" || typeof v[locKey] === "number")
      )
        return pickText(v[locKey]);

      if (
        v[locShort] &&
        (typeof v[locShort] === "string" || typeof v[locShort] === "number")
      )
        return pickText(v[locShort]);

      if ("title" in v && "description" in v) {
        const t = pickText((v as any).title);
        const d = pickText((v as any).description);
        return [t, d].filter(Boolean).join("\n");
      }

      if ("text" in v) return pickText((v as any).text);
      if ("value" in v) return pickText((v as any).value);
      if ("name" in v) return pickText((v as any).name);
      if ("label" in v) return pickText((v as any).label);

      return Object.values(v)
        .map((x) => pickText(x))
        .filter(Boolean)
        .join("\n");
    }

    return "";
  };
  const TypewriterTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      setDisplay("");
      let i = 0;
      const chars = Array.from(text);

      const interval = setInterval(() => {
        i++;
        setDisplay(chars.slice(0, i).join(""));
        if (i >= chars.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }, [text, activeIndex]);

    return (
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={"text-lg md:text-2xl text-white font-bold "}
      >
        {display}
      </motion.h1>
    );
  };
  // fields
  const durationText =
    (single as any)?.duration ??
    (single as any)?.days ??
    (single as any)?.durationDays ??
    null;

  const destinationText =
    (single as any)?.destination ??
    (single as any)?.region ??
    (single as any)?.location ??
    "";

  const highlightsText =
    (single as any)?.highlights ??
    (single as any)?.shortInfo ??
    (single as any)?.highlightsText ??
    "";

  const includedText =
    (single as any)?.included ??
    (single as any)?.includedInPrice ??
    (single as any)?.priceIncludes ??
    "";

  const coverSrc = single.cover
    ? `${IMGURL}/${single.cover}`
    : "/placeholder.jpg";

  // NOTE: эдгээр нь HTML байж магадгүй гэж үзээд innerHTML ашиглана
  const descriptionHTML = pickText((single as any).description);

  return (
    <div className="w-full">
      {/* HERO */}
      <div className="relative h-[320px] md:h-[520px] w-full overflow-hidden">
        <Image
          src={coverSrc}
          alt="cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />

        <div
          className={`absolute inset-0 flex flex-col  items-start text-white text-left px-32 z-10 ${"max-w-[700px] justify-end py-24"}`}
        >
          <TypewriterTitle text={title} />
        </div>
      </div>

      {/* CONTENT */}
      <CustomContainer className="px-4 md:px-0">
        {descriptionHTML ? (
          <div className="max-w-3xl mx-auto text-center py-8 md:py-10">
            <p
              className="text-sm md:text-base text-neutral-600 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />
          </div>
        ) : null}

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 md:p-7 shadow-sm">
            <div className="text-sm text-neutral-500 mb-2">Destination</div>
            <div className="text-base md:text-lg font-semibold text-neutral-900 whitespace-pre-line">
              {pickText(destinationText) || "—"}
            </div>

            <div className="mt-5">
              <div className="text-sm text-neutral-500 mb-2">Highlights</div>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                {pickText(highlightsText) || "—"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 md:p-7 shadow-sm">
            <div className="text-sm text-neutral-500 mb-2">
              Tour price / Included
            </div>

            <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
              {pickText(includedText) || "—"}
            </p>

            {single.price ? (
              <div className="mt-5 pt-5 border-t border-neutral-200">
                <div className="text-sm text-neutral-500">Үнэ</div>
                <div className="text-lg font-semibold text-neutral-900 whitespace-pre-line">
                  {pickText((single as any).price)}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {durationText ? (
          <div className="max-w-5xl mx-auto mt-6 md:mt-8">
            <div className="rounded-full border border-neutral-200 bg-white px-6 py-3 text-center">
              <span className="text-base md:text-lg font-semibold text-neutral-800 whitespace-pre-line">
                Duration: {pickText(durationText)}
              </span>
            </div>
          </div>
        ) : null}

        <div className="max-w-5xl mx-auto mt-6 md:mt-10 pb-12">
          <GallerySlider images={single.gallery || []} />
        </div>
      </CustomContainer>
    </div>
  );
};

export default TravelDetailScreen;
