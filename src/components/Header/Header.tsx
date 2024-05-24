"use client"
import Link from "next/link";
import stylesHeader from "./header.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import {FaBell} from "react-icons/fa";
import {FaCrown} from "react-icons/fa";
import {GoTriangleDown} from "react-icons/go";


import Image from "next/image";
import {useState} from "react";

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };
    return (
        <header className={`${stylesHeader.container} bg-gray-800`}>
            <nav className={`${stylesHeader.nav}`}>
                <ul className={`${stylesHeader.lista}`}>

                    <div className={`flex-1 ${stylesHeader.menu}`}>
                        <div className="flex items-center">
                            <li><Link href="/" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Inicio</Link>
                            </li>
                            <li><Link href="/biblioteca"
                                      className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Biblioteca</Link></li>
                        </div>
                    </div>
                    <div className={`flex-1 ${stylesHeader.menuR}`}>

                    </div>
                    <div className={`${stylesHeader.marca} flex-1`}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className}`}>GERMIN.<span
                            className={`${stylesHeader.ar}`}>AR</span>
                        </h1>
                    </div>
                    <div className={`${stylesHeader.usuario} flex-1 flex items-center justify-end`}>
                        <div className={`${stylesHeader.menu} flex items-center justify-end gap-8`}>
                            <li><Link href="/jardin" className={`${stylesHeader.li} hover:text-gray-300 `}>Mi
                                Jardín</Link></li>
                            <li><FaBell className={`${stylesHeader.campana}`}/></li>
                            {/*<li><a href="" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Ale</a></li>*/}
                            <div className="flex gap-2">
                            <li className={`${stylesHeader.liUser} `}>
                                <Image className="rounded-full min-w-[75px]" src="/usuario.PNG" width="75" height="75"
                                       alt="usuario logueado"/>
                                <FaCrown className={`${stylesHeader.corona}`}/>
                            </li>
                            <li>
                                <GoTriangleDown className={`${stylesHeader.infoUsuario}`}/>
                            </li>
                            </div>
                        </div>
                    </div>
                    <div className={`flex-1 flex items-center justify-center ${stylesHeader.menuR}`}>
                        <div className="z-50">
                            {/* Botón de la hamburguesa */}
                            <button className="fixed right-1 top-1 mt-5 mr-5 z-50 p-2 bg-[#88BC43] rounded-full "
                                    onClick={toggleMenu}>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {menuAbierto ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>

                            {/* Menú lateral */}
                            <div
                                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform transition-transform ease-in-out duration-300 ${menuAbierto ? 'translate-x-0' : 'translate-x-full'}`}>
                                <div className=" p-4 rounded shadow flex items-center h-full">
                                    <ul className="text-white">
                                        <li>
                                            <Link href="/"
                                                  className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Inicio</Link>
                                        </li>
                                        <li>
                                            <Link href="/biblioteca"
                                                  className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Biblioteca</Link>
                                        </li>
                                        <li className={`${stylesHeader.li} hover:text-gray-300 px-10`}>
                                            Notificaciones
                                        </li>
                                        <li>
                                            <Link href="/jardin"
                                                  className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Mi
                                                Jardín</Link>
                                        </li>
                                        {/* Agrega más enlaces según sea necesario */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    );
}