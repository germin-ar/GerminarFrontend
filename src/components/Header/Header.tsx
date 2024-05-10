"use client"
import Link from "next/link";
import stylesHeader from "./header.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import { FaBell } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";


import Image from "next/image";

export default function Header(){
    return (
        <header className={`${stylesHeader.container} bg-gray-800`}>
            <nav className={`${stylesHeader.nav}`}>
                <ul className={`${stylesHeader.lista}`}>
                    <div className="flex-1 flex items-center">
                        <li><Link href="/" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Inicio</Link></li>
                        <li><Link href="/biblioteca" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Biblioteca
                            Hortícola</Link></li>
                    </div>
                    <div className={`${stylesHeader.marca} flex-1`}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className}`}>GERMIN.<span
                            className={`${stylesHeader.ar}`}>AR</span>
                        </h1>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <li><Link href="/jardin" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Mi Jardín</Link></li>
                        <li><FaBell className={`${stylesHeader.campana}`}/></li>
                        <li><a href="" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Ale</a></li>
                        <li className={`${stylesHeader.liUser}`}>
                            <Image className="rounded-full" src="/usuario.PNG" width="75" height="75" alt="usuario logueado" />
                            <FaCrown className={`${stylesHeader.corona}`}/>
                        </li>
                        <li>
                            <GoTriangleDown className={`${stylesHeader.infoUsuario}`}/>
                        </li>

                    </div>
                </ul>
            </nav>
        </header>
    );
}