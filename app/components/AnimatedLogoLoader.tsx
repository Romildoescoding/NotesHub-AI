import React from "react";

const AnimatedLogoLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-24 h-24 animate-pulse"
      >
        {/* Background rectangle */}
        <rect width="100" height="100" fill="black" />

        {/* Animated "A" shape */}
        <path d="M30 70 L50 30 L70 70 L65 70 L50 40 L35 70 Z" fill="white">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>

        {/* Horizontal line below "A" */}
        <rect x="35" y="65" width="30" height="5" fill="white" rx="2.5">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};

export default AnimatedLogoLoader;
