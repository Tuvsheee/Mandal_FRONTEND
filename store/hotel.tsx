"use client";
import { Hotel } from "@/types/hotel";
import { create } from "zustand";

interface HotelState {
  hotels: Hotel[];
  fetchHotel: () => Promise<void>;
  fetchSingleHotel: (id: string) => Promise<Hotel>; // Changed to handle possible null returns
}    
const useHotelStore = create<HotelState>((set) => ({
  hotels: [],
  fetchHotel: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/hotel`);
      if (!res.ok) {
        throw new Error("Failed to fetch hotel data");
      }
      const response = await res.json();
      set({ hotels: response.data || [] });
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  },
  fetchSingleHotel: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/hotel/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching hostel data:", error);
    }
  },
}));

export default useHotelStore;
