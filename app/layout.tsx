import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {  Bebas_Neue  } from "@next/font/google";

const bebas = Bebas_Neue({
  weight: ["400"], 
  subsets: ["latin"], 
  display: "swap", // 
});



export const metadata: Metadata = {
  title: {
    default: "Jinst Od Travel LLC",
    template: "%s | Jinst Od Travel",
  },
  description:
    "Jinst Od Travel LLC - Монгол болон Солонгосын аялал жуулчлалын шилдэг үйлчилгээ үзүүлэгч.",
  metadataBase: new URL("https://jinstod.mn"), // replace with actual domain
  alternates: {
    canonical: "https://jinstod.mn",
    languages: {
      "mn": "https://jinstod.mn/mn",
      "ko": "https://jinstod.mn/kr",
    },
  },
  openGraph: {
    title: "Jinst Od Travel LLC | Аялал жуулчлалын үйлчилгээ",
    description:
      "Монгол болон Солонгосын үзэсгэлэнт аяллуудыг мэргэжлийн түвшинд зохион байгуулдаг аялал жуулчлалын компани.",
    url: "https://jinstod.mn",
    siteName: "Jinst Od Travel",
    images: [
      {
        url: "https://jinstod.mn/og-image.jpg", // replace with actual image
        width: 1200,
        height: 630,
        alt: "Jinst Od аяллын зураг",
      },
    ],
    locale: "mn_MN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinst Od Travel | Аяллын үйлчилгээ",
    description:
      "Монгол, Солонгос чиглэлийн аялал жуулчлалын онцгой үйлчилгээ.",
    images: ["https://jinstod.mn/twitter-image.jpg"], 
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={`${bebas.className}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
