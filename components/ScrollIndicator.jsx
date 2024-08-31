"use client";
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <div className="-mt-2 flex  items-center justify-center md:justify-start md:items-start h-screen">
      <motion.div
        className="relative w-12 h-12 border-4 border-gray-800 rounded-full flex items-center justify-center"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute w-1 h-4 bg-gray-800 rounded-md animate-bounce"></div>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
