"use client"
import Link from "next/link";
import stylesHeader from "./header.module.css";
import { FaBell, FaCrown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import React from "react";

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [menuOpciones, setMenuOpciones] = React.useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const toggleMenuOpciones = () => {
        setMenuOpciones(!menuOpciones);
    };

    return (
        <header className={`${stylesHeader.container} z-0`}>
            <nav className={`${stylesHeader.nav}`}>
                <ul className={`${stylesHeader.lista}`}>

                    <div className={`${stylesHeader.usuario} flex-1 flex items-center justify-center`}>
                        <div className={`${stylesHeader.menu} flex items-center justify-end gap-32`}>
                            <li className={`${stylesHeader.liu}`}>
                                <Link href="/" className={`${stylesHeader.li}`}>Inicio</Link>
                                <div className={stylesHeader.underline}></div>
                            </li>
                            <li className={`${stylesHeader.liu}`}>
                                <Link href="/biblioteca" className={`${stylesHeader.li}`}>Biblioteca</Link>
                                <div className={stylesHeader.underline}></div>
                            </li>
                        </div>
                    </div>
                    <div className={`flex-1 ${stylesHeader.menuR}`}>

                    </div>
                    <div className={`${stylesHeader.marca} flex-1`}>
                        <div className="w-32 sm:w-34 md:w-26 lg:w-48">
                            <Link href={"/"}>
                                <Image src="/logotipo.png" alt="Germin.ar" width={250} height={50} layout="responsive" />
                            </Link>
                        </div>
                    </div>

                    <div className={`${stylesHeader.usuario} flex-1 flex items-center justify-end text-gray-900`}>
                        <div className={`${stylesHeader.menu} flex items-center justify-end gap-8`}>
                            <li className={`${stylesHeader.liu}`}>
                                <Link href="/jardin" className={`${stylesHeader.li}`}>Mi
                                    Jardín</Link>
                                <div className={stylesHeader.underline}></div>
                            </li>
                            {/* <li><FaBell className={`${stylesHeader.campana} text-gray-900`} /></li> */}
                            {/*<li><a href="" className={`${stylesHeader.li} hover:text-gray-300 px-10`}>Ale</a></li>*/}
                            <div className="flex gap-2">
                                <li className={`${stylesHeader.liUser} cursor-pointer`}
                                    onClick={() => {
                                        toggleMenuOpciones();
                                    }}>
                                    <Image className="rounded-full min-w-[75px]" src="/usuario.png" width="75"
                                        height="75"
                                        alt="usuario logueado" />
                                    <FaCrown className={`${stylesHeader.corona} text-yellow-400`} />
                                </li>
                                {/* --------------------------------------------------------------------------- */}
                                <li
                                    onClick={() => {
                                        toggleMenuOpciones();
                                    }}>
                                    <GoTriangleDown className={`${stylesHeader.infoUsuario} ${menuOpciones ? 'rotate-180' : ''} transition duration-300 ease-in-out cursor-pointer`} />
                                </li>

                                <div
                                    className={`z-10 shadow-lg rounded-lg absolute top-20 right-20 overflow-hidden transition-max-height duration-500 ease-in-out w-[15%]
                                        ${menuOpciones ? 'max-h-96' : 'max-h-0'}`}>
                                    <div className="bg-white w-full p-4 cursor-pointer">
                                        <ul>
                                            <li className={`${stylesHeader.li} p-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm`}>
                                                <FaUserCircle size={20} className="text-gray-900" />
                                                Ver perfil
                                            </li>
                                            <li className={`${stylesHeader.li} p-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm`}>
                                                <FaCrown size={20} className="text-gray-900" />
                                                Mi suscripción
                                            </li>
                                            <li className={`${stylesHeader.li} p-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm`}>
                                                <FaSignOutAlt size={20} className="text-gray-900" />
                                                Cerrar sesión
                                            </li>

                                        </ul>
                                    </div>
                                </div>

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
                                                className={`${stylesHeader.li} block p-2 hover:bg-[#275F08] rounded text-white transition-colors duration-300 w-fit`}>Inicio</Link>
                                        </li>
                                        <li>
                                            <Link href="/biblioteca"
                                                className={`${stylesHeader.li} block p-2 hover:bg-[#275F08] rounded text-white transition-colors duration-300 w-fit`}>Biblioteca</Link>
                                        </li>
                                        {/* <li className={`${stylesHeader.li} block p-2 hover:bg-[#275F08] rounded text-white transition-colors duration-300 w-fit`}>
                                            Notificaciones
                                        </li> */}
                                        <li>
                                            <Link href="/jardin"
                                                className={`${stylesHeader.li} block p-2 hover:bg-[#275F08] rounded text-white transition-colors duration-300 w-fit`}>Mi
                                                Jardín</Link>
                                        </li>
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
