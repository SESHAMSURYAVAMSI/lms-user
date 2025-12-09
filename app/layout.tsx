// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

import { Geist, Geist_Mono } from "next/font/google";
import { Francois_One, Inter, Poppins } from "next/font/google";

// Existing fonts latin style 
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// New fonts from your proper style guide 
const francois = Francois_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-francois",
});
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Urologial Society of India",
  description: "Official website of the Urologial Society of India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${francois.variable} ${inter.variable} ${poppins.variable}`}
      >
        <body className="font-poppins antialiased text-gray-900 bg-white">
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </div>
  );
}
