"use client"; // Ensures the component runs on the client side

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const overlayVariants = {
  // initial: { opacity: 1, y: "100%" }, // Start above the viewport
  enter: {
    opacity: 1,
    y: "-100%",
    transition: { duration: 0.5, ease: "easeInOut" },
  }, // Slide to cover the viewport
  // exit: {
  //   opacity: 1,
  //   y: "-100%",
  //   transition: { duration: 0.5, ease: "easeInOut" },
  // }, // Slide down out of the viewport
};

const TransitionProvider = ({ children }) => {
  const pathname = usePathname(); // Get current pathname to trigger animation on route change

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.div
          key={pathname} // Trigger animation on route change
          variants={overlayVariants}
          // initial="initial"
          animate="enter"
          // exit="exit"
          className="fixed top-0 left-0 w-full h-full bg-black z-50" // Full screen overlay
        />
      </AnimatePresence>
      <div className="">{children}</div>{" "}
      {/* Ensure children are above the overlay */}
    </div>
  );
};

export default TransitionProvider;
