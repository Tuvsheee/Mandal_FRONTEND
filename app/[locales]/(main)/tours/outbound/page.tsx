"use client";

import React, { useEffect } from "react";
import CustomContainer from "@/components/Layout/CustomContainer";
import DefaultContainer from "@/components/Layout/DefaultContainer";
import { useLocale } from "next-intl";
import useCategoryStore from "@/store/category";
import { Link } from "@/navigation";
import IMGURL from "@/utils/constant";

const Page = () => {
  const locale = useLocale();
  const { fetchData, data } = useCategoryStore();

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCategories = data.filter(
    (cat) => cat.language === locale && cat.isOut === true
  );

  const InboundIntro = () => (
    <DefaultContainer>
      <div className="w-full">
        <video
          src="/vedio/bg-vedio.mp4"
          autoPlay
          muted
          loop
          className="w-full h-[100vh] object-cover bg-cover rounded-lg"
        />
      </div>
      <CustomContainer>
        <div className="text-center mt-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to the world of JINST OD
          </h1>
        </div>
      </CustomContainer>
    </DefaultContainer>
  );

  const OutBoundCategoryList = () => (
    <CustomContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-6">
        {filteredCategories.map((cat) => (
          <Link href={`/tours/inbound/${cat._id}`} key={cat._id}>
            <div
              className="rounded-full w-[240px] h-[240px] overflow-hidden mx-auto relative flex items-center justify-center text-white text-center shadow-md"
              style={{
                backgroundImage: `url(${IMGURL}/${cat.photo})`,
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

  return (
    <>
      <InboundIntro />
      <OutBoundCategoryList />
    </>
  );
};

export default Page;
