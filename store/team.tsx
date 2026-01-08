import { Team } from "@/types/team";
import { Travel } from "@/types/travel";
import axiosInstance from "@/utils/axios";
import { create } from "zustand";

interface TeamState {
  team: Team[];
  fetchTeam: () => Promise<void>;
  fetchSingleTeam: (id: string) => Promise<Travel | undefined>;
}

const useTeamStore = create<TeamState>((set) => ({
  team: [],
  fetchTeam: async () => {
    try {
      const res = await axiosInstance.get<{ data: Team[] }>("/team");
      set({ team: res.data.data });
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  },
  fetchSingleTeam: async (id: string) => {
    try {
      const res = await axiosInstance.get<{ data: Travel }>(`/team/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  },
}));

export default useTeamStore;
