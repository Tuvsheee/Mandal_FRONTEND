"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import useAdditionalStore from "@/store/addtional";
import axiosInstance from "@/utils/axios";

export default function CustomTravelPage() {
  const t = useTranslations("HomePage");
  
  const [formData, setFormData] = useState({
    title: "Ноён.",
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    phone: "",
    content: "",
    adultNumber: 0,
    kidsNumber: 0,
    people: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axiosInstance.post("/booking", formData);
      setSuccess(true);
    } catch (err) {
      setError("Form submission failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const { data, fetchData } = useAdditionalStore();

  useEffect(() => {
    fetchData();
  }, []);
  if (!data) return <p>Loading...</p>; 


  const info = data; // safely access the first entry

  return (
    <div className="max-w-6xl mx-auto md:my-24 my-10 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* FORM SECTION */}
        <div className="w-full">
          <h3 className="text-lg font-bold uppercase text-[#1a1a1a] border-b border-[#c59a3b] pb-2 mb-6">
            {t("whereWouldYouLikeToTravel") || "Where would you like"}
          </h3>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm mb-2">
              {t("formSuccessMessage") || "Your request was sent successfully!"}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-700"
            >
              <option value="Ноён.">{t("mr") || "Mr."}</option>
              <option value="Хатагтай.">{t("ms") || "Ms."}</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder={t("yourName") || "Your Name"}
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder={t("yourEmail") || "Your Email"}
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <input
              type="text"
              name="people"
              placeholder={t("subject") || "Subject"}
              value={formData.people}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <textarea
              name="content"
              placeholder={t("yourLetter") || "Message"}
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded min-h-[120px]"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#c59a3b] hover:bg-yellow-700 text-white font-semibold py-2 px-4 w-full rounded"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>

        {/* CONTACT SECTION */}
        <div className="text-sm text-gray-800 leading-relaxed space-y-6">
          <div>
            <h4 className="text-base font-semibold border-b pb-1 mb-2">About us</h4>
            <p>{info?.description1 || "No description available."}</p>
          </div>

          <div>
            <h4 className="text-base font-semibold border-b pb-1 mb-2">Contact us</h4>
            {info?.phone && (
              <>
                <p>Tel: {info.phone}</p>
                <p>Tel: {info.phone}</p>
              </>
            )}
            {info?.email && (
              <p>
                Email:{" "}
                <a href={`mailto:${info.email}`} className="text-[#c59a3b]">
                  {info.email}
                </a>
              </p>
            )}
            {info?.address && <p>Address: {info.address}</p>}
            {info?.whatsapp && <p>WhatsApp: {info.whatsapp}</p>}
            {info?.facebook && (
              <p>
                Facebook:{" "}
                <a href={info.facebook} className="text-[#c59a3b]">
                  {info.facebook}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
