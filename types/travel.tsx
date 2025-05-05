import { Category } from "./category";

export interface Travel {
  title: string;
  _id: string;
  googlemap: string;
  duration: string;
  date: string;
  description: string;
  days: [string];
  category: Category;
  language: "en" | "mn" | "kr";
  cover: string;
  gallery: [string];
  price: string;
  isSpecial: boolean;
  isOutBound: boolean;
  createdAt: string;
  pax:any,
  transportation?: string;
  services?:string;
  sale?:string;
}
