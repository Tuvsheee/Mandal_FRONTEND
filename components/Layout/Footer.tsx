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
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT TEXT */}
          <div className="text-md text-white">Member of..</div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-14 mr-16 cursor-pointer">
            {/* Custom Icon (like knot logo in image) */}
            {additional?.mto && (
              <Link href={additional.mto} target="_blank">
                <img
                  src="/icons/mn.avif"
                  alt=""
                  className="h-16 w-16 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Tripadvisor */}
            {additional?.trpadvisor && (
              <Link href={additional.trpadvisor} target="_blank">
                <img
                  src="/icons/trpadvisor.avif"
                  alt="Tripadvisor"
                  className="h-20 w-20 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Facebook */}
            {additional?.facebook && (
              <Link
                href={additional.facebook}
                target="_blank"
                className="hover:scale-105 transition"
              >
                <img
                  src="/icons/fb.avif"
                  alt="Tripadvisor"
                  className="h-12 w-12 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Instagram */}
            {additional?.instagram && (
              <Link
                href={additional.instagram}
                target="_blank"
                className="hover:scale-105 transition"
              >
                <img
                  src="/icons/inst.avif"
                  alt="Tripadvisor"
                  className="h-12 w-12 hover:scale-105 transition"
                />
              </Link>
            )}

            {/* Youtube */}
            {additional?.youtube && (
              <Link
                href={additional.youtube}
                target="_blank"
                className="hover:scale-105 transition"
              >
                <Youtube size={22} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
