"use client";
import { Link } from "@/navigation";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

interface AdditionalData {
  address: string;
  email: string;
  company: string;
  phone1: string;
  phone2: string;
  facebook: string;
  instagram: string;
  youtube: string;
  kakao: string;
  logo?: string;
}

const Footer: React.FC = () => {
  const t = useTranslations("HomePage");
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(
    null
  );

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditionalData(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);

  return (
    <footer className="bg-[#0f1d13] text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            {additionalData?.logo && (
              <img
                src={`${IMGURL}/${additionalData.logo}`}
                alt="Logo"
                className="h-10 w-auto object-contain mb-4"
              />
            )}
            <h2 className="text-lg font-semibold uppercase tracking-wide">
              {additionalData?.company || "Mandal Travel"}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Authentic travel experiences connecting you with the world's most
              captivating destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Tours
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/tours/outbound"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/inbound?type=destination"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  Destination
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/inbound?type=blog"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Pages */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/inbound?type=contact"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/inbound?type=faq"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/inbound?type=booking"
                  className="text-white/70 hover:text-white transition text-sm"
                >
                  Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Mail
                  size={16}
                  className="text-white/60 mt-0.5 flex-shrink-0"
                />
                <a
                  href={`mailto:${additionalData?.email}`}
                  className="text-white/70 hover:text-white transition break-all"
                >
                  {additionalData?.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone
                  size={16}
                  className="text-white/60 mt-0.5 flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  {additionalData?.phone1 && (
                    <a
                      href={`tel:${additionalData.phone1}`}
                      className="text-white/70 hover:text-white transition"
                    >
                      {additionalData.phone1}
                    </a>
                  )}
                  {additionalData?.phone2 && (
                    <a
                      href={`tel:${additionalData.phone2}`}
                      className="text-white/70 hover:text-white transition"
                    >
                      {additionalData.phone2}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin
                  size={16}
                  className="text-white/60 mt-0.5 flex-shrink-0"
                />
                <span className="text-white/70">
                  {additionalData?.address || "Mongolia"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()}{" "}
            {additionalData?.company || "Mandal Travel"}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {additionalData?.facebook && (
              <a
                href={additionalData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            )}
            {additionalData?.instagram && (
              <a
                href={additionalData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            )}
            {additionalData?.youtube && (
              <a
                href={additionalData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
