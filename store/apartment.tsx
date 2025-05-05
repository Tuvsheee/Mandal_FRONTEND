import { Apartment } from "@/types/apartment";
import { Hostel } from "@/types/hostel";
import { create } from "zustand";

interface ApartmentState {
  apartment: Apartment[];
  fetchData: () => Promise<void>;
  fetchSingleData: (id: string) => Promise<Apartment>;
} 
 
const useApartmentStore = create<ApartmentState>((set) => ({
    apartment: [],
  fetchData: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/apartment`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ apartment: response.data });
    } catch (error) {
      console.error("Error fetching apartment data:", error);
    }
  }, 
  fetchSingleData: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/apartment/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching apartment data:", error);
    }
  },
}));

export default useApartmentStore;
