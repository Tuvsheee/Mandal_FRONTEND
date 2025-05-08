import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const body = `
User-agent: *
Allow: /

Sitemap: https://jinstod.com/sitemap.xml
Host: https://jinstod.com
`;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
