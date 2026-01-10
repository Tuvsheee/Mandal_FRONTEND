import createNextPlugin from "next-intl/plugin";

const withNextIntl = createNextPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8001",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mandaltoursmongolia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.mandaltoursmongolia.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
