export interface Category {
  name: string;
  description: string;
  _id: string;
  photo: string;
  language: "kr" | "en" | "mn" | "chn" | "jp";
  isSpecial?: boolean;
  createdAt: string;
  sort?: number;
}
