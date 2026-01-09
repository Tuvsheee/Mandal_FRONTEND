"use client";

import { Link } from "@/navigation";
import { Travel } from "@/types/travel";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";

/* ---------------- CARD ---------------- */

function TravelCard({
  travel,
  className = "",
  showCategory = false,
  imageOnly = false,
}: {
  travel: Travel;
  className?: string;
  showCategory?: boolean;
  imageOnly?: boolean;
}) {
  return (
    <Link
      href={`/tours/${travel._id}`}
      className={[
        "group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md hover:scale-105",
        "flex h-full flex-col",
        className,
      ].join(" ")}
    >
      {/* IMAGE: fill remaining height */}
      <div
        className={
          imageOnly
            ? "relative flex-1 w-full overflow-hidden"
            : "relative h-44 w-full overflow-hidden md:h-44"
        }
      >
        <motion.img
          src={`${IMGURL}/${travel.cover}`}
          alt={travel.title}
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* CAPTION: like screenshot */}

      <div className="border-t border-slate-200 bg-white p-3">
        {showCategory &&
          typeof travel.category === "object" &&
          travel.category && (
            <div className="mb-1 text-[10px] text-slate-500 line-clamp-1">
              <span className="font-semibold">{travel.category.name}</span>
            </div>
          )}

        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-900/90 underline underline-offset-2 line-clamp-1">
          {travel.title}
        </div>

        <div className="mt-1 text-[11px] text-black">{travel.duration}</div>
      </div>
    </Link>
  );
}

/* ---------------- ANIMATION ---------------- */

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ---------------- PAGE ---------------- */

export default function HomeTravelShowcase({ travels }: { travels: Travel[] }) {
  const special = travels.filter((t) => t.isSpecial);
  const discovery = travels.filter((t) => !t.isSpecial);

  // Group discovery tours by category
  const discoveryByCategory = discovery.reduce(
    (acc, tour) => {
      if (typeof tour.category === "object" && tour.category) {
        const categoryId = tour.category._id;
        if (!acc[categoryId]) {
          acc[categoryId] = {
            category: tour.category,
            tours: [],
          };
        }
        acc[categoryId].tours.push(tour);
      }
      return acc;
    },
    {} as Record<
      string,
      {
        category: any;
        tours: Travel[];
      }
    >
  );

  // Use first 6 special tours to match screenshot
  const s = special.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
      {/* ---------------- SPECIAL (Screenshot-like layout) ---------------- */}
      {s.length > 0 && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pt-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-sm font-semibold text-slate-900"
          >
            Special tours
          </motion.h2>

          {/* 12-col grid to control exact placement */}
          <motion.div
            variants={itemVariants}
            className="mt-4 grid grid-cols-12 gap-5"
          >
            {/* Row 1: big wide (8) + small (4) */}
            {s[0] && (
              <motion.div
                variants={itemVariants}
                className="col-span-12 md:col-span-8"
              >
                <TravelCard
                  travel={s[0]}
                  className="min-h-[150] md:min-h-[200px]"
                />
              </motion.div>
            )}
            {s[1] && (
              <motion.div
                variants={itemVariants}
                className="col-span-12 md:col-span-4"
              >
                <TravelCard
                  travel={s[1]}
                  className="min-h-[150] md:min-h-[200px]"
                />
              </motion.div>
            )}

            {/* Row 2-3 left: tall card (4) */}
            {s[2] && (
              <motion.div
                variants={itemVariants}
                className="col-span-12 md:col-span-4 md:row-span-2"
              >
                <TravelCard
                  travel={s[2]}
                  className="min-h-[320px] md:min-h-[400px]"
                  imageOnly
                />
              </motion.div>
            )}

            {/* Row 2 right: two small cards (4 + 4) */}
            {s[3] && (
              <motion.div
                variants={itemVariants}
                className="col-span-12 sm:col-span-6 md:col-span-4"
              >
                <TravelCard
                  travel={s[3]}
                  className="min-h-[150] md:min-h-[150px]"
                />
              </motion.div>
            )}
            {s[4] && (
              <motion.div
                variants={itemVariants}
                className="col-span-12 sm:col-span-6 md:col-span-4"
              >
                <TravelCard
                  travel={s[4]}
                  className="min-h-[150] md:min-h-[150px]"
                />
              </motion.div>
            )}

            {/* Row 3 right: wide card (8) */}
            {s[5] && (
              <motion.div
                variants={itemVariants}
                className="col-span-12 md:col-span-8"
              >
                <TravelCard
                  travel={s[5]}
                  className="min-h-[150px] md:min-h-[150px]"
                />
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ---------------- DISCOVERY BY CATEGORY ---------------- */}
      {Object.values(discoveryByCategory).map((group) => (
        <motion.section
          key={group.category._id}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pt-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-sm font-semibold text-slate-900"
          >
            {group.category.name}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
          >
            {group.tours.slice(0, 3).map((t) => (
              <motion.div key={t._id} variants={itemVariants}>
                <TravelCard travel={t} showCategory />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
