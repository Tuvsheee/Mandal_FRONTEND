import { Travel } from "@/types/travel";
import { create } from "zustand";

interface TravelState {
  travels: Travel[];
  fetchTravel: () => Promise<void>;
  fetchSingleTravel: (id: string) => Promise<Travel>;
} 

const useTravelStore = create<TravelState>((set) => ({
  travels: [],
  fetchTravel: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/travel/`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ travels: response.data });
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  }, 
  fetchSingleTravel: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/travel/${id}`
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

export default useTravelStore;
