"use client";
import { Link } from "@/navigation";
import axiosInstance from "@/utils/axios";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface AdditionalData {
  address: string;
  email: string;
  company: string;
  phone1: string;
  phone2: string;
  facebook: string;
  instagram: string;
  youtube:string;
  kakao:string;
}

const Footer: React.FC = () => {
  const t = useTranslations("HomePage");
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditionalData(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);

  return (
    <footer className="bg-[#f6f6f6] text-[#1b1b1b] text-sm mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-300 pb-6">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">{additionalData?.company || "Mandal Travel"}</h2>
            <p className="text-sm text-gray-600">A place where nature and adventure unite</p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-md font-semibold mb-2">Travels</h3>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:underline">Authentic Mongolia Travel</Link></li>
              <li><Link href="/tips" className="hover:underline">Discover Korea Travel</Link></li>
            
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-md font-semibold mb-2">Pages</h3>
            <ul className="space-y-1">
              <li><Link href="/contact" className="hover:underline">About Mandal</Link></li>
              <li><Link href="/contact" className="hover:underline">Transport</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-md font-semibold mb-2">Contact us</h3>
            <ul className="space-y-1">
              <li><Link href="/terms" className="hover:underline"> Email: {additionalData?.email}</Link></li>
              <li><Link href="/safety" className="hover:underline">Phone: {additionalData?.phone1}</Link></li>
              <li><Link href="/safety" className="hover:underline">Phone: {additionalData?.phone2}</Link></li>
          
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm">
          <p className="text-gray-600 mb-4 md:mb-0">
            {additionalData?.address || "Jinstod travel Mongolia 17 khoroo 65 bair 24 toot"}
          </p>
          <div className="flex space-x-4">
            <a href={additionalData?.youtube || "#"} target="_blank" rel="noopener noreferrer">
              <img src="/icons/youtube_dark.svg" alt="" className="w-10 h-10" />
           
            </a>
            <a href={additionalData?.facebook || "#"} target="_blank" rel="noopener noreferrer">
            <img src="/icons/facebook_dark.svg" alt="" className="w-10 h-10" />
            </a>
            <a href={additionalData?.instagram || "#"} target="_blank" rel="noopener noreferrer">
            <img src="/icons/instagram_dark.svg" alt="" className="w-10 h-10" />
            </a>
            <a href={additionalData?.kakao || "#"} target="_blank" rel="noopener noreferrer">
            <img src="/icons/kakao_dark.svg" alt="" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
