"use client";

import { Link } from "@/navigation";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface AdditionalData {
  facebook: string;
  instagram: string;
  youtube: string;
  mto: string;
  trpadvisor: string;
}

const Footer = () => {
  const t = useTranslations("HomePage");
  const [additional, setAdditional] = useState<AdditionalData | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditional(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <footer className="bg-[#0f1d13] text-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col md:flex-row md:h-16 items-center md:justify-between gap-6 md:gap-0">
          {/* LEFT TEXT */}
          <div className="text-md text-white text-center md:text-left">
            Member of..
          </div>

          {/* RIGHT ICONS */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-14 md:mr-16 cursor-pointer">
            {/* MTO */}
            {additional?.mto && (
              <Link href={additional.mto} target="_blank">
                <img
                  src="/icons/mn.avif"
                  alt="MTO"
                  className="h-12 w-12 md:h-16 md:w-16 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Tripadvisor */}
            {additional?.trpadvisor && (
              <Link href={additional.trpadvisor} target="_blank">
                <img
                  src="/icons/trpadvisor.avif"
                  alt="Tripadvisor"
                  className="h-14 w-14 md:h-20 md:w-20 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Facebook */}
            {additional?.facebook && (
              <Link href={additional.facebook} target="_blank">
                <img
                  src="/icons/fb.avif"
                  alt="Facebook"
                  className="h-10 w-10 md:h-12 md:w-12 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Instagram */}
            {additional?.instagram && (
              <Link href={additional.instagram} target="_blank">
                <img
                  src="/icons/inst.avif"
                  alt="Instagram"
                  className="h-10 w-10 md:h-12 md:w-12 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Youtube */}
            {additional?.youtube && (
              <Link href={additional.youtube} target="_blank">
                <Youtube className="h-6 w-6 md:h-[22px] md:w-[22px] hover:scale-105 transition" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
