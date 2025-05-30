"use client";
import { Trans } from "@/types/trans";
import axiosInstance from "@/utils/axios";
import { create } from "zustand";

interface TransState {
  trans: Trans[];
  fetchTrans: () => Promise<void>;
  fetchSingleTrans: (id: string) => Promise<Trans>; 
}    
const useTransStore = create<TransState>((set) => ({
    trans: [],
  fetchTrans: async () => {
    try {
      const response = await axiosInstance.get(`/transport`);
      set({ trans: response.data.data || [] });
    } catch (error) {
      console.error("Error fetching Trans data:", error);
    }
  },
  fetchSingleTrans: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `/transport/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching hostel data:", error);
    }
  },
}));

export default useTransStore;
