"use client"; // Ensures the component runs on the client side

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const overlayVariants = {
  enter: {
    opacity: 1,
    y: "-100%",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const TransitionProvider = ({ children }) => {
  const pathname = usePathname(); // Get current pathname to trigger animation on route change

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.div
          key={pathname} // Trigger animation on route change
          variants={overlayVariants}
          animate="enter"
          className="fixed top-0 left-0 w-full h-full bg-black z-50" // Full screen overlay
        />
      </AnimatePresence>
      <div className="">{children}</div>{" "}
    </div>
  );
};

export default TransitionProvider;
