import { create } from "zustand";
import en from "@/messages/en.json";
import mn from "@/messages/mn.json";
import kr from "@/messages/kr.json";

interface LanguageState {
  language: "en" | "mn" | "kr";
  changeLanguage: (lang: "en" | "mn" | "kr") => void;
  getLocale: () => any;
}

const useLanguageStore = create<LanguageState>((set) => ({
  language: "en",
  changeLanguage: (lang: "en" | "mn" | "kr") => {
    set({ language: lang });
  },
  getLocale: () => {},
}));

export default useLanguageStore;
