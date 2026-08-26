"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TransitionProvider = ({ children }) => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
    if (progress >= 95) {
      const done = setTimeout(() => setProgress(100), 400);
      const reset = setTimeout(() => setProgress(0), 750);
      return () => {
        clearTimeout(done);
        clearTimeout(reset);
      };
    }
  }, [progress]);

  return (
    <div className="relative">
      {/* Browser-style loading bar */}
      {progress > 0 && (
        <div
          className="fixed top-0 left-0 h-1 bg-secondary z-50 shadow-lg transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Page content */}
      {children}
    </div>
  );
};

export default TransitionProvider;
