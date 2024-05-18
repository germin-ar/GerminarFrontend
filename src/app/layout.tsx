import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {PoppinsTexto} from "@/app/ui/fonts";
import styles from "./home.module.css";
import Footer from "@/components/Footer/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Home",
    description: "Estas en Home"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>Home</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body className={`${inter.className} ${PoppinsTexto.className} ${styles.body} antialiased `}>

        <div className={`${styles.content}`}>
            {children}
        </div>
        <Footer/>
        </body>
        </html>
    );
}
