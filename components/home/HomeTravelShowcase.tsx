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
        "group block overflow-hidden rounded-xl border border-slate-200 bg-white",
        "transition hover:shadow-md hover:scale-105 flex h-full flex-col",
        className,
      ].join(" ")}
    >
      <div
        className={
          imageOnly
            ? "relative flex-1 overflow-hidden"
            : "relative h-44 overflow-hidden"
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

      <div className="border-t border-slate-200 bg-white p-3">
        {showCategory &&
          typeof travel.category === "object" &&
          travel.category && (
            <div className="mb-1 text-[10px] text-slate-500">
              <span className="font-semibold">{travel.category.name}</span>
            </div>
          )}

        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-900 underline underline-offset-2 line-clamp-1">
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

/* ---------------- REUSABLE CATEGORY GRID ---------------- */

function CategoryGrid({ title, tours }: { title: string; tours: Travel[] }) {
  if (!tours || tours.length === 0) return null;
  console.log("✌️tours --->", tours);

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="pt-10"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-slate-900"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
      >
        {tours.slice(0, 3).map((t) => (
          <motion.div key={t._id} variants={itemVariants}>
            <TravelCard travel={t} showCategory />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ---------------- PAGE ---------------- */

export default function HomeTravelShowcase({ travels }: { travels: Travel[] }) {
  const specialTours = travels.filter((t) => t.isSpecial);

  const discoveryTours = travels.filter(
    (t) => !t.isSpecial && t.category?.name === "Discovery tours"
  );

  const dayTours = travels.filter(
    (t) => !t.isSpecial && t.category?.name === "Day tours"
  );

  const s = specialTours.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20">
      {/* 1️⃣ DISCOVERY */}
      <CategoryGrid title="Discovery tours" tours={discoveryTours} />

      {/* 2️⃣ SPECIAL (CUSTOM LAYOUT) */}
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
            className="text-2xl font-semibold text-slate-900"
          >
            Special tours
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mt-4 grid grid-cols-12 gap-5"
          >
            {s[0] && (
              <motion.div className="col-span-12 md:col-span-8">
                <TravelCard travel={s[0]} className="min-h-[200px]" />
              </motion.div>
            )}

            {s[1] && (
              <motion.div className="col-span-12 md:col-span-4">
                <TravelCard travel={s[1]} className="min-h-[200px]" />
              </motion.div>
            )}

            {s[2] && (
              <motion.div className="col-span-12 md:col-span-4 md:row-span-2">
                <TravelCard travel={s[2]} className="min-h-[400px]" imageOnly />
              </motion.div>
            )}

            {s[3] && (
              <motion.div className="col-span-12 sm:col-span-6 md:col-span-4">
                <TravelCard travel={s[3]} className="min-h-[150px]" />
              </motion.div>
            )}

            {s[4] && (
              <motion.div className="col-span-12 sm:col-span-6 md:col-span-4">
                <TravelCard travel={s[4]} className="min-h-[150px]" />
              </motion.div>
            )}

            {s[5] && (
              <motion.div className="col-span-12 md:col-span-8">
                <TravelCard travel={s[5]} className="min-h-[150px]" />
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* 3️⃣ DAY */}
      <CategoryGrid title="Day tours" tours={dayTours} />
    </div>
  );
}
