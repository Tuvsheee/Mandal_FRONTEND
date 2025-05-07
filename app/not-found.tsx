"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-[#f9fbfc] px-4 py-10 gap-10">
      
  
      {/* Left card */}
      <div className="bg-[#0f2d3f] text-white rounded-xl px-6 py-10 w-full md:w-[400px] shadow-xl flex flex-col items-center text-center">
        <div className="bg-[#183e57] w-20 h-20 flex items-center justify-center rounded-full mb-4 text-xl font-bold">
          404!
        </div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Oops, Something’s Not Right.</h2>
        <p className="text-sm text-gray-300 mb-6 px-2">
          Please check the URL or let us take you back to the homepage.
        </p>
        <Link
          href="/"
          className="bg-[#27c3a3] hover:bg-[#1bb293] text-white font-semibold px-6 py-2 rounded transition"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
