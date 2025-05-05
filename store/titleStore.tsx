import { Title } from "@/types/title";
import { create } from "zustand";

interface TitleState {
  title: Title[];
  fetchTitle: () => Promise<void>;
}

const useTitleStore = create<TitleState>((set, get) => ({
  title: [],
  fetchTitle: async () => {
    try {

      const oldTitle = get().title;
      if (oldTitle.length > 0) return;

      // Fetch data from the API
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/title`);
      
      // Handle non-OK responses
      if (!res.ok) {
        throw new Error("Failed to fetch title data");
      }

      // Parse the response data
      const response = await res.json();
      
      // Update the store with the fetched data
      set({ title: response.data });
    } catch (error) {
      // Log the error to the console
      console.error("Error fetching title data:", error);
    }
  },
}));

export default useTitleStore;
