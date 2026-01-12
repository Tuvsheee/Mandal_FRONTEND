import React, { useMemo } from "react";
import { ClipboardCheck } from "lucide-react";
import { Travel } from "@/types/travel";

interface LeftBlockProps {
  travel: Travel | null;
  pickText: (value: any) => string;
}

/**
 * Left section displaying destination, highlights, and covering distance
 */
const LeftBlock: React.FC<LeftBlockProps> = ({ travel, pickText }) => {
  const s: any = travel ?? {};

  const destinationText = s?.destination ?? s?.region ?? s?.location ?? "";
  const highlightsText =
    s?.highlights ?? s?.shortInfo ?? s?.highlightsText ?? "";

  const block = useMemo(() => {
    const dest = pickText(destinationText);
    const hi = pickText(highlightsText);

    return (
      <>
        <div className="space-y-3">
          <div>
            <div className="text-[13px] font-bold text-neutral-900">
              Destination:
            </div>
            <div className="text-[13px] text-neutral-600 italic leading-relaxed">
              {dest || "—"}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold text-neutral-900">
              Highlights:
            </div>
            <div className="text-[13px] text-neutral-700 italic leading-relaxed whitespace-pre-line">
              {hi || "—"}
            </div>
          </div>

          {s?.coveringDistance ? (
            <div>
              <div className="text-[13px] font-bold text-neutral-900">
                Covering distance:
              </div>
              <div className="text-[13px] text-neutral-700 italic leading-relaxed whitespace-pre-line">
                {pickText(s.coveringDistance)}
              </div>
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 opacity-30">
          <ClipboardCheck className="h-10 w-10 text-neutral-700" />
        </div>
      </>
    );
  }, [destinationText, highlightsText, s, pickText]);

  return (
    <div className="relative rounded-2xl bg-neutral-100 border border-neutral-200 p-6 md:p-7 shadow-sm min-h-[210px]">
      {block}
    </div>
  );
};

export default LeftBlock;
