import styles from "./home.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";

export default function Home() {
    return (
        <>
            <main className="flex justify-center items-center">
                {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                <section className={`${styles.fondoCards} flex justify-center items-center flex-col gap-5`}>
                    <p className={`${styles.tituloSecundario} tituloSecundario`}>Herramientas de cultivo
                        inteligentes</p>

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg  mb-2`}>¿Cómo identifico mi planta?</p>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                Diagnosticar
                            </button>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg  mb-2`}>¿Qué
                                puedo plantar hoy?</p>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                Diagnosticar
                            </button>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg mb-2`}>¿Qué
                                puedo plantar en
                                este espacio?</p>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                Diagnosticar
                            </button>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg  mb-2`}>¿Qué
                                le sucede a mi
                                planta?</p>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                Diagnosticar
                            </button>
                        </div>
                    </div>

                </section>
            </main>
            <section>

            </section>
        </>
    );
}
