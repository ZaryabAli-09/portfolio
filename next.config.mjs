/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "letsenhance.io",
      },
    ],
  },
};

export default nextConfig;
