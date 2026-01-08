"use client";

import CustomContainer from "@/components/Layout/CustomContainer";
import { Link } from "@/navigation";
import useCategoryStore from "@/store/category";
import IMGURL from "@/utils/constant";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const InboundCategoryList = () => {
  const locale = useLocale();
  const { fetchData, data } = useCategoryStore();

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCategories = data.filter(
    (cat) => cat.language === locale
  );

  return ( 
    <CustomContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-6">
        {filteredCategories.map((cat) => (
          <Link href={`/tours/inbound/${cat._id}`} key={cat._id}>
            <div
              className="rounded-full w-[240px] h-[240px] overflow-hidden mx-auto relative flex items-center justify-center text-white text-center shadow-md"
              style={{
                backgroundImage: `url(${IMGURL}/${encodeURIComponent(
                  cat.photo
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/10 absolute inset-0 flex items-center justify-center px-4">
                <div>
                  <h2 className="text-sm font-bold uppercase">{cat.name}</h2>
                  <p className="text-xs mt-2 line-clamp-3">{cat.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CustomContainer>
  );
};

export default InboundCategoryList;
