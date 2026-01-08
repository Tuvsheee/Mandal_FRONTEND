"use client";

import { Link } from "@/navigation";
import { Travel } from "@/types/travel";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";

/* ---------------- HELPERS ---------------- */

type CardSize = "small" | "wide";

function isDayTour(travel: Travel) {
  const duration = String(travel.duration || "");
  const daysLen = Array.isArray(travel.days) ? travel.days.length : 0;
  return /\bday\b/i.test(duration) || daysLen === 1;
}

/* ---------------- CARD ---------------- */

function TravelCard({
  travel,
  size,
  showCategory = false,
}: {
  travel: Travel;
  size: CardSize;
  showCategory?: boolean;
}) {
  const isWide = size === "wide";

  return (
    <Link
      href={`/tours/${travel._id}`}
      className={`group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md ${
        isWide ? "md:col-span-2" : ""
      }`}
    >
      {/* IMAGE */}
      <div
        className={`relative w-full ${
          isWide ? "h-48 md:h-64" : "h-44"
        } overflow-hidden`}
      >
        <motion.img
          src={`${IMGURL}/${travel.cover}`}
          alt={travel.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-3">
        {/* CATEGORY (DISCOVERY ONLY) */}
        {showCategory &&
          typeof travel.category === "object" &&
          travel.category && (
            <div className="mb-1 text-[10px] text-slate-500 line-clamp-1">
              <span className="font-semibold">
                {travel.category.name}
              </span>
              <span className="ml-2 font-mono text-slate-400">
                {travel.category._id}
              </span>
            </div>
          )}

        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-900/80 line-clamp-1">
          {travel.title}
        </div>

        <div className="mt-1 text-[11px] text-slate-500">
          {travel.duration}
        </div>
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

export default function HomeTravelShowcase({
  travels,
}: {
  travels: Travel[];
}) {
  const special = travels.filter((t) => t.isSpecial);
  const day = travels.filter((t) => !t.isSpecial && isDayTour(t));
  const discovery = travels.filter(
    (t) => !t.isSpecial && !isDayTour(t)
  ).slice(0, 3);

  const specialPrimary = special[0];
  const specialRest = special.slice(1, 6);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
      {/* ---------------- DISCOVERY ---------------- */}
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
          Discovery tours
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {discovery.map((t) => (
            <motion.div key={t._id} variants={itemVariants}>
              <TravelCard
                travel={t}
                size="small"
                showCategory
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ---------------- SPECIAL ---------------- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="pt-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-sm font-semibold text-slate-900"
        >
          Special tours
        </motion.h2>

        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {specialPrimary && (
            <motion.div variants={itemVariants}>
              <TravelCard
                travel={specialPrimary}
                size="wide"
              />
            </motion.div>
          )}

          {specialRest.map((t) => (
            <motion.div key={t._id} variants={itemVariants}>
              <TravelCard travel={t} size="small" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------------- DAY TOURS ---------------- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="pt-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-sm font-semibold text-slate-900"
        >
          Day tours
        </motion.h2>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {day.slice(0, 6).map((t) => (
            <motion.div key={t._id} variants={itemVariants}>
              <TravelCard travel={t} size="small" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <div className="mt-10">
        <Link
          href="/travel"
          className="inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
        >
          View all tours
        </Link>
      </div>
    </div>
  );
}
