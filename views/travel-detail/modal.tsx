"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface TravelBookingProps {
  isOpen: boolean;
  onClose: () => void;  
}

const TravelBooking: React.FC<TravelBookingProps> = ({ isOpen, onClose }) => {
    const t = useTranslations("HomePage");
  const { id } = useParams(); 
  const [travel, setTravel] = useState<{ title: string; cover: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",   
    guestNumber: 1,  
    pickUp: "no",
    content: "",
  });  
 
  useEffect(() => { 
    if (id) {
      fetch(`https://shinely.tanuweb.cloud/api/v1/travel/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTravel({ title: data.title, cover: data.cover });
        })
        .catch((error) => console.error("Error fetching hotel data:", error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = { ...formData, travel: id };

    try {
      const response = await fetch("https://shinely.tanuweb.cloud/api/v1/travelbooking/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking successful!");
        onClose();
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">✖</button>
      <h2 className="text-xl font-bold mb-4">{t('bookingForm')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex items-center justify-between space-x-4">
          <div className="w-full">
            <span>{t('fullName')}</span>
            <input type="text" name="name" placeholder={t('fullName')} className="border p-2 rounded w-full mb-2" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="w-full">
            <span>{t('email')}</span>
            <input type="email" name="email" placeholder={t('email')} className="border p-2 rounded w-full mb-2" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="w-full">
            <span>{t('phone')}</span>
            <input type="tel" name="phone" placeholder={t('phone')} className="border p-2 rounded w-full mb-2" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="w-full flex items-center justify-between space-x-4">
          <div className="w-full">
            <span>{t('checkinDate')}</span>
            <input type="date" name="startDate" className="border p-2 rounded w-full mb-2" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className="w-full">
            <span>{t('checkoutDate')}</span>
            <input type="date" name="endDate" className="border p-2 rounded w-full mb-2" value={formData.endDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="w-full flex items-center justify-between space-x-4">
          <div className="w-full">
            <span>{t('guestNumber')}</span>
            <input type="number" name="guestNumber" min="1" className="border p-2 rounded w-full mb-2" value={formData.guestNumber} onChange={handleChange} required />
          </div>
          <div className="w-full">
            <span>{t('needPickup')}</span>
            <select name="pickUp" className="border p-2 rounded w-full mb-2" value={formData.pickUp} onChange={handleChange} required>
              <option value="airport">{t('airport')}</option>
              <option value="train">{t('trainStation')}</option>
              <option value="bus">{t('busStation')}</option>
              <option value="no">{t('no')}</option>
            </select>
          </div>
        </div>
        <span>{t('additionalRequests')}</span>
        <textarea name="content" className="border p-2 pb-12 rounded w-full mb-2" rows={3} placeholder={t('additionalRequests')} value={formData.content} onChange={handleChange} />
        <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 w-full">{t('submitBooking')}</button>
      </form>
    </div>
  </div>

  );
};

export default TravelBooking;
