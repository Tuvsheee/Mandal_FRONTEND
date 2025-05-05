
export interface Apartment {
    _id:string;
    name: string;
    type: string;
    price: string;
    description: string; 
    items: string;
    location: string;
    photo?: string;
    gallery: string[];
    services:  string[];
    language?: "en" | "mn" | "kr" | "chn" | "jp";
}
