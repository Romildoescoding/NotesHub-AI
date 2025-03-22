import type { NextConfig } from "next";

// Define the Next.js configuration object
const nextConfig: NextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // Exclude @mapbox/node-pre-gyp from being bundled
  //     config.module.rules.push({
  //       test: /node_modules\/@mapbox\/node-pre-gyp/,
  //       use: 'ignore-loader',
  //     });
  //   }
  //   return config;
  // },
  // experimental: {
  //   turbo: false, // Disable Turbopack
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow any hostname
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG rendering
  },
  devIndicators: {
    buildActivity: false,
  },
};

// Export the configuration
export default nextConfig;
