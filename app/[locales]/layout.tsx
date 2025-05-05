import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
  const messages = await getMessages();
  return (
    <div className="w-full flex flex-col items-center ">
      <NextIntlClientProvider messages={messages}>
        <main className="w-full max-w-3xl lg:max-w-5xl xl:max-w-full flex flex-col items-center">
          {children}
        </main>
      </NextIntlClientProvider>
    </div>
  );
}