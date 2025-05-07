import { Banner } from "@/types/banner";
import axiosInstance from "@/utils/axios";
import { create } from "zustand";

interface BannerState {
  banner: Banner[];
  fetchBanner: () => Promise<void>;
}

const useBannerStore = create<BannerState>((set, get) => ({
  banner: [],
  fetchBanner: async () => {
    try {
      // Avoid refetching if data already exists
      if (get().banner.length > 0) return;

      const res = await axiosInstance.get<{ data: Banner[] }>("/banner");
      set({ banner: res.data.data }); // Correct response structure
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  },
}));

export default useBannerStore;
