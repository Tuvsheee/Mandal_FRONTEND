"use client";
import React, { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { ChevronDown, Languages } from "lucide-react";
import { useLocale } from "next-intl";

const LANGUAGES = [
  { code: "en", name: "English", flag: "/flags/us.webp" },
  { code: "mn", name: "Mongolian", flag: "/flags/mongolia.png" },
  { code: "kr", name: "Korean", flag: "/flags/korea.webp" },
];

const LocaleSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Ensure the locale is a string
  const selectedLocale = locale;

  const onSelectionChange = (locale: string) => {
    // Replace locale using the router
    startTransition(() => {
      //@ts-ignore
      router.replace({ pathname, params }, { locale });
    });
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Currently Selected Language */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={LANGUAGES.find((lang) => lang.code === selectedLocale)?.flag}
          alt="Selected Language"
          className="w-6 h-4 md:w-12 md:h-8 object-cover border rounded"
        />
        <div> 
        <ChevronDown />
        </div>
     
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className={`p-2 cursor-pointer hover:bg-gray-200 flex items-center space-x-2 ${
                selectedLocale === lang.code ? "font-bold" : ""
              }`}
              onClick={() => onSelectionChange(lang.code)}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="w-6 h-4 md:w-10 md:h-6 object-cover border rounded"
              />
              <div>{lang.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default LocaleSwitcher;
