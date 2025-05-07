import { Category } from "@/types/category";
import axiosInstance from "@/utils/axios";
import { create } from "zustand";

interface CategoryState {
    data: Category[];
    loading: boolean;
    fetchData: () => Promise<void>;
    fetchSingleData: (id: string) => Promise<Category>;
  }
  
  const useCategoryStore = create<CategoryState>((set) => ({
    data: [],
    loading: false,
    fetchData: async () => {
      try {
        set({ loading: true });
        const response = await axiosInstance.get(`/category`);
        set({ data: response.data.data, loading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        set({ loading: false });
      }
    },
    fetchSingleData: async (id: string) => {
      const response = await axiosInstance.get(`/category/${id}`);
      return response.data.data;
    },
  }));
  

export default useCategoryStore;
