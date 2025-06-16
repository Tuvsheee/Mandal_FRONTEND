"use client";
import React from "react";
import IMGURL from "@/utils/constant";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

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
    <div className="flex flex-col md:flex-row gap-4 border-b py-6 w-full mt-24 space-x-2">
      <div className="w-1/2">
        <img
          src={`${IMGURL}/${image}`}
          alt={title}
          className="object-cover w-full h-64"
        />
      </div>
      <div className="w-[2px] min-h-[16rem] bg-[#c59a3b] py-4"></div>

      {/* Right: Content */}
      <div className="md:w-1/2 w-full flex flex-col justify-between">
        {/* Region and date */}
        <div className="flex justify-between text-sm font-semibold text-neutral-700 uppercase tracking-wide"></div>

        {/* Title */}
        <h2 className="text-xl font-bold mt-1">{title}</h2>

        {/* Price */}
        <p className="text-lg text-[#c59a3b] font-semibold mt-1">{price}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 my-2">
            <thead>
              <tr className="bg-gray-200">
                {Array.isArray(pax) &&
                  pax.map((paxItem, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 border border-gray-300"
                    >
                      {paxItem.title}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Array.isArray(pax) &&
                  pax.map((paxItem, index) => (
                    <td
                      key={index}
                      className="px-4 py-2 border border-gray-300 text-center "
                    >
                      {paxItem.price}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={handleBook}
          className="mt-4 w-max bg-[#c59a3b] hover:bg-yellow-700 text-white font-semibold px-4 py-2 "
        >
          {t("book")}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
