import { Hostel } from "@/types/hostel";
import { create } from "zustand";

interface HostelState {
  hostel: Hostel[];
  fetchData: () => Promise<void>;
  fetchSingleData: (id: string) => Promise<Hostel>;
} 
 
const useHostelStore = create<HostelState>((set) => ({
    hostel: [],
  fetchData: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/hostel`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ hostel: response.data });
    } catch (error) {
      console.error("Error fetching hostel data:", error);
    }
  }, 
  fetchSingleData: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/hostel/${id}`
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

export default useHostelStore;
