"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";


interface HotelBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const HotelBooking: React.FC<HotelBookingProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("HomePage");
  const { id } = useParams(); 
  const [hotel, setHotel] = useState<{ name: string; photo: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",   
    guestNumber: 1, 
    roomType: "single", 
    pickUp: "no",
    content: "",
  });  
 
  useEffect(() => {
    if (id) {
      fetch(`https://shinely.tanuweb.cloud/api/v1/hotel/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setHotel({ name: data.name, photo: data.photo });
        })
        .catch((error) => console.error("Error fetching hotel data:", error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = { ...formData, hotel: id };

    try {
      const response = await fetch("https://shinely.tanuweb.cloud/api/v1/hotelbooking/", {
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
        <h2 className="text-xl font-bold mb-4">Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex items-center justify-between space-x-4">
            <div className="w-full">
                  <span>Fullname</span>
                  <input type="text" name="name" placeholder="Full Name" className="border p-2 rounded w-full mb-2" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="w-full">
                  <span>Email</span>
                  <input type="email" name="email" placeholder="Email" className="border p-2 rounded w-full mb-2" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="w-full">
                  <span>Phone</span>
                  <input type="tel" name="phone" placeholder="Phone" className="border p-2 rounded w-full mb-2" value={formData.phone} onChange={handleChange} required />
              </div>
          </div>
          
          <div className="w-full flex items-center justify-between space-x-4">
            <div className="w-full">
              <span>Check-in Date </span>
              <input type="date" name="startDate" className="border p-2 rounded w-full mb-2" value={formData.startDate} onChange={handleChange} required />
            </div>
              <div className="w-full">
                  <span>Check-out Date</span>
                  <input type="date" name="endDate" className="border p-2 rounded w-full mb-2" value={formData.endDate} onChange={handleChange} required />
              </div>
          </div>

          <div className="w-full flex items-center justify-between space-x-4">
            <div className="w-full">
              <span>Number of Guests</span>
              <input type="number" name="guestNumber" min="1" className="border p-2 rounded w-full mb-2" value={formData.guestNumber} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <span>Room Type</span>
              <select name="roomType" className="border p-2 rounded w-full mb-2" value={formData.roomType} onChange={handleChange} required>
                  <option value="single">Standart Single</option>
                  <option value="double">StandDart Twin/double</option>
              </select>
            </div>
          </div>
            <div className="w-full">
              <span>Need Pickup?</span>
              <select name="pickUp" className="border p-2 rounded w-full mb-2" value={formData.pickUp} onChange={handleChange} required>
                  <option value="airport">Airport</option>
                  <option value="train">Train Station</option>
                  <option value="bus">Bus Station</option>
                  <option value="no">No</option>
              </select>
            </div>
            <div>
                <span>Anything else we can do?</span>
                <textarea name="content" className="border p-2 pb-12 rounded w-full mb-2" rows={3} placeholder="Additional requests" value={formData.content} onChange={handleChange} />
                <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 w-full">Submit Booking</button>
            </div>
        </form>
      </div>
    </div>

  );
};

export default HotelBooking;
