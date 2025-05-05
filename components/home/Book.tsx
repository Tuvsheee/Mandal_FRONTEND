"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";

export default function CustomTravelPage() {
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
    people:""
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
      const response = await axios.post(
        "https://shinely.tanuweb.cloud/api/v1/booking",
        formData
      );

      const responseData = await response.data.data;
      console.log("Server Response:", responseData);

      console.log("Form submission successful:", responseData);
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Safely access the message property
      } else {
        setError("There was an issue submitting the form. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const t = useTranslations("HomePage");

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg my-8 mt-0">
      <h2 className="text-center text-2xl text-black font-bold mb-8">
        {t("whereWouldYouLikeToTravel")}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-center">{t("formSuccessMessage")}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Title, Name, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              {t("case")}
            </label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-400"
            >
              <option value="Ноён.">{t("mr")}</option>
              <option value="Хатагтай.">{t("ms")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              {t("name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder={t("yourName")}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder={t("yourEmail")}
            />
          </div>
        </div>

        {/* Row 2: Start Date, End Date, Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startDate" className="block font-medium mb-1">
              {t("dateOfTravelArrival")}
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium mb-1">
              {t("dateOfTravelReturn")}
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              {t("phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder={t("phone")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block font-medium mb-1">
            {t("letter")}
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows={4}
            placeholder={t("yourLetter")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="kidsNumber" className="block font-medium mb-1">
              {t("numberOfChildren")}
            </label>
            <input
              id="kidsNumber"
              name="kidsNumber"
              type="number"
              value={formData.kidsNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="adultNumber" className="block font-medium mb-1">
              {t("numberOfAdults")}
            </label>
            <input
              id="adultNumber"
              name="adultNumber"
              type="number"
              value={formData.adultNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            className="relative mt-auto rounded-b-xl h-12 w-full overflow-hidden border border-teal-600 text-black transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-teal-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-full hover:before:w-full hover:before:opacity-80"
            type="submit"
            disabled={loading}
          >
            <span className="relative z-10">
              {loading ? t("submitting") : t("sendRequest")}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}