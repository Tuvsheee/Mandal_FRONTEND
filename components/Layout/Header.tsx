"use client";
import axios from "axios";
import { Link } from "@/navigation";
import React, { useEffect, useState } from "react";
import LocaleSwitcher from "../common/LocalSwitcher";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Additional } from "@/types/additional";
import { showNotif } from "@/components/Layout/Alert"; 
import {  X,  Send , Menu} from "lucide-react";
import axiosInstance from "@/utils/axios";
import IMGURL from "@/utils/constant";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      const response = await axiosInstance.post(
        "/feedback",
        formData
      );

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
        scrolled ? "bg-white shadow-md border-b border-gray-200" : "bg-white/60 backdrop-blur-md"
      }`}
    >

        <div className="w-full flex flex-col items-center ">
          {/* Main header content */}
          <div className="w-full flex justify-center">
            <div className="flex items-center justify-between  max-w-[1200px] w-full  px-4 md:px-6 flex-col md:flex-row">
              <div className="flex  items-center w-full md:w-auto">
                {/* Logo  asdad*/}
                <Link href="/">
                  <img
                    src={`${IMGURL}/${
                      additional?.logo || "default-logo.png"
                    }`}
                    className="h-20 w-full object-cover"
                    alt="Logo"
                  />
                </Link>
              </div>
              {/* Navigation links */}
              <div className="space-x-4 md:space-x-12 text-center md:text-left  md:mt-0">
                <Link href="/tours/inbound">{t("travel_mongolia")}</Link>
                <div
                  className="inline-block relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link href="/tours/outbound" className="cursor-pointer">
                    {t("travel_korea")}
                  </Link>
                </div>
                <Link href="/about">{t("about_jinst")}</Link>
                <Link href="/transport">{t("transport")}</Link>
                <Link href="/book" >{t("contact")}</Link>
              </div>
              {/* Locale switcher */}
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Mobile Header with Hamburger Menu */}
      <div className="block md:hidden bg-[#F3F3F3] border-b border-black">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link href="/">
            <img
              src={`https://shinely.tanuweb.cloud/uploads/${
                additional?.logo || "default-logo.png"
              }`}
              className="h-12 object-cover"
              alt="Logo"
            />
          </Link>
          <div className="">
              <LocaleSwitcher />
          </div>
          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="text-black">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col items-start px-6 bg-white text-black w-full py-4 space-y-4">
            {/* Main navigation links */}
            <Link href="/about" className="text-lg" onClick={() => setIsMenuOpen(false)}>
            {t("travel_mongolia")}
            </Link>
            <Link href="/tours" className="text-lg" onClick={() => setIsMenuOpen(false)}>
            {t("travel_korea")}
            </Link>
            <Link href="/transport" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              {t("about_jinst")}
            </Link>
            <Link href="/transport" className="text-lg" onClick={() => setIsMenuOpen(false)}>
              {t("transport")}
            </Link>

            <button className="text-lg" onClick={() => { handleModalOpen(); setIsMenuOpen(false); }}>
              {t("contact")}
            </button>
          </div>
        )}
      </div>


      {isModalOpen && additional && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 md:mx-auto "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-[#fff] p-6 sm:p-8 rounded-lg flex flex-col shadow-lg w-full max-w-lg sm:max-w-xl text-black mx-4">
          <div className="flex justify-between mb-5">
            <h2 id="modal-title" className="text-lg sm:text-xl font-bold">
              {additional?.company || "Company Name"}
            </h2>
            <button
              className="text-black "
              onClick={handleModalClose}
            >
              <X />
            </button>
          </div>
          <div className="w-full"> 
          <form
            onSubmit={handleSubmit}
            >
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
            >
            </textarea>
            {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={loading}
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
                </button>
            </form>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Header;
