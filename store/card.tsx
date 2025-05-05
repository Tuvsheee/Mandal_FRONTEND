"use client";
import { Card } from "@/types/Card";
import { create } from "zustand";

interface CardState {
  cards: Card[];
  fetchCard: () => Promise<void>;
  fetchSingleCard: (id: string) => Promise<Card | null>; // Changed to handle possible null returns
}

const useCardStore = create<CardState>((set) => ({
  cards: [],
  fetchCard: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/footer`);
      if (!res.ok) {
        throw new Error("Failed to fetch hotel data");
      }
      const response = await res.json();
      set({ cards: response.data || [] });
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  },
  fetchSingleCard: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/footer/${id}`
      );
      if (!res.ok) {
        console.error(`Error ${res.status}: ${res.statusText}`); // Log status code and status text
        throw new Error(`Failed to fetch hotel with id: ${id}`);
      }
      const response = await res.json();
      return response?.data?.data || null;
    } catch (error) {
      console.error("Error fetching single hotel data:", error);
      return null;
    }
  },
}));

export default useCardStore;
