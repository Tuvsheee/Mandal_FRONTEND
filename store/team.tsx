import { Team } from "@/types/team";
import { Travel } from "@/types/travel";
import { create } from "zustand";

interface TeamState {
  team: Team[];
  fetchTeam: () => Promise<void>;
  fetchSingleTeam: (id: string) => Promise<Travel>;
} 
   
const useTeamStore = create<TeamState>((set) => ({
  team: [],
  fetchTeam: async () => {
    try {
      const res = await fetch(`https://shinely.tanuweb.cloud/api/v1/team`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const response = await res.json();
      set({ team: response.data });
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  }, 
  fetchSingleTeam: async (id: string) => {
    try {
      const res = await fetch(
        `https://shinely.tanuweb.cloud/api/v1/team/${id}`
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

export default useTeamStore;
