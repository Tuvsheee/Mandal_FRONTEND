"use client";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@/types/user";
import axios from "axios";
import storageService from "@/utils/storageService";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const [form, setForm] = useState<User>({
    name: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setShowPassword(showPassword == "text" ? "password" : "text");
  };

  const onSubmitted = () => {
    const formData = new FormData();
    formData.append("email", form.email as string);
    formData.append("phone", form.phone as string);
    formData.append("password", form.password as string);
    formData.append("name", form.name as string);
    axios
      .post("https://shinely.tanuweb.cloud/api/v1/user", formData)
      .then((res) => {
        storageService.set(window, "token", res.data.token);
        storageService.set(window, "user", JSON.stringify(res.data.data));
        alert("Амжилттай");
      })
      .catch((er) => console.log(er));
  };
  return (
    <div className="w-full min-h-screen flex ">
      <div className="md:w-[80%] hidden md:block bg-[url('/bg_login.avif')] bg-no-repeat bg-cover bg-fixed "></div>
      <div className="md:w-[40%] w-full flex-shrink-0 flex flex-col items-center bg-[#121314] p-10 text-white h-screen justify-center">
        <span className="font-semibold text-2xl">Бүртгүүлэх хэсэг</span>
        <div className="w-[70%] flex flex-col gap-1">
          <span>Нэвтрэх нэр</span>
          <input
            value={form.name}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Нэвтрэх нэр"
            className="border border-slate-400/20 px-4 w-full py-3 bg-[#202226] rounded text-sm"
          />
        </div>
        <div className="w-[70%] flex flex-col gap-1 mt-4">
          <span>Утасны дугаар</span>
          <input
            value={form.phone}
            name="phone"
            onChange={handleInputChange}
            type="text"
            placeholder="Утасны дугаар"
            className="border border-slate-400/20 px-4 w-full py-3 bg-[#202226] rounded text-sm"
          />
        </div>
        <div className="w-[70%] flex flex-col mt-4 gap-1">
          <span>Нэвтрэх нууц үг</span>
          <div className="relative w-full">
            <input
              value={form.password}
              name="password"
              onChange={handleInputChange}
              type={showPassword}
              className="border border-slate-400/20 px-4 w-full py-3 bg-[#202226] rounded text-sm "
              placeholder="Нууц үг"
            />
            <div
              className="absolute right-4 top-0 translate-y-[50%] cursor-pointer"
              onClick={togglePassword}
            >
              <Eye color="#737D86" size={20} />
            </div>
          </div>
        </div>
        <div className="w-[70%] flex flex-col mt-4 gap-1">
          <span>Имэйл хаяг</span>
          <input
            value={form.email}
            name="email"
            onChange={handleInputChange}
            type="email"
            className="border border-slate-400/20 px-4 w-full py-3 bg-[#202226] rounded text-sm "
            placeholder="Цахим хаяг"
          />
        </div>
        <div className="w-[70%] bg-[#0091FF] py-3 flex font-semibold rounded items-center justify-center mt-4 cursor-pointer hover:bg-opacity-80">
          Нэвтрэх
        </div>
        <span className="text-sm my-6">
          Танд бүртгэл байгаа юу?{" "}
          <Link href={"/login"} className="text-blue-400 hover:underline ml-2">
            Нэвтрэх
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterScreen;
