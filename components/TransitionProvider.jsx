"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TransitionProvider = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95; // Hold at 95% until page actually loads
        }
        return prev + Math.random() * 25;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    if (progress >= 95 && !isLoading) {
      // Complete the animation when page is ready
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timer);
    }
  }, [progress, isLoading]);

  // Call this when your page content is loaded
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Simulate page load completion (replace with actual load detection)
  useEffect(() => {
    const timer = setTimeout(handleLoadComplete, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative">
      {/* Browser-style loading bar */}
      <AnimatePresence>
        {progress > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", ease: "easeOut" }}
            className="fixed top-0 left-0 h-1 bg-amber-400 z-50 shadow-lg"
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      {children}
    </div>
  );
};

export default TransitionProvider;
