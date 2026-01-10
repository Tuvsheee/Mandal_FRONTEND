import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://mandaltoursmongolia.com/sitemap.xml",
    host: "https://mandaltoursmongolia.com",
  };
};

export default robots;
