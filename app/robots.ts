import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://jinstod.com/sitemap.xml",
    host: "https://jinstod.com",
  };
};

export default robots;
