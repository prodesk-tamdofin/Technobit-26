import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/safiq/", "/profile/", "/register/event/", "/api/"],
      },
    ],
    sitemap: "https://www.technobit26-itc.tech/sitemap.xml",
    host: "https://www.technobit26-itc.tech",
  };
}
