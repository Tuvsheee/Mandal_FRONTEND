"use client";
import { showNotif } from "@/components/Layout/Alert";
import { Link } from "@/navigation";
import { Additional } from "@/types/additional";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Send, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const [additional, setAdditional] = useState<Additional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/additional")
      .then((res) => setAdditional(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Handle Modal open and close
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Toggle menu visibility for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/feedback", formData);

      const responseData = response.data.data;
      console.log("Server Response:", responseData);

      // If form submission is successful, set success state and close the modal
      console.log("Form submission successful:", responseData);
      setSuccess(true);
      showNotif("Хүсэлт амжилттай илгээгдлээ!", "success"); // Success notification
      handleModalClose();
    } catch (err) {
      if (err instanceof Error) {
        // Safely access the message property
      } else {
        setError("Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
      console.error(err);
      showNotif("Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Desktop Header */}
      <div
        className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f1d13] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            : "bg-[#0f1d13]"
        } border-b border-white/10 text-white`}
      >
        <div className="w-full flex justify-center">
          <div className="flex items-center justify-between  w-full px-24 py-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={`${IMGURL}/${additional?.logo || "default-logo.png"}`}
                className="h-12 w-auto object-contain"
                alt="Logo"
              />
            </Link>

            <nav className="flex items-center gap-10 text-sm font-semibold tracking-wide uppercase">
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/"
              >
                Home
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/about"
              >
                About us
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/tours/outbound"
              >
                Tours
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/tours/inbound"
              >
                Destination
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/faq"
              >
                FAQ
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/book"
              >
                Contact
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/book"
              >
                Booking
              </Link>
              <Link
                className="relative pb-1 transition hover:text-white"
                href="/blog"
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header with Hamburger Menu */}
      <div className="block md:hidden bg-[#0f1d13] border-b border-white/10 text-white">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link href="/">
            <img
              src={`${IMGURL}/${additional?.logo}`}
              className="h-10 object-contain"
              alt="Logo"
            />
          </Link>

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start overflow-hidden px-6 bg-[#0f1d13] text-white w-full py-4 space-y-4"
            >
              {/* Main navigation links */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/tours/inbound"
                  className="text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("travel_mongolia")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  href="/tours/outbound"
                  className="text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("travel_all")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/about"
                  className="text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("about_jinst")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href="/transport"
                  className="text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("transport")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/book"
                  className="text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("contact")}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && additional && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 md:mx-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#fff] p-6 sm:p-8 rounded-lg flex flex-col shadow-lg w-full max-w-lg sm:max-w-xl text-black mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-5">
                <h2 id="modal-title" className="text-lg sm:text-xl font-bold">
                  {additional?.company || "Company Name"}
                </h2>
                <button className="text-black " onClick={handleModalClose}>
                  <X />
                </button>
              </div>
              <div className="w-full">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("yourName")}
                      className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("yourPhone")}
                      className="w-full p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                      required
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("yourEmail")}
                      className="w-full p-3 border rounded-md  mb-4  focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                      required
                    />
                  </div>

                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder={t("yourContent")}
                    className="w-full p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                    rows={4}
                    required
                  ></textarea>
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-[#F04748] text-white w-full px-8 py-3 rounded-lg text-lg hover:bg-[#E63939] transition-all flex items-center justify-center ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      "Илгээж байна..."
                    ) : (
                      <>
                        {t("send")}
                        <Send className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
