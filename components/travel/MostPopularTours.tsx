"use client";
import React from "react";
import { Travel } from "@/types/travel";
import IMGURL from "@/utils/constant";
import { Link } from "@/navigation";
import Image from "next/image";

interface MostPopularToursProps {
  travels: Travel[];
  limit?: number;
}

const MostPopularTours: React.FC<MostPopularToursProps> = ({
  travels,
  limit = 3,
}) => {
  const popularTours = travels.slice(0, limit);

  if (popularTours.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-3xl  mb-8 font-semibold text-[#111f13]">
          Most popular tours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  justify-center mx-auto">
          {popularTours.map((tour) => (
            <Link
              key={tour._id}
              href={`/tours/${tour._id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={`${IMGURL}/${tour.cover}`}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 rounded-lg p-2 text-black bg-white/60 ">
                  <h3 className="text-sm font-bold uppercase  underline">
                    {tour.title}
                  </h3>
                  <p className="text-xs">{tour.duration}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopularTours;
