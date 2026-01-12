import React from "react";
import Image from "next/image";
import IMGURL from "@/utils/constant";
import { Travel } from "@/types/travel";
import TypewriterTitle from "./TypewriterTitle";

interface HeroSectionProps {
  travel: Travel | null;
  titleText: string;
  activeIndex: number;
}

/**
 * Hero section with cover image and typewriter title
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  travel,
  titleText,
  activeIndex,
}) => {
  const coverSrc = travel?.cover
    ? `${IMGURL}/${travel.cover}`
    : "/placeholder.jpg";

  return (
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
          <TypewriterTitle text={titleText} activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
