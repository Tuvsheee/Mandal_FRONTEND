"use client";
import React from "react";
import IMGURL from "@/utils/constant";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

interface BookingCardProps {
  image: string;
  region: string;
  date: string;
  title: string;
  price: string | number;
  description: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  image,
  region,
  date,
  title,
  price,
  description,

}) => {
    const router = useRouter();

    const handleBook = () => {
        router.push("/book");
    };

    const t = useTranslations("HomePage");
  
    return ( 
        <div className="flex flex-col md:flex-row gap-4 border-b py-6 w-full mt-2 space-x-2">
    
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
                <div className="flex justify-between text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                <span>{region}</span>
                <span className="text-neutral-400">{date}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mt-1">{title}</h2>

                {/* Price */}
                <p className="text-lg text-[#c59a3b] font-semibold mt-1">${price}</p>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2">{description}</p>

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
