import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: [
    "192.168.0.45",
    "192.168.0.45:3000",
    "http://192.168.0.45:3000",
    "localhost",
    "localhost:3000",
    "http://localhost:3000",
  ],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "simonsaadvisuals.de" }],
        destination: "https://happyreels.de/:path*",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.simonsaadvisuals.de" }],
        destination: "https://happyreels.de/:path*",
        statusCode: 301,
      },
      {
        source: "/de/client-stories/:slug",
        destination: "/de/projekte/:slug",
        permanent: true,
      },
      {
        source: "/en/client-stories/:slug",
        destination: "/en/projects/:slug",
        permanent: true,
      },
      {
        source: "/de/work/prep-my-meal-leon-haegele",
        destination: "/de/projekte/leon-haegele",
        permanent: true,
      },
      {
        source: "/en/work/prep-my-meal-leon-haegele",
        destination: "/en/projects/leon-haegele",
        permanent: true,
      },
      {
        source: "/en/projekte",
        destination: "/en/projects",
        permanent: true,
      },
      {
        source: "/en/projekte/:slug",
        destination: "/en/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
