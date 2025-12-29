import type { Metadata } from "next";
import { Rubik, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taste Buds Blog Site ",
  description: "Food blog on Vancouver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${sourceSans.variable} antialiased bg-hero`}
      >
        {children}
      </body>
    </html>
  );
}
