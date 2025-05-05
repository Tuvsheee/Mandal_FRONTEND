import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import {  Bebas_Neue  } from "@next/font/google";

const bebas = Bebas_Neue({
  weight: ["400"], 
  subsets: ["latin"], 
  display: "swap", // 
});

export default async function MainLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <html lang={locale} className={`${bebas.className}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}