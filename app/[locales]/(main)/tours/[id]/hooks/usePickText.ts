import React from "react";

/**
 * Custom hook to extract and format text from travel data
 */
export const usePickText = (locale: string) => {
  return React.useCallback(
    (v: any): string => {
      if (v === null || v === undefined) return "";
      if (typeof v === "string" || typeof v === "number") return String(v);

      if (Array.isArray(v)) {
        return v
          .map((x) => (typeof x === "string" ? x : JSON.stringify(x)))
          .filter(Boolean)
          .join("\n");
      }

      if (typeof v === "object") {
        const locKey = String(locale);
        const locShort = locKey.split("-")[0];

        if (
          v[locKey] &&
          (typeof v[locKey] === "string" || typeof v[locKey] === "number")
        )
          return String(v[locKey]);

        if (
          v[locShort] &&
          (typeof v[locShort] === "string" || typeof v[locShort] === "number")
        )
          return String(v[locShort]);

        if ("title" in v && "description" in v) {
          const t = String(v.title || "");
          const d = String(v.description || "");
          return [t, d].filter(Boolean).join("\n");
        }

        if ("text" in v) return String(v.text || "");
        if ("value" in v) return String(v.value || "");
        if ("name" in v) return String(v.name || "");
        if ("label" in v) return String(v.label || "");

        return Object.values(v)
          .map((x) => (typeof x === "string" ? x : ""))
          .filter(Boolean)
          .join("\n");
      }

      return "";
    },
    [locale]
  );
};
