export interface User {
  _id?: string;
  name: string;
  phone?: string;
  email?: string;
  createdAt?: string;
  role?: "admin" | "operator" | "user";
  booked?: [string];
  photo?: string;
  password?: string;
}
