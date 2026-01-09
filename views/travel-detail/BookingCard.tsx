"use client";
import React from "react";
import IMGURL from "@/utils/constant";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, DollarSign, BookOpen } from "lucide-react";

interface BookingCardProps {
  image: string;
  title: string;
  price: string | number;
  description: string;
  pax: PaxItem;
}
interface PaxItem {
  title: string;
  price: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  image,
  title,
  price,
  description,
  pax,
}) => {
  const router = useRouter();

  const handleBook = () => {
    router.push("/book");
  };

  const t = useTranslations("HomePage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-20 md:mt-24 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        {/* Image Section */}
        <div className="col-span-1 md:col-span-1 overflow-hidden h-80 md:h-auto">
          {image && (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={`${IMGURL}/${image}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between p-6 md:p-8">
          {/* Title & Description */}
          <div className="space-y-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {title}
            </h2>
            <p
              className="text-slate-600 text-sm md:text-base line-clamp-2"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>

          {/* Price & Pax Info */}
          <div className="space-y-5">
            {/* Main Price */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-white">
              <DollarSign className="w-6 h-6 text-amber-600" />
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wide font-semibold">
                  {"Price"}
                </p>
                <p className="text-2xl font-bold text-slate-900">{price}</p>
              </div>
            </div>

            {/* Pax Table */}
            {Array.isArray(pax) && pax.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                  <Users className="w-4 h-4 text-amber-600" />
                  {"Per Person Pricing"}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                  {pax.map((paxItem, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ translateX: 4 }}
                      className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-amber-300 transition"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {paxItem.title}
                      </span>
                      <span className="text-base font-bold text-amber-600">
                        ${paxItem.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Button */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 24px rgba(217, 119, 6, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBook}
              className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <BookOpen className="w-5 h-5" />
              {t("book") || "Book Now"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
