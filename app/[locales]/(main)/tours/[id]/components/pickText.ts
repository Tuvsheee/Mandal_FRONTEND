/**
 * Utility function to pick and format text from various data structures
 * Handles locale-specific content and normalizes different field names
 */
export const pickText =
  (locale: string) =>
  (v: any): string => {
    if (v === null || v === undefined) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);

    if (Array.isArray(v)) {
      return v
        .map((x) => pickText(locale)(x))
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
        return pickText(locale)(v[locKey]);

      if (
        v[locShort] &&
        (typeof v[locShort] === "string" || typeof v[locShort] === "number")
      )
        return pickText(locale)(v[locShort]);

      if ("title" in v && "description" in v) {
        const t = pickText(locale)((v as any).title);
        const d = pickText(locale)((v as any).description);
        return [t, d].filter(Boolean).join("\n");
      }

      if ("text" in v) return pickText(locale)((v as any).text);
      if ("value" in v) return pickText(locale)((v as any).value);
      if ("name" in v) return pickText(locale)((v as any).name);
      if ("label" in v) return pickText(locale)((v as any).label);

      return Object.values(v)
        .map((x) => pickText(locale)(x))
        .filter(Boolean)
        .join("\n");
    }

    return "";
  };
