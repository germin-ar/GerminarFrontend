import stylesHeader from "../../components/Header/header.module.css";
import stylesDescubrir from "./descubrir.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/home.module.css";

export default function DescubrirPage() {
    return (
        <>
            <main className={`${stylesDescubrir.contenedor}`}>
                <section>
                    <div className={'flex flex-col justify-center items-start gap-4 my-12'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4 ${stylesDescubrir.espaciado}`}>
                            Encuentra las plantas perfectas
                            <br/>para cada estación del año</h1>

                        <p className={'text-3xl text-justify'}>Utilizando tu ubicación real, nuestra aplicación
                            identifica la época en la que te encuentras y te proporciona recomendaciones personalizadas
                            de plantas para sembrar y cosechar. Desde cultivos frescos de primavera hasta cosechas de
                            invierno abundantes, nuestra guía te ayudará a cultivar alimentos deliciosos durante todo el
                            año, adaptados a tu ubicación y clima locales. ¡Haz que tu jardín florezca en cada temporada
                            con nuestra ayuda!</p>
                    </div>
                    <div className={'flex flex-col gap-8 mb-10'}>
                        <div className={'flex justify-start items-center gap-5 mt-10'}>
                            <div>
                                <Image src="/descubrir/ubicacion-icon.png" alt="ubicacion-icon" width="30"
                                       height="30"/>
                            </div>
                            <a  href="" className={'cursor-pointer text-2xl underline font-semibold'}>Activar ubicación</a>
                        </div>
                        <div>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                Buscar
                            </button>
                        </div>
                    </div>
                </section>
            </main>

        </>

    )
}