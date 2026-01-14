"use client";

import { showNotif } from "@/components/Layout/Alert";
import { Link } from "@/navigation";
import { Additional } from "@/types/additional";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Send, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [additional, setAdditional] = useState<Additional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  /* ------------------ FETCH DATA ------------------ */
  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditional(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  /* ------------------ SCROLL EFFECT ------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------ LOCK SCROLL WHEN MENU OPEN ------------------ */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  /* ------------------ FORM HANDLERS ------------------ */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/feedback", formData);
      showNotif("Хүсэлт амжилттай илгээгдлээ!", "success");
      setIsModalOpen(false);
      setFormData({ name: "", email: "", phone: "", content: "" });
    } catch {
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
      showNotif("Алдаа гарлаа!", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ NAV ITEMS ------------------ */
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Tours", href: "/tours/outbound" },
    { label: "Destination", href: "/tours/inbound?type=destination" },
    { label: "FAQ", href: "/tours/inbound?type=faq" },
    { label: "Contact", href: "/tours/inbound?type=contact" },
    { label: "Booking", href: "/tours/inbound?type=booking" },
    { label: "Blog", href: "/tours/inbound?type=blog" },
  ];

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header
        className={`hidden md:block fixed top-0 left-0 w-full z-50 transition ${
          scrolled
            ? "bg-[#0f1d13] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            : "bg-[#0f1d13]"
        } border-b border-white/10`}
      >
        <div className="flex justify-between items-center px-12 py-4 text-white">
          <Link href="/">
            <img
              src={`${IMGURL}/${additional?.logo || "default-logo.png"}`}
              className="h-12 object-contain"
              alt="Logo"
            />
          </Link>

          <nav className="flex gap-10 text-xs font-semibold tracking-wide">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden bg-[#0f1d13] border-b border-white/10 text-white fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center px-4 py-3">
          <Link href="/">
            <img
              src={`${IMGURL}/${additional?.logo || ""}`}
              className="h-10 object-contain"
              alt="Logo"
            />
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute top-full left-0 w-full bg-[#0f1d13] flex flex-col px-6 pt-10 space-y-6"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-white/80 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("yourName")}
                  className="w-full p-3 border rounded text-black"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("yourPhone")}
                  className="w-full p-3 border rounded text-black"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("yourEmail")}
                  className="w-full p-3 border rounded text-black"
                  required
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder={t("yourContent")}
                  className="w-full p-3 border rounded text-black"
                  rows={4}
                />
                {error && <p className="text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F04748] text-white py-3 rounded flex justify-center items-center gap-2"
                >
                  {loading ? "Sending..." : t("send")}
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
