import { Travel } from "@/types/travel";
import { FaPhone ,FaMailBulk } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Additional } from "@/types/additional";
import TravelBooking from "./modal";

interface Props {
  travel?: Travel;
}
interface PaxItem {
  title: string;
  price: string;
}

interface AdditionalData {
  address: string;
  email: string;
  company: string;
  phone: string;
  instagram: string;
  facebook: string;         
  youtube: string;
  viber: string;
  whatsapp: string;
}     

const RightSideInformation = ({ travel }: Props) => {
  const t = useTranslations("HomePage");
  const [pax, setPax] = useState<PaxItem[]>([]);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additional, setAdditional] = useState<Additional | null>(null);
 


  useEffect(() => {
    axios
      .get("https://shinely.tanuweb.cloud/api/v1/additional/")
      .then((res) => setAdditionalData(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);




  return (
    <>
   
    <div className="w-full  flex flex-col border-black text-sm">
      <div className="w-full flex flex-col p-4 ">
        <div className="w-full flex items-center justify-between ">
          <span>{t("per_person")}</span>{" "}
          <span className="text-[#555555]">{travel?.price}</span>
        </div>
      </div>
      <hr />  

      <div className="w-full flex flex-col p-4 ">
        <div className="w-full flex items-center justify-between mb-2">
          <span>{t("discount")}:</span> <span className="text-[#555555]">{travel?.sale}%</span>
        </div>{" "}
      </div>
      <hr />
      <div className="w-full flex flex-col p-4 ">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 my-2">
            <thead>
              <tr className="bg-gray-200">
                {Array.isArray(travel?.pax) &&
                  travel.pax.map((paxItem: PaxItem, index: number) => (
                    <th key={index} className="px-4 py-2 border border-gray-300">
                      {paxItem.title}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Array.isArray(travel?.pax) &&
                  travel?.pax!.map((paxItem: PaxItem, index: number) => (
                    <td key={index} className="px-4 py-2 border border-gray-300 text-center">
                      {paxItem.price}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#000] w-full flex items-center text-white justify-center py-4 font-semibold cursor-pointer hover:bg-opacity-80"
          >
            {t("BOOK_NOW")}
          </button>
        </div>

        <div className="mt-2" />
          <button
            className="bg-[#FEC72D] w-full flex items-center justify-center py-4 font-semibold cursor-pointer hover:bg-opacity-80"
          >
             <div className="flex items-center">
              <FaPhone className="" />
              <p className="mx-2">
                {additionalData?.phone || "Company Name"}
              </p>
            </div>
          </button>    
        </div> 

        <TravelBooking isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>   
    

    </>
  );
};

export default RightSideInformation;
