// Loader.jsx
import React, { useEffect } from "react";

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000); // Complete after 2 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div className="w-64 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-4 bg-yellow-500 rounded-full"
          style={{
            animation: "fillBar 2s linear forwards",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
