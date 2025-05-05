"use client";
import CustomContainer from "@/components/Layout/CustomContainer";
import AccommodationHeading from "./accommodationHeading";
import AccView from "@/views/acc/page";

export default function AccPage() {
  return (
    <CustomContainer>
      <AccommodationHeading name={""} />
      <AccView/>
    </CustomContainer>
  );
}
