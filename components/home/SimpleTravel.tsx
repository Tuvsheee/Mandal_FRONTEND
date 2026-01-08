"use client";
import { Link } from "@/navigation";
import { Travel } from "@/types/travel";
import IMGURL from "@/utils/constant";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface Props {
  travels: Travel[];
  banner?: ReactNode;
}

const SimpleTravelGrid = ({ travels, banner }: Props) => {
  const t = useTranslations("HomePage");
  const specialTravels = travels;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <div className="w-full">
      {banner && <div className="mb-6 w-full max-w-7xl">{banner}</div>}

      <motion.div
        className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {specialTravels.map((list, index) => (
          <motion.div key={list._id} variants={cardVariants} custom={index}>
            <Link
              href={`/tours/${list._id}`}
              className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <motion.img
                  src={`${IMGURL}/${list.cover}`}
                  alt={list.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <motion.div
                  className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {list.duration}
                </motion.div>
              </div>

              <div className="flex flex-col gap-3 px-4 py-5">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {t("specialPricesTitle", { defaultMessage: "Featured" })}
                  </span>
                  <motion.span
                    className="text-base font-semibold text-slate-900"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {list.price}
                  </motion.span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold leading-tight text-slate-900 line-clamp-2">
                    {list.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{list.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center gap-2 text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {t("chooseTour") || "Flexible dates"}
                  </span>
                  <span className="transition duration-200 group-hover:translate-x-1">
                    {t("viewAllTravels", { defaultMessage: "View" })} →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/travel"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {t("viewAllTravels", { defaultMessage: "View all" })}
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SimpleTravelGrid;
