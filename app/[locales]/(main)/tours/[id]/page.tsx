"use client";

import React, { useEffect, useMemo, useState } from "react";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import useTravelStore from "@/store/travel";
import { Travel } from "@/types/travel";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";
import Loader from "@/components/common/Loader";
import GallerySlider from "@/components/home/GallerySlider";
import { ClipboardCheck, Wallet2 } from "lucide-react";

const TravelDetailScreen = () => {
  const locale = useLocale();
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [single, setSingle] = useState<Travel | null>(null);
  const { fetchSingleTravel } = useTravelStore();

  useEffect(() => {
    fetchSingleTravel(id as string).then((res) => setSingle(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // ✅ Framer HTML (absolute div/svg/styles) -> clean Day itinerary list HTML
  const sanitizeAndFormatItinerary = (rawHtml: string) => {
    if (!rawHtml) return "";

    let html = rawHtml;

    // remove framer svg-bullet div blocks
    html = html.replace(
      /<div[^>]*data-framer-component-type="SVG"[\s\S]*?<\/div>/gi,
      ""
    );

    // unwrap rich text container opening tag, and remove ending wrapper
    html = html.replace(
      /<div[^>]*data-framer-component-type="RichTextContainer"[^>]*>/gi,
      ""
    );
    html = html.replace(/<\/div>\s*$/gi, "");

    // remove ALL inline styles and data-* attrs to prevent absolute positioning
    html = html
      .replace(/\sstyle=('|")[\s\S]*?('|")/gi, "")
      .replace(/\sdata-[a-z0-9-]+=('|")[\s\S]*?('|")/gi, "");

    // br -> newline
    html = html.replace(/<br\s*\/?>/gi, "\n");

    // extract text from <p> blocks
    const pMatches = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map(
      (m) => (m[1] || "").replace(/<[^>]+>/g, "").trim()
    );

    const lines = pMatches
      .map((x) => x.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    // group into Day blocks
    const items: { title: string; body: string[] }[] = [];
    let current: { title: string; body: string[] } | null = null;

    for (const line of lines) {
      const isDay = /^day\s*\d+/i.test(line);

      if (isDay) {
        if (current) items.push(current);
        current = { title: line, body: [] };
      } else {
        if (!current) current = { title: "Itinerary", body: [] };
        current.body.push(line);
      }
    }
    if (current) items.push(current);

    // build clean HTML for styling
    const out =
      `<ul>` +
      items
        .map((it) => {
          const body = it.body.length ? it.body.join(" ") : "";
          return (
            `<li>` +
            `<p><strong>${it.title}</strong></p>` +
            `<p>${body}</p>` +
            `</li>`
          );
        })
        .join("") +
      `</ul>`;

    return out;
  };

  const TypewriterTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      setDisplay("");
      let i = 0;
      const chars = Array.from(text || "");

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
        className="text-lg md:text-3xl text-white font-bold leading-snug"
      >
        {display}
      </motion.h1>
    );
  };

  // ✅ safe object so hooks can run even when single is null
  const s: any = single ?? {};

  // fields
  const titleText = pickText(s?.title) || pickText(s?.name) || "Travel";
  const durationText = s?.duration ?? s?.days ?? s?.durationDays ?? null;
  const destinationText = s?.destination ?? s?.region ?? s?.location ?? "";
  const highlightsText =
    s?.highlights ?? s?.shortInfo ?? s?.highlightsText ?? "";
  const tourPriceText = s?.tourPrice ?? s?.priceText ?? s?.price ?? "";
  const includedText =
    s?.included ?? s?.includedInPrice ?? s?.priceIncludes ?? "";
  const excludedText = s?.excluded ?? s?.exclude ?? s?.priceExcludes ?? "";
  const description2 = s?.description2 ?? s?.desc ?? s?.details ?? "";

  const coverSrc = single?.cover
    ? `${IMGURL}/${single.cover}`
    : "/placeholder.jpg";
  const descriptionHTML = pickText(s?.description);

  const itineraryHTML = useMemo(() => {
    return sanitizeAndFormatItinerary(String(description2 || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description2]);

  const leftBlock = useMemo(() => {
    const dest = pickText(destinationText);
    const hi = pickText(highlightsText);

    return (
      <>
        <div className="space-y-3 mb-12">
          {dest ? (
            <div>
              <p className="text-[13px] font-bold text-neutral-900 mb-1">
                Destination:
              </p>
              <p className="text-[13px] text-neutral-600 italic leading-relaxed">
                {dest}
              </p>
            </div>
          ) : null}

          {hi ? (
            <div>
              <p className="text-[13px] font-bold text-neutral-900 mb-1">
                Highlights:
              </p>
              <p className="text-[13px] text-neutral-700 italic leading-relaxed whitespace-pre-line">
                {hi}
              </p>
            </div>
          ) : null}

          {s?.coveringDistance ? (
            <div>
              <p className="text-[13px] font-bold text-neutral-900 mb-1">
                Covering distance:
              </p>
              <p className="text-[13px] text-neutral-700 italic leading-relaxed whitespace-pre-line">
                {pickText(s.coveringDistance)}
              </p>
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 opacity-50">
          <ClipboardCheck className="h-10 w-10 text-neutral-900" />
        </div>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationText, highlightsText, locale, single]);

  const rightBlock = useMemo(() => {
    const price = pickText(tourPriceText);
    const inc = pickText(includedText);
    const exc = pickText(excludedText);
    const includedPrice = pickText(s?.includedPrice ?? "");
    const excludesPrice = pickText(s?.excludesPrice ?? "");

    const tight = (t: string) => (t ? t.replace(/\n{2,}/g, "\n") : t);

    return (
      <>
        <div className="space-y-3">
          {price ? (
            <div className="text-[13px] text-neutral-900 italic">
              <span className="font-bold not-italic">Tour price:</span>{" "}
              <span className="font-bold">{price}</span>
            </div>
          ) : null}

          <div className="text-[13px] text-neutral-800 italic leading-tight">
            {tight(inc || includedPrice) ? (
              <>
                <p className="font-bold not-italic mb-1">
                  Included in the price:
                </p>
                <p className="whitespace-pre-line leading-[1.25]">
                  {tight(inc || includedPrice)}
                </p>
              </>
            ) : null}

            {tight(exc || excludesPrice) ? (
              <>
                <p className="font-bold not-italic mt-3 mb-1">
                  Exclude in the price:
                </p>
                <p className="whitespace-pre-line leading-[1.25]">
                  {tight(exc || excludesPrice)}
                </p>
              </>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 opacity-50">
          <Wallet2 className="h-10 w-10 text-neutral-900" />
        </div>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourPriceText, includedText, excludedText, locale, single]);

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

        <div className="absolute inset-0 z-10 flex items-end px-4 md:px-24 pb-10 md:pb-16">
          <div className="max-w-[820px]">
            <TypewriterTitle text={titleText} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <DefaultContainer className="px-4 md:px-0">
        {!single ? (
          <div className="py-10">
            <Loader />
          </div>
        ) : (
          <>
            {descriptionHTML ? (
              <div className="max-w-3xl mx-auto text-center py-8 md:py-10">
                <p
                  className="text-sm md:text-base text-neutral-900"
                  dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                />
              </div>
            ) : null}

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-stretch">
              {/* LEFT */}
              <div className="flex flex-col h-full">
                <div className="relative h-full flex flex-col">
                  <div className="rounded-2xl bg-[#ededed] border border-neutral-200 relative p-6 md:p-7 shadow-sm h-full">
                    {leftBlock}
                  </div>

                  {/* duration always at bottom */}
                  {durationText ? (
                    <div className="mt-auto pt-6">
                      <div className="rounded-2xl bg-[#ededed] border border-neutral-200 py-2 text-center shadow-sm">
                        <span className="text-lg md:text-xl font-bold text-neutral-900 italic">
                          Duration: {pickText(durationText)}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative rounded-2xl bg-[#ededed] border border-neutral-200 p-6 md:p-7 shadow-sm h-full flex flex-col">
                {rightBlock}
              </div>
            </div>

            {/* ITINERARY like screenshot */}
            {description2 ? (
              <div className="max-w-6xl mx-auto mt-6 md:mt-8">
                <div className="rounded-2xl bg-[#ededed] border border-neutral-200 p-4 md:p-10 shadow-sm">
                  <div
                    className="
    text-[13px] md:text-[16px] text-neutral-700 mr-44 

    [&_ul]:list-disc
    [&_ul]:pl-10
    [&_ul]:space-y-2

    
    /* bullet */
    [&_li::marker]:text-neutral-900
    [&_li::marker]:text-[32px]

    
    

    /* ✅ timeline line: always matches item height */
    [&_li]:relative
    [&_li]:pl-2

    /* line */
    [&_li]:before:content-['']
    [&_li]:before:absolute
    [&_li]:before:left-[-25px]          /* line x-position */
    [&_li]:before:top-[42px]            /* start under bullet */
    [&_li]:before:bottom-[-62px]        /* extend into ul spacing to connect next */
    [&_li]:before:w-[2px]
    [&_li]:before:bg-neutral-200

    /* last item: stop line at end */
    [&_li:last-child]:before:bottom-[10px]

    /* text styling */
    [&_li_p:first-child]:mb-2
    [&_li_p:first-child]:text-neutral-900
    [&_li_p:first-child]:font-semibold
    [&_li_p:first-child]:italic

    [&_li_p:not(:first-child)]:text-neutral-600
    [&_li_p:not(:first-child)]:italic
    [&_li_p:not(:first-child)]:leading-relaxed
  "
                    dangerouslySetInnerHTML={{ __html: itineraryHTML }}
                  />
                </div>
              </div>
            ) : null}

            <div className=" mx-auto mt-6 md:mt-10 pb-12 flex justify-center items-center">
              <GallerySlider images={single.gallery || []} />
            </div>
          </>
        )}
      </DefaultContainer>
    </div>
  );
};

export default TravelDetailScreen;
