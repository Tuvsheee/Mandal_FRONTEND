import React, { ReactNode } from "react";

interface DefaultContainerProps {
  children: ReactNode;
  className?: string;
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center   ${className}`}
    >
      {children}
    </div>
  );
};

export default DefaultContainer;
