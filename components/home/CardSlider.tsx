import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/navigation";
import { useWindowSize } from "react-use";
import { Card } from "@/types/Card";
import { off } from "process";

interface Props {
  title: string;
  showArrow: boolean;
  cards: Card[];
  banner?: ReactNode;
}

const SliderCard = ({ title, cards, showArrow, banner }: Props) => {
  console.log(cards);
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    nextArrow: !isMobile && showArrow ? <SampleNextArrow /> : <div></div>,
    prevArrow: !isMobile && showArrow ? <SamplePrevArrow /> : <div></div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        className="absolute right-[-50px] top-[50%] transform translate-y-[-50%] w-12 h-12 rounded-full bg-white border hover:bg-black hover:text-white flex items-center justify-center cursor-pointer z-10"
        onClick={onClick}
      >
        <ChevronRight />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        className="absolute left-[-50px] top-[50%] transform translate-y-[-50%] w-12 h-12 rounded-full border bg-white hover:bg-black hover:text-white flex items-center justify-center cursor-pointer z-10"
        onClick={onClick}
      >
        <ChevronLeft />
      </div>
    );
  }

  return (
    <div className="slider-container w-full flex flex-col mt-8 mb-20 max-w-7xl mx-auto px-4">
      {banner && <div className="mb-4">{banner}</div>}
      <Slider {...settings}>
        {cards?.map((offer) => (
          <div key={offer._id} className="p-2">
            {offer.isLink ? (
              <Link
                href={offer.Link ?? "/"}
                target="_blank"
                style={{
                  background: `${offer.color}`
                }}
                className={`aspect-[4/4] flex flex-col justify-between p-6 mx-2 bg-[${offer.color}] rounded-lg text-white transition-transform transform hover:scale-105`}
              >
                <div className="flex flex-col space-y-2 mb-4">
                  <h3 className="font-bold text-4xl sm:text-xl md:text-2xl">
                    {offer.title}
                  </h3>
                  <p className="text-2xl sm:text-base md:text-lg text-gray-300">
                    {offer.subtitle}
                  </p>
                </div>
                <div
                  className="flex justify-center items-center mt-auto rounded-full w-20 h-20 mx-auto"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                  <img
                    src={
                      "https://shinely.tanuweb.cloud/uploads/" + offer.icon
                    }
                    alt={`${offer.title} logo`}
                    className="w-16 h-16 rounded-full object-cover p-2"
                  />
                </div>
              </Link>
            ) : (
              <Link
                href={`/card/${offer._id}`}
                style={{
                  background: `${offer.color}`
                }}
                className={`aspect-[4/4] flex flex-col justify-between p-6 mx-2 bg-[${offer.color}] rounded-lg text-white transition-transform transform hover:scale-105`}
              >
                <div className="flex flex-col space-y-2 mb-4">
                  <h3 className="font-bold text-4xl sm:text-xl md:text-2xl">
                    {offer.title}
                  </h3>
                  <p className="text-2xl sm:text-base md:text-lg text-gray-300">
                    {offer.subtitle}
                  </p>
                </div>
                <div
                  className="flex justify-center items-center mt-auto rounded-full w-20 h-20 mx-auto"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                  <img
                    src={
                      "https://shinely.tanuweb.cloud/uploads/" + offer.icon
                    }
                    alt={`${offer.title} logo`}
                    className="w-16 h-16 rounded-full object-cover p-2"
                  />
                </div>
              </Link>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCard;
