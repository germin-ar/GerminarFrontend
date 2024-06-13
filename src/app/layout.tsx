import {Inter} from "next/font/google";
import "./globals.css";
import {PoppinsTexto} from "@/app/ui/fonts";
import styles from "./home.module.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <head>
            <link rel="icon" href="/favicon-germinar.ico" sizes="16x16 32x32 48x48 64x64 256x256" type="image/x-icon" />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Home</title>
        </head>

        <body className={`${inter.className} ${PoppinsTexto.className} ${styles.body} antialiased`}>

            <Header/>

            <main className={`${styles.content}`}>
                {children}
            </main>

            <Footer/>

        </body>

        </html>
    );
}
