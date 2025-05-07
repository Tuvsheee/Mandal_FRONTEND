"use client";
import React, { useEffect, useState } from "react";
import { Hostel } from "@/types/hostel"; // Import Hostel interface
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import HostelBooking from "./modal";

// Define the Room interface
interface Room {
  title: string;
  description: string;
  photos: string;
}

interface Props { 
  hostel: Hostel;
}

const MainInformation = ({ hostel }: Props) => {
    const locale = useLocale();
  const t = useTranslations("HomePage");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const getCurrencySymbol = () => {
    if (locale === "mn") return "₮";  
    if (locale === "en") return "$"; 
    if (locale === "ko") return "₩";  
    if (locale === "chn") return "Chinese ¥";  
    if (locale === "jp") return "Japanese ¥";  
    return "₩";  
  };

  return (
    <div className="w-full flex md:flex-row flex-col-reverse md:mt-[5vh] gap-4 relative">
      <div className="md:max-w-[100%] w-full flex flex-col">
        <div className="w-full border border-t-black p-6 ">
          <div className="flex flex-col w-full"> 
            <p className="text-xl  mb-2 font-bold">{hostel.name}</p>
            <span className="text-sm text-[#555555] mb-4">{hostel?.description}</span>
            <span className="text-sm text-[#555555]">{hostel?.information}</span>
          </div>
          <div className="w-full flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {hostel?.rooms?.map((room: Room, index: number) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Room Image */}
                <img 
                  src={`https://shinely.tanuweb.cloud/uploads/${room.photos}`} 
                  alt={room.title} 
                  className="h-[200px] w-full object-cover"
                />

                {/* Room Info */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{room.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{room.description}</p>

                  {/* Booking Button */}
                  <div className="mt-4">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-red-500 text-white px-6 py-2 rounded-md uppercase  font-semibold hover:bg-red-600 transition"
                    >
                      {t("BOOK_NOW")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className="w-full mt-4">
            <div
              className="max-w-full w-[100%] md:w-[100%] h-[450px] rounded-lg border-2 border-gray-300"
              dangerouslySetInnerHTML={{
                __html: hostel.location.replace('width="600"', 'width="100%"'),
              }}
            />
          </div>
        </div>
      </div> 

               <HostelBooking isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainInformation;
