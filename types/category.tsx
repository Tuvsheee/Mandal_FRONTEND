export interface Category {
  name: string;
  description: string;
  _id: string;
  photo: string;
  language: "kr" | "en" | "mn" | "chn" | "jp";
  createdAt: string;
  sort?: number;
}
