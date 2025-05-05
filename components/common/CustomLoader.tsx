import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";

const CustomLoader = () => {
  const [size, setSize] = useState(150);
  const [isDuotone, setIsDuotone] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#f8b195");
  const [secondaryColor, setSecondaryColor] = useState("#e9c0fd");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode on page load
  useEffect(() => {
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(darkMode);
  }, []);

  const loaderProps = { 
    type: "roller",
    color: isDarkMode ? "#ffffff" : primaryColor, // White when dark mode
    altColor: isDuotone ? secondaryColor : primaryColor,
    size: size,
  };

  return (
    <div className="text-center font-sans flex items-center justify-center h-screen dark:text-white">
      <div className="my-5 mx-auto">
        <Circles {...loaderProps} />
      </div>
    </div>
  );
};

export default CustomLoader;
