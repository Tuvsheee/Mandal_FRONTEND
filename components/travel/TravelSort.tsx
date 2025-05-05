"use client";

import { ArrowUpDown, Search, X } from "lucide-react";
import React, { useState, useCallback } from "react";
import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

const Sort: React.FC = () => {
  const t = useTranslations("HomePage");
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For capturing input value
  const router = useRouter();

  // Function to update the search query param when the search term changes
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search"); // Remove search param if input is empty
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value); 
  };

  const handleSort = (sortType: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", sortType);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={() => handleSort("price_high")}>{ t("priceIncrease")}</span>,
    },
    {
      key: "2",
      label: <span onClick={() => handleSort("price_low")}>{ t("priceDecrease")}</span>,
    },
  ];

  return (
    <div className="flex items-center w-full justify-end gap-4">
      <div
        className={`bg-[#F3F4F6] border-2 rounded-lg border-[#FDE046] transition-all duration-1000 ease-in-out ${
          showInput ? "w-full opacity-100" : "w-0 opacity-0"
        } overflow-hidden`}
      >
        <input
          type="text"
          className="w-full text-sm py-2 px-4"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange} 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchTerm);
            }
          }}
        />
      </div>

      <div className="flex gap-4 text-sm text-gray-500">
        {/* Search icon */}
        <div
          className="bg-[#F3F4F6] p-2 rounded-lg cursor-pointer"
          onClick={() => setShowInput(!showInput)}
        >
          {showInput ? <X /> : <Search />}
        </div>

        <Dropdown menu={{ items }} placement="bottomRight">
          <div className="bg-[#F3F4F6] p-2 rounded-lg cursor-pointer">
            <ArrowUpDown />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sort;
