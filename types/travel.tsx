import { Category } from "./category";

export interface Travel {
  title: string;
  _id: string;
  googlemap: string;
  duration: string;
  date: string;
  description: string;
  days: TravelDay[];
  category: Category;
  language: "en" | "mn" | "kr";
  cover: string;
  gallery: [string];
  price: string;
  isSpecial: boolean;
  createdAt: string;
  pax: any;
  transportation?: string;
  services?: string;
  sale?: string;
  information: string;
  highlights?: string[];
}

export interface TravelDay {
  direction?: string;
  program: string;
  photos: string[];
}
