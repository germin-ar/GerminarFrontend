import styles from "@/app/home.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import Link from "next/link";

export default function HerramientasDeCultivo(){
    return (
        <section className={`${styles.fondoCards} flex justify-center items-center flex-col gap-5 `}>
            <p className={`${styles.tituloSecundario} tituloSecundario`}>Herramientas de cultivo
                inteligentes</p>

            <div className={`flex justify-center items-center flex-wrap gap-5`}>
                <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center">
                        <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg`}>¿Cómo
                            identifico mi planta?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href="/diagnosticar"
                              className={`${styles.botonCards}  text-white font-bold py-2 px-4 rounded`}>
                            Identificar
                        </Link>
                    </div>
                </div>
                <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center">
                        <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg`}>¿Qué
                            puedo plantar hoy?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href="/descubrir"
                              className={`${styles.botonCards}  text-white font-bold py-2 px-4 rounded`}>
                            Descubrir
                        </Link>
                    </div>
                </div>
                <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center">
                        <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg `}>¿Qué
                            puedo plantar en
                            este espacio?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href="/espacio"
                              className={`${styles.botonCards}  text-white font-bold py-2 px-4 rounded`}>
                            Analizar
                        </Link>
                    </div>
                </div>
                <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center ">
                        <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg  `}>¿Qué
                            le sucede a mi
                            planta?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href={`/dianosticarEstado`}
                              className={`${styles.botonCards}  text-white font-bold py-2 px-4 rounded`}>
                            Diagnosticar
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    )
}