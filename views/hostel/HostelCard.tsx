import React from "react";
import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation"; // Correct import for @navigation

interface HostelCardProps {
  _id: string; 
  photo: string;
  name: string;
  description: string;
  information: string;
  location: string;
  rating: number;
}

const HostelCard: React.FC<HostelCardProps> = ({
  _id,
  photo,
  name,
  description,
  information,
  location,
  rating,
}) => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleSlideClick = (_id: string) => {
    router.push(`/accommodation/hostel/${_id}`);
  };

  return (
    <div
      onClick={() => handleSlideClick(_id)}
      className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out w-full cursor-pointer hover:shadow-xl bg-white bg-cover"
    >
      {/* Image Section */}
      <img
        src={photo}
        alt={name}
        className="w-full sm:w-[50%] h-96 object-cover transition duration-300 ease-in-out transform hover:scale-105"
      />

      {/* Content Section */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-lg">
            {name}
          </span>
          <div className="flex items-center text-gray-400">
            <FaStar className="text-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating} / 5</span>
          </div>
        </div>

      
        <div className="mt-4 flex-grow text-justify">
          <p className="text-gray-700 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
