export interface Hostel {
  _id:string;
  name: string;
  description: string; 
  information: string;
  location: string;
  photo?: string;
  gallery: string[];
  rooms: any;
  language?: "en" | "mn" | "kr" | "chn" | "jp";
  }
  