export interface Banner {
  _id: string;
  title1: string;
  title2: string;
  description: string;
  fileType: "image" | "video";
  file: string;
}
