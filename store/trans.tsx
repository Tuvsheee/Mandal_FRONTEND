"use client";
import { Trans } from "@/types/trans";
import { create } from "zustand";

interface TransState {
  trans: Trans[];
  fetchTrans: () => Promise<void>;
  fetchSingleTrans: (id: string) => Promise<Trans>; // Changed to handle possible null returns
}    
const useTransStore = create<TransState>((set) => ({
    trans: [],
  fetchTrans: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/transport`);
      if (!res.ok) {
        throw new Error("Failed to fetch Trans data");
      }
      const response = await res.json();
      set({ trans: response.data || [] });
    } catch (error) {
      console.error("Error fetching Trans data:", error);
    }
  },
  fetchSingleTrans: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/transport/${id}`
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

export default useTransStore;
