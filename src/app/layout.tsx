import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {BalooBhaina2, PoppinsTexto} from "@/app/ui/fonts";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Estas en Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} ${PoppinsTexto.className}  antialiased `}>
    <Header />
    {children}
    <Footer />
    </body>
    </html>
  );
}
