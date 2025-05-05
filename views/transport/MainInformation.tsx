"use client";
import React, { useEffect, useState } from "react";
import { Trans } from "@/types/trans";
import TransBooking from "./modal";
import { useTranslations } from "next-intl";

interface Table {
  passenger: string;
  airPort: string;
  train: string;
  carType: string;  
}

interface Props {
  transport: Trans;
}
                 
const MainInformation = ({ transport }: Props) => {
  const t = useTranslations("HomePage");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  
  return (
    <div className="w-full flex md:flex-row flex-col-reverse md:mt-[5vh] relative h-full">
      <div className="md:max-w-[100%] w-full flex flex-col h-full">
        <div className="w-full border border-t-black px-6 h-full">  
          <div className="w-full h-full">
            <img src={`https://shinely.tanuweb.cloud/uploads/${transport.photo}`} alt="" className="w-full h-[64vh]" />
          </div>
          <div className="w-full flex flex-col">
            <p className="mt-2 text-xl font-bold">{transport.name}</p>
            <p className="mt-4">{transport.description}</p>
          </div>
          {transport?.table && (
          <div className="w-full h-full">
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-semibold p-3">Passenger</th>
                  <th className="text-center font-semibold p-3">
                    Airport
                  </th>
                  <th className="text-center font-semibold p-3">
                    Train Station
                  </th>
                  <th className="text-center font-semibold p-3">
                    Car type
                  </th>
                </tr>
              </thead>
              <tbody>
                {transport.table.map((table: Table, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-left">{table.passenger}</td>
                    <td className="p-3 text-center font-semibold">{table.airPort}</td>
                    <td className="p-3 text-center font-semibold">{table.train}</td>
                    <td className="p-3 text-center font-semibold">{table.carType}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center my-4">
            <button 
              onClick={() => setIsModalOpen(true)} // Open Modal
              className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 uppercase"
            >
              Book
            </button>
            </div>
          </div>
        )}
        </div>
      </div>  

         {/* Render Modal */}
         <TransBooking isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainInformation;
