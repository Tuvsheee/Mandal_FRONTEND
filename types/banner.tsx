export interface Banner {
  _id: string;
  title: string;
  description: string;
  fileType: "image" | "video";
  file: string;
}
