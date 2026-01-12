import React, { useMemo } from "react";
import { Wallet2 } from "lucide-react";
import { Travel } from "@/types/travel";

interface RightBlockProps {
  travel: Travel | null;
  pickText: (value: any) => string;
}

/**
 * Right section displaying tour price, included, and excluded items
 */
const RightBlock: React.FC<RightBlockProps> = ({ travel, pickText }) => {
  const s: any = travel ?? {};

  const tourPriceText = s?.tourPrice ?? s?.priceText ?? s?.price ?? "";
  const includedText =
    s?.included ?? s?.includedInPrice ?? s?.priceIncludes ?? "";
  const excludedText = s?.excluded ?? s?.exclude ?? s?.priceExcludes ?? "";

  const block = useMemo(() => {
    const price = pickText(tourPriceText);
    const inc = pickText(includedText);
    const exc = pickText(excludedText);

    return (
      <>
        <div className="space-y-3">
          {price ? (
            <div className="text-[13px] text-neutral-900 italic">
              <span className="font-bold not-italic">Tour price:</span>{" "}
              <span className="font-bold">{price}</span>
            </div>
          ) : null}

          <div className="text-[13px] text-neutral-800 italic leading-relaxed whitespace-pre-line">
            {inc ? (
              <>
                <span className="font-bold not-italic">
                  Included in the price:
                </span>
                {"\n"}
                {inc}
              </>
            ) : (
              <>
                <span className="font-bold not-italic">
                  Included in the price:
                </span>
                {"\n"}—
              </>
            )}

            {"\n\n"}

            {exc ? (
              <>
                <span className="font-bold not-italic">
                  Exclude in the price:
                </span>
                {"\n"}
                {exc}
              </>
            ) : (
              <>
                <span className="font-bold not-italic">
                  Exclude in the price:
                </span>
                {"\n"}—
              </>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 opacity-30">
          <Wallet2 className="h-10 w-10 text-neutral-700" />
        </div>
      </>
    );
  }, [tourPriceText, includedText, excludedText, s, pickText]);

  return (
    <div className="relative rounded-2xl bg-neutral-100 border border-neutral-200 p-6 md:p-7 shadow-sm min-h-[210px]">
      {block}
    </div>
  );
};

export default RightBlock;
