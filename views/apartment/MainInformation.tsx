"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Apartment } from "@/types/apartment";
import ServiceList from "./ServiceList";
import BookingModal from "./modal"; // Import modal

interface Props {
  apartment: Apartment;
}

const MainInformation = ({ apartment }: Props) => {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const getCurrencySymbol = () => {
    if (locale === "mn") return "₮";  
    if (locale === "en") return "$"; 
    if (locale === "ko") return "₩";  
    if (locale === "chn") return "Chinese ¥";  
    if (locale === "jp") return "Japanese ¥";  
    return "₩";  
  };
  
  return (
    <div className="w-full flex md:flex-row flex-col-reverse md:mt-[5vh] relative">
      <div className="md:max-w-[100%] w-full flex flex-col">
        <div className="w-full border border-t-black px-6 ">
          <div className="my-2 flex justify-between">
            <p className="text-xl  font-bold">{apartment.name}</p>
            <p className="text-sm">{apartment.type}</p>
          </div>
          <div className="w-full flex flex-col">
            <p>{apartment.description}</p>
            <div className="w-full ">
              <ServiceList services={apartment.services} />
              <div className="flex justify-center mt-6">
              <button 
              onClick={() => setIsModalOpen(true)} // Open Modal
              className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600"
            >
              Starting from {getCurrencySymbol()}{apartment.price}
            </button>
              </div>
            </div>
          </div>
    
          <div className="w-full my-4">
            <div
              className="max-w-full w-[100%] md:w-[100%] h-[450px] rounded-lg border-2 border-gray-300"
              dangerouslySetInnerHTML={{
                __html: apartment.location.replace('width="600"', 'width="100%"'),
              }}
            />
          </div>
        </div>
      </div>

         {/* Render Modal */}
         <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainInformation;
