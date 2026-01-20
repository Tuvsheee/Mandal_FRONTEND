"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useAdditionalStore from "@/store/addtional";
import axiosInstance from "@/utils/axios";
import { MapPin, Phone, Mail } from "lucide-react";

export default function CustomTravelPage() {
  const t = useTranslations("HomePage");
  const { data, fetchData } = useAdditionalStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;
  const info = data;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/feedback", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", content: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT FORM */}
        <div className="bg-[#f1f1f1] rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded bg-white min-h-[200px]"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#0f2a1d] text-white py-1 rounded-xs rounded-lg font-semibold"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {success && (
              <p className="text-green-600 text-sm">
                Message sent successfully
              </p>
            )}
          </form>
        </div>

        {/* RIGHT CONTACT */}
        <div className="space-y-5">
          {/* MAP */}
          <div className="rounded-xl overflow-hidden h-[260px]">
            <iframe
              src="https://www.google.com/maps?q=Mandal%20Tours%20Mongolia&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* ADDRESS */}
          <div className="bg-[#f1f1f1] rounded-xl p-4 flex gap-3">
            <MapPin className="text-gray-700 mt-1" />
            <p className="text-sm">
              Tuul gol street Dul building, 97/36, HUD - 19 khoroo, Ulaanbaatar
              17042, Mongolia
            </p>
          </div>

          {/* PHONE */}
          <div className="bg-[#f1f1f1] rounded-xl p-4 flex gap-3 items-center">
            <Phone className="text-gray-700" />
            <p className="text-sm">{info.phone1}</p>
          </div>

          {/* EMAIL */}
          <div className="bg-[#f1f1f1] rounded-xl p-4 flex gap-3 items-center">
            <Mail className="text-gray-700" />
            <a
              href={`mailto:${info.email}`}
              className="text-sm hover:underline"
            >
              {info.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
