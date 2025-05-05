import React, { ReactNode } from "react";

interface CustomContainerProps {
  children: ReactNode;
  className?: string;
}

const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
  className,
}) => {
  return ( 
    <div
      className={`w-full flex flex-col items-center max-w-[1200px] cormorant-font flex-grow  px-8 md:px-10 lg:px-20 xl:px-32   ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomContainer;
