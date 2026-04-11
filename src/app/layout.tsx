import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Port A Local Co — Your Local Guide to Port Aransas, TX",
  description:
    "Discover vetted restaurants, lodging, activities, shops & services in Port Aransas, Texas. Every listing approved by locals. No paid placements.",
  openGraph: {
    title: "Port A Local Co — Your Local Guide to Port Aransas, TX",
    description:
      "Discover vetted restaurants, lodging, activities, shops & services in Port Aransas, Texas.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-sand-50 text-navy-900">
        {children}
      </body>
    </html>
  );
}
