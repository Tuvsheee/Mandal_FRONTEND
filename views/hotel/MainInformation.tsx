"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Hotel } from "@/types/hotel";
import HotelBooking from "./modal";


interface Table {
  winterPrice: string;
  summerPrice: string;
  type: string;
}

interface Props {
  hotel: Hotel;
}

const MainInformation = ({ hotel }: Props) => {
  const t = useTranslations("HomePage");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  return (
    <div className="w-full flex md:flex-row flex-col-reverse md:mt-[5vh] relative">
      <div className="md:max-w-[100%] w-full flex flex-col">
        <div className="w-full border border-t-black px-6 ">
          <div className="w-full my-2">
            <div>
              <p  className="text-xl  font-bold">{hotel.name}</p>
            </div>
            <p>
              {hotel.description}
            </p>
          </div>
          <div className="w-full flex flex-col">
          {hotel?.table && (
          <div className="w-full ">
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-semibold p-3">Room Type</th>
                  <th className="text-center font-semibold p-3">
                    Winter price
                    <br />
                    <span className="text-sm font-normal">
                      (Oct, Nov, Dec, Jan, Feb, Mar, Apr)
                    </span>
                  </th>
                  <th className="text-center font-semibold p-3">
                    Summer Price
                    <br />
                    <span className="text-sm font-normal">
                      (May, Jun, Jul, Aug, Sep)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {hotel.table.map((table: Table, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-left">{table.type}</td>
                    <td className="p-3 text-center font-semibold">{table.winterPrice}</td>
                    <td className="p-3 text-center font-semibold">{table.summerPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
            <button 
              onClick={() => setIsModalOpen(true)} // Open Modal
              className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 uppercase"
            >
              Make a reservation
            </button>
            </div>
          </div>
        )}

          </div>

          <div className="w-full mt-4">
            <div
              className="max-w-full w-[100%] md:w-[100%] h-[450px] rounded-lg border-2 border-gray-300"
              dangerouslySetInnerHTML={{
                __html: hotel.location.replace('width="600"', 'width="100%"'),
              }}
            />
          </div>
        </div>
      </div>
        {/* Render Modal */}
        <HotelBooking isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainInformation;
