import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://encrypted-tbn2.gstatic.com/images?**")],
  },
};

export default nextConfig;
