import { Additional } from "@/types/additional";
import { Category } from "@/types/category";
import axiosInstance from "@/utils/axios";
import { create } from "zustand";

interface AdditionalState {
    data: Additional | null;
    loading: boolean;
    fetchData: () => Promise<void>;
  }
  
  const useAdditionalStore = create<AdditionalState>((set) => ({
    data: null,
    loading: false,
    fetchData: async () => {
      try {
        set({ loading: true });
        const response = await axiosInstance.get(`/additional`);
        set({ data: response.data.data, loading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        set({ loading: false });
      }
    },
  }));
  

export default useAdditionalStore;
