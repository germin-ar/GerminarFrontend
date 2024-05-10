"use client"
import stylesFooter from "@/components/Footer/footer.module.css";
import { FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Image from "next/image";
import {BalooBhaina2} from "@/app/ui/fonts";

export default function Footer(){
    return (
        <footer className={`${stylesFooter.footer}`}>
            <div className={`${stylesFooter.borde} flex-1 flex flex-col gap-1 items-center justify-center`}>
                <Image className={`${stylesFooter.marca} `} src="/logo.png" alt="usuario prueba" width="70" height="70"/>
                <h2 className={`${stylesFooter.marcaTexto} ${BalooBhaina2.className}`}>GERMIN.AR</h2>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <ul className="flex items-center justify-center gap-5">
                    <li className="text-white">home</li>
                    <li className="text-white">home</li>
                    <li className="text-white">home</li>
                    <li className="text-white">home</li>
                </ul>
            </div>
            <div className="flex-1 flex gap-5 items-center justify-center">
                <FaInstagram className={`${stylesFooter.iconosRedes}`}/>
                <FaXTwitter className={`${stylesFooter.iconosRedes}`}/>
                <FaYoutube className={`${stylesFooter.iconosRedes}`}/>
            </div>
        </footer>
    )
}