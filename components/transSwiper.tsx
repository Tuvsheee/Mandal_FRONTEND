"use client";

import { Link } from "@/navigation";
import { Trans } from "@/types/trans";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";

export default function TransSwiper({
  trans,
}: {
  trans: Trans[];
  showArrow?: boolean;
}) {
  if (!Array.isArray(trans) || trans.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto pb-3">
        {trans.map((item) => (
          <Link
            key={item._id}
            href={`/transport/${item._id}`}
            className="min-w-[260px] max-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <motion.img
                src={`${IMGURL}/${item.photo}`}
                alt={item.name}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</div>
              <div className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</div>
              <div className="mt-3 text-sm font-semibold text-slate-900">{item.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
