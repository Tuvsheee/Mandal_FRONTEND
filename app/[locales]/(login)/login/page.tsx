"use client";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const togglePassword = () => {
    setShowPassword(showPassword == "text" ? "password" : "text");
  };
  return (
    <div className="w-full min-h-screen flex ">
      <div className="md:w-[80%] hidden md:block bg-[url('/bg_login.avif')] bg-no-repeat bg-cover bg-fixed "></div>
      <div className="md:w-[40%] w-full flex-shrink-0 flex flex-col items-center bg-[#121314] p-10 text-white h-screen justify-center">
        <span className="font-semibold text-2xl">Нэвтрэх хэсэг</span>
        <div className="w-[70%] flex flex-col gap-1">
          <span>Нэвтрэх нэр</span>
          <input
            type="text"
            placeholder="Нэвтрэх нэр"
            className="border border-slate-400/20 px-4 w-full py-3 bg-[#202226] rounded text-sm"
          />
        </div>
        <div className="w-[70%] flex flex-col mt-4 gap-1">
          <span>Нэвтрэх нууц үг</span>
          <div className="relative w-full">
            <input
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
        <div className="w-[70%] bg-[#0091FF] py-3 flex font-semibold rounded items-center justify-center mt-4 cursor-pointer hover:bg-opacity-80">
          Нэвтрэх
        </div>
        <span className="text-sm my-6">
          Танд бүртгэл байхгүй юу?{" "}
          <Link
            href={"/register"}
            className="text-blue-400 hover:underline ml-2"
          >
            Бүртгүүлэх
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginScreen;
