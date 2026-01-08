import { Travel } from "@/types/travel";
import axiosInstance from "@/utils/axios";
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
      const response = await axiosInstance.get(`/travel`);
      set({ travels : response.data.data});
      console.log("Fetched travels:", response.data.data);
    } catch (error) {
      console.error("Error fetching travel data:", error); 
    }
  }, 
  fetchSingleTravel: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/travel/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  },
}));

export default useTravelStore;
