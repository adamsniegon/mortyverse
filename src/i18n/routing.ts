import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "cs-CZ"],
  defaultLocale: "en-US",
  localePrefix: {
    mode: "always",
    prefixes: {
      "en-US": "/en",
      "cs-CZ": "/cs",
    },
  },
  pathnames: {
    "/": "/",
  },
});
