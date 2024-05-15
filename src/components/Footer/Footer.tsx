"use client"
import stylesFooter from "@/components/Footer/footer.module.css";
import {FaInstagram, FaYoutube} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

import Image from "next/image";

export default function Footer() {
    return (
        <footer
            className={`${stylesFooter.footer} flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-800`}>
            <div
                className={`${stylesFooter.borde} flex-1 relative w-full lg:w-1/3 flex flex-col items-center justify-center gap-5 mb-6 lg:mb-0 lg:border-0`}>
                <div className="w-24 h-24 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-16 lg:h-16">
                    <Image src="/isotipo-fondo-claro.png" alt="usuario prueba" width={100} height={100}
                           layout="responsive"/>
                </div>
                <div className="w-32 h-8 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-56 lg:h-12">
                    <Image src="/logotipo-claro.png" alt="usuario prueba" width={250} height={50} layout="responsive"/>
                </div>
            </div>
            <div className="flex-1 w-full lg:w-2/3 flex flex-col lg:flex-row justify-around items-center gap-10">
                <ul className={`${stylesFooter.menu} flex flex-col lg:flex-row items-center justify-around text-center text-wrap w-full`}>
                    <li className="text-white text-2xl w-full lg:w-32"><a href="#">Home</a></li>
                    <li className="text-white text-2xl w-full lg:w-32"><a href="#">Servicios</a></li>
                    <li className="text-white text-2xl w-full lg:w-32"><a href="#">Sobre nosotros</a></li>
                    <li className="text-white text-2xl w-full lg:w-32"><a href="#">Centro de ayuda</a></li>
                </ul>
            </div>
            <div className="flex-1">
                <ul className={`${stylesFooter.social_icon} flex items-center justify-center gap-8 w-full lg:w-auto`}>
                    <li><a href="#"><FaInstagram className={`${stylesFooter.iconosRedes}`}/></a></li>
                    <li><a href="#"><FaXTwitter className={`${stylesFooter.iconosRedes}`}/></a></li>
                    <li><a href="#"><FaYoutube className={`${stylesFooter.iconosRedes}`}/></a></li>
                </ul>
            </div>
        </footer>
    )
}