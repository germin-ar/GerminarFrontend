"use client"
import stylesFooter from "@/components/Footer/footer.module.css";
import {FaInstagram, FaYoutube} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

import Image from "next/image";

export default function Footer() {
    return (
        <footer
            className={`${stylesFooter.footer} flex flex-col lg:flex-row items-center justify-center gap-8 p-6`}>
            <div
                className={`${stylesFooter.borde} flex-1 relative w-full lg:w-1/3 flex flex-col items-center justify-center gap-2 lg:border-0`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16  md:w-16 md:h-16 lg:w-16 lg:h-16">
                    <Image src="/isotipo-fondo-claro.png" alt="usuario prueba" width={100} height={100}
                           layout="responsive"/>
                </div>
                <div className="w-32 sm:w-34 md:w-26 lg:w-36">
                    <Image src="/logotipo-claro.png" alt="usuario prueba" width={250} height={50} layout="responsive"/>
                </div>
            </div>
            <div className="flex-1 w-full lg:w-2/3 flex flex-col lg:flex-row justify-around items-center">
                <ul className={`${stylesFooter.menu} flex flex-col lg:flex-row items-center justify-around text-center text-wrap w-full gap-1`}>
                    <li className="text-white text-lg w-full lg:w-32"><a href="#">Home</a></li>
                    <li className="text-white text-lg w-full lg:w-32"><a href="#">Servicios</a></li>
                    <li className="text-white text-lg w-full lg:w-32"><a href="#">Sobre nosotros</a></li>
                    <li className="text-white text-lg w-full lg:w-32"><a href="#">Centro de ayuda</a></li>
                    <li className="text-white text-lg w-full lg:w-32"><a href="#">Contacto</a></li>
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