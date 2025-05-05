import { Banner } from "@/types/banner";
import { Card } from "@/types/Card";
import { create } from "zustand";

interface CategoryState {
  banner: Banner[];
  footer: Card[];
  fetch: () => Promise<void>;
  fetchFooter: () =>Promise<void>
}
 
const useBannerStore = create<CategoryState>((set, get) => ({
  banner: [],
  footer:[],
  fetchFooter: async () => {
    try {
      const oldcat = get().footer;
      if (oldcat.length > 0) return;
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/footer`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ footer: response.data });
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  },
  fetch: async () => {
    try {
      const oldcat = get().banner;
      if (oldcat.length > 0) return;
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/banner`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ banner: response.data });
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  },
}));

export default useBannerStore;
