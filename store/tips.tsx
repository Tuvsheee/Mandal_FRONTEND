import { Tips } from "@/types/tips";
import { Travel } from "@/types/travel";
import { create } from "zustand";

interface TipsState {
  tips: Tips[];
  fetchTips: () => Promise<void>;
  fetchSingleTips: (id: string) => Promise<Tips>;
} 

const useTipsStore = create<TipsState>((set) => ({
    tips: [],
    fetchTips: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/tip`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ tips: response.data });
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  }, 
  fetchSingleTips: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/tip/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  },
}));

export default useTipsStore;
