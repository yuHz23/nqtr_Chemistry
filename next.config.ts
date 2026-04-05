import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nqtr_Chemistry",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
