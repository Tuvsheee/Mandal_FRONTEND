"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { useRouter } from "next/navigation"; // Updated import
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslations } from "next-intl";
import axios from "axios";

interface AdditionalData {
  address: string;
  email: string;
  company: string;
  phone: string;
  facebook: string;
  instagram: string;
}

const Footer: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(null);
  useEffect(() => {
    axios
      .get("https://shinely.tanuweb.cloud/api/v1/additional/")
      .then((res) => setAdditionalData(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);
  return (
    <footer className="bg-[#1b1b1b] text-white text-sm pt-8 mt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between mt-4 space-y-4 lg:space-y-0 w-full">
          <div className="flex flex-col space-y-4 w-full">
            <div className="text-lg font-semibold">{additionalData?.company || "Company Name"}</div>
            <p>
              {t("address")}: {additionalData?.address || "Company address"}
            </p>
            <div className="flex items-center  space-x-4 text-white">
              <a
                href={additionalData?.facebook || "#"} 
                target="_blank"
                rel="noopener noreferrer" 
                className="border border-gray-400 p-2 rounded-full hover:text-yellow-300"
              >
                <FaFacebookF />
              </a>
              <a
                href={additionalData?.instagram || "#"} 
                target="_blank"
                rel="noopener noreferrer" 
                className="border border-gray-400 p-2 rounded-full hover:text-yellow-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className=" text-left space-y-4 border-l border-gray-400 px-4 w-full">
            <div className="text-lg font-semibold">{t("pages")}</div>   
              <div className="flex flex-col space-y-4">
                <Link href={"/travel"} className="hover:underline">
                  {t("travels")}
                </Link>
                <Link href={"/tips"} className="hover:underline">
                  {t("tourTips")}
                </Link>
                <Link href={"/about"} className="hover:underline">
                  {t("aboutUs")}
                </Link>
              </div>
              
            
          </div>
 
          <div className="text-left space-y-4 border-l border-gray-400 px-4 w-full">
            <div className="text-lg font-semibold">{t("customerService") }</div>
            <div>
              <p>
                {t("advice")}: <strong>{additionalData?.phone || "Company phone"}</strong>
              </p>
            </div>
            <div className="mt-4">
              <p>
                {t("email")}:{" "}
                <strong  className="text-yellow-400 underline">
                  {additionalData?.email || "Company email"}
                </strong>
              </p>
            </div>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row justify-between items-center mt-8 border-t border-gray-300 py-4 text-center lg:text-left">
          <p>{t('copyright') }</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
