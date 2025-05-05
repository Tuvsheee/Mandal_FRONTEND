import React from "react";
import { FaStar, FaShareAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation"; // Correct import for @navigation

interface TravelCardProps {
  _id: string; 
  image: string;
  title: string;
  description: any;
  departurePeriod: string;
  price: string;
  rating: number;
  category: string;
  transportation?: string;
}

const TravelCard: React.FC<TravelCardProps> = ({
  _id,
  image,
  title,
  description,
  departurePeriod,
  price,
  rating,
  category,
  transportation,
}) => {
  const t = useTranslations("HomePage");

  const router = useRouter();
  const handleSlideClick = (_id: string) => {
    router.push(`/travels/${_id}`);
  };


  return (
    <div
    onClick={() => handleSlideClick(_id)}
      className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out w-full cursor-pointer hover:shadow-xl bg-white"
    >
      <img
        src={image}
        alt={title}
        className="w-full sm:w-64 h-56 object-cover transition duration-300 ease-in-out transform hover:scale-105"
      />
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-lg">
            {category}
          </span>
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="flex items-center">
              <FaStar className="text-yellow-500" />
              <span className="ml-1 text-sm font-medium">{rating} / 5</span>
            </div>
            
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">{title}</h3>
        <div
          className="text-base text-gray-700 bg-gray-100 p-2 rounded-lg mt-2 line-clamp-6"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600">
          <div className="space-y-1">
            <div>

              {departurePeriod}
            </div>
            <div className="flex items-center">
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <span className="text-[#355c7d] font-bold text-2xl">{price}</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
