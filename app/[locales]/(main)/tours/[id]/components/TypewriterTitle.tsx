import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTitleProps {
  text: string;
  activeIndex: number;
}

/**
 * Animated typewriter effect component
 * Displays text character by character
 */
const TypewriterTitle: React.FC<TypewriterTitleProps> = ({
  text,
  activeIndex,
}) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    let i = 0;
    const chars = Array.from(text || "");

    const interval = setInterval(() => {
      i++;
      setDisplay(chars.slice(0, i).join(""));
      if (i >= chars.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [text, activeIndex]);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-lg md:text-3xl text-white font-bold leading-snug"
    >
      {display}
    </motion.h1>
  );
};

export default TypewriterTitle;
