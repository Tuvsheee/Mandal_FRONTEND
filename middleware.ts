import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

export default createMiddleware({
  locales,
  defaultLocale: "mn",
});

export const config = {
  matcher: ["/", "/(kr|mn|en)/:path*"],
};
