import React from "react";
import CustomContainer from "@/components/Layout/CustomContainer";
import Loader from "@/components/common/Loader";
import GallerySlider from "@/components/home/GallerySlider";
import { Travel } from "@/types/travel";
import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";

interface ContentSectionProps {
  travel: Travel | null;
  descriptionHTML: string;
  durationText: any;
  pickText: (value: any) => string;
}

/**
 * Main content section with description, info blocks, duration, and gallery
 */
const ContentSection: React.FC<ContentSectionProps> = ({
  travel,
  descriptionHTML,
  durationText,
  pickText,
}) => {
  if (!travel) {
    return (
      <CustomContainer className="px-4 md:px-0">
        <div className="py-10">
          <Loader />
        </div>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer className="px-4 md:px-0">
      {/* Description */}
      {descriptionHTML ? (
        <div className="max-w-3xl mx-auto text-center py-8 md:py-10">
          <p
            className="text-sm md:text-base text-neutral-900"
            dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          />
        </div>
      ) : null}

      {/* Info Blocks */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        <LeftBlock travel={travel} pickText={pickText} />
        <RightBlock travel={travel} pickText={pickText} />
      </div>

      {/* Duration */}
      {durationText ? (
        <div className="max-w-6xl mx-auto mt-6 md:mt-8">
          <div className="rounded-2xl bg-neutral-100 border border-neutral-200 px-6 py-4 text-center shadow-sm">
            <span className="text-lg md:text-2xl font-bold text-neutral-900 italic whitespace-pre-line">
              Duration: {pickText(durationText)}
            </span>
          </div>
        </div>
      ) : null}

      {/* Gallery */}
      <div className="max-w-6xl mx-auto mt-6 md:mt-10 pb-12">
        <GallerySlider images={travel.gallery || []} />
      </div>
    </CustomContainer>
  );
};

export default ContentSection;
