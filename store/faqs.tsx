import { Faqs } from "@/types/faqs";
import { Travel } from "@/types/travel";
import { create } from "zustand";

interface FaqsState {
  faqs: Faqs[];
  fetchFaqs: () => Promise<void>;
  fetchSingleFaqs: (id: string) => Promise<Faqs>;
} 

const useFaqsStore = create<FaqsState>((set) => ({
  faqs: [],
  fetchFaqs: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/faq`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ faqs: response.data });
    } catch (error) {
      console.error("Error fetching faq data:", error);
    }
  }, 
  fetchSingleFaqs: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/faq/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching faq data:", error);
    }
  },
}));

export default useFaqsStore;
