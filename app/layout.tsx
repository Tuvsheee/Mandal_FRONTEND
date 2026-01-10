import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mandal Travel LLC",
    template: "%s | Mandal Travel",
  },
  description:
    "Mandal Travel LLC - Монгол болон Солонгосын аялал жуулчлалын шилдэг үйлчилгээ үзүүлэгч.",
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "Монгол аялал",
    "Солонгос аялал",
    "групп аялал",
    "захиалгат аялал",
    "жинст од трэвел",
    "жинст од аялал",
    "аялал жуулчлал",
    "Хөвсгөлийн аялал",
    "Говийн аялал",
    "Төвийн бүсийн аялал",
    "виз зөвлөгөө",
    "аялалын захиалга",
    "нутгийн аялал",
    "Монгол Солонгос жуулчлал",
    "Хөвсгөл нуур аялал",
    "Монголын аяллын компани",
    "Mongolia travel",
    "Korea travel tours",
    "custom tours Mongolia",
    "group travel Mongolia",
    "Mandal Travel",
    "Mongolian travel agency",
    "Huvsgul lake tour",
    "Gobi desert tour",
    "Central Mongolia travel",
    "visa support services",
    "Mongolia Korea tours",
    "travel to Huvsgul",
    "Gobi desert adventure",
    "tailor-made Mongolian tours",
    "domestic Mongolia tours",
    "Mongolian nature travel",
  ],

  metadataBase: new URL("https://mandaltoursmongolia.com"),
  alternates: {
    canonical: "https://mandaltoursmongolia.com",
    languages: {
      mn: "https://mandaltoursmongolia.com/mn",
      kr: "https://mandaltoursmongolia.com/kr",
      en: "https://mandaltoursmongolia.com/en",
    },
  },
  openGraph: {
    title: "Mandal Travel LLC | Аялал жуулчлалын үйлчилгээ",
    description:
      "Монгол болон Солонгосын үзэсгэлэнт аяллуудыг мэргэжлийн түвшинд зохион байгуулдаг аялал жуулчлалын компани.",
    url: "https://jinstod.mn",
    siteName: "Mandal Travel",
    images: [
      {
        url: "https://jinstod.mn/logo.png",
        width: 1200,
        height: 630,
        alt: "Mandal аяллын зураг",
      },
    ],
    locale: "mn_MN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandal Travel | Аяллын үйлчилгээ",
    description:
      "Монгол, Солонгос чиглэлийн аялал жуулчлалын онцгой үйлчилгээ.",
    images: ["https://jinstod.mn/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={` ${poppins.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
