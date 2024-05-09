import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {BalooBhaina2, PoppinsTexto} from "@/app/ui/fonts";

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
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto">
        <ul className="flex justify-between items-center">
          <div className="flex items-center">
            <li><Link href="/" className="text-white hover:text-gray-300 px-4">Inicio</Link></li>
            <li><Link href="/biblioteca" className="text-white hover:text-gray-300 px-4">Biblioteca Hortícola</Link></li>
          </div>
          <div className="flex items-center">
            <li><a href="" className="text-white hover:text-gray-300 px-4">Registrarse</a></li>
            <li><a href="" className="text-white hover:text-gray-300 px-4">Ingresar</a></li>
          </div>
        </ul>
      </nav>
    </header>

    {children}

    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">¡Síguenos en redes sociales!</h3>
          <div className="flex mt-2">
            <a href="#" className="text-gray-400 hover:text-white mr-4"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white mr-4"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div>
          <p className="text-sm">&copy; 2024 Nombre de la Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
    </body>
    </html>
  );
}
