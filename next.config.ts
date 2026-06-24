import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  ...(isProd ? {} : {
    async rewrites() {
      return [
        {
          source: "/admin",
          destination: "http://localhost:4321/admin"
        },
        {
          source: "/admin/:path*",
          destination: "http://localhost:4321/admin/:path*"
        },
        {
          source: "/_astro/:path*",
          destination: "http://localhost:4321/_astro/:path*"
        }
      ];
    }
  })
};

export default nextConfig;
