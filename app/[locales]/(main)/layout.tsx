import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";



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