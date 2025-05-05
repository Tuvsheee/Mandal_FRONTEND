import type { Metadata } from "next";

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
    <html lang={locale}>
      <body className={` antialiased`}>
        <div className="w-full flex flex-col items-center">{children}</div>
      </body>
    </html>
  );
}
