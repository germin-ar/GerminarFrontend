"use client"
import Link from "next/link";

export default function Header(){
    return (
        <header className="bg-gray-800 py-4">
            <nav className="container mx-auto">
                <ul className="flex justify-between items-center">
                    <div className="flex items-center">
                        <li><Link href="/" className="text-white hover:text-gray-300 px-4">Inicio</Link></li>
                        <li><Link href="/biblioteca" className="text-white hover:text-gray-300 px-4">Biblioteca
                            Hortícola</Link></li>
                    </div>
                    <div className="flex items-center">
                        <li><a href="" className="text-white hover:text-gray-300 px-4">Registrarse</a></li>
                        <li><a href="" className="text-white hover:text-gray-300 px-4">Ingresar</a></li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}