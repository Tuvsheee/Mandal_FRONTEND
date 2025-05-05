import React from "react";
import ReactFlipCard from "reactjs-flip-card";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "@/navigation"; 
import { useTranslations } from "next-intl";
import { Team } from "@/types/team";

interface Props {
  team: Team[];
}

const GridInformation = ({ team }: Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const router = useRouter();
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex items-center justify-center gap-4 max-w-[1200px] w-full py-0 md:px-0 flex-wrap mb-4">
        <span className="text-4xl font-bold">
          {t("our")}
        </span>
        <span className="text-4xl font-bold text-[#5C98F2]">
          {t("team")}
        </span>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
        {team.map((member, index) => (
          <div key={index} className="w-full flex justify-center">
            <ReactFlipCard
              containerStyle={{
                width: isMobile ? "40vh" : "40vh",
                height: isMobile ? "40vh" : "40vh",
                overflow: "hidden",
              }}
              frontStyle={{
                height: "100%",
                width: "100%",
                backgroundImage: `url(${
                  member.cover
                    ? `https://shinely.tanuweb.cloud/uploads/${member.cover}`
                    : "/default-cover-photo.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8%",
               
              }}
              backStyle={{
                height: "100%",
                width: "100%",
                backgroundImage: `url(${
                  member.cover
                    ? `https://shinely.tanuweb.cloud/uploads/${member.cover}`
                    : "/default-cover-photo.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8%",
               
              }}
              frontComponent={
                <div className="w-full flex items-center pt-80 space-x-2 justify-between h-full p-4 bg-black bg-opacity-20 rounded-[8%]">
                  <span className="text-white md:text-2xl font-semibold w-full">
                    {member.name}
                  </span>
                  <span className="text-white md:text-sm font-semibold w-full">
                    {member.role}
                  </span>
                </div>
              }
              backComponent={
                <div className="w-full flex flex-col justify-end h-full p-4 bg-black bg-opacity-20 rounded-[8%]">
                  <span className="text-white md:text-xl font-semibold text-justify">
                    {member.overview}
                  </span>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridInformation;
