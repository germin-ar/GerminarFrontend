import styles from "./home.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <section className={`${styles.imagenIdentificar}`}>
                <div className={`${styles.contenidoIdentificar} flex flex-col items-center justify-center`}>
                    <div className={`${styles.logoIdentificar} flex-1 flex items-center justify-center `}>
                        <Image className={`${styles.marca} `} src="/logo.png" alt="usuario prueba" width="150" height="150"/>
                        <h2 className={`${styles.textoIdentificar}`}>Identifica tu planta y su estado de salud ¡Es gratis!</h2>
                    </div>
                    <div className="flex-1 flex  items-center flex-col gap-16">
                        <h2 className={`${styles.textoSubirIdentificar}`}>Sube o arraste tu foto</h2>
                        <div className={`${styles.subirIdentificar} flex gap-8`}>
                            <p className={`${styles.seleccionarIdentificar}`}>Selecciona Archivo</p>
                            <p>Sin archivo seleccionado</p>
                        </div>
                        <button className={`${styles.botonIdentificar} py-2 px-4 rounded`}>Identificar</button>
                    </div>
                </div>
            </section>
            <main className="flex justify-center items-center">
                {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                <section className={`${styles.fondoCards} flex justify-center items-center flex-col gap-5`}>
                    <p className={`${styles.tituloSecundario} tituloSecundario`}>Herramientas de cultivo
                        inteligentes</p>

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg`}>¿Cómo
                                    identifico mi planta?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <button
                                    className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Identificar
                                </button>
                            </div>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg`}>¿Qué
                                    puedo plantar hoy?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <button
                                    className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Descubrir
                                </button>
                            </div>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg `}>¿Qué
                                    puedo plantar en
                                    este espacio?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <button
                                    className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Analizar
                                </button>
                            </div>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                            <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg  `}>¿Qué
                                le sucede a mi
                                planta?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                Diagnosticar
                            </button>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            <section className={`${styles.nuestraPropuesta} flex justify-center items-center flex-col md:flex-row`}>
                <div className="md:w-1/2">
                    <div
                        className={`${styles.contenidoPropuesta} flex flex-col items-center md:items-start text-center md:text-left`}>
                        <h2 className={`${styles.tituloSecundario} text-2xl font-semibold mb-4`}>Nuestra propuesta</h2>
                        <p>¿Sueñas con alimentos frescos directamente de tu casa? Nuestra aplicación transforma cada
                            rincón de tu hogar en un jardín próspero. Olvídate de las limitaciones de espacio y la falta
                            de experiencia. Te guiaremos paso a paso para cultivar con éxito en balcones, terrazas y
                            hasta interiores.</p>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className={`${styles.imagenPropuesta} flex justify-center md:justify-end`}>
                        <Image src="/ecosistema.jpg" alt="Ecosistema" width="500" height="300"/>
                    </div>
                </div>
            </section>







            <section className={`${styles.contenedorPropuesta} grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center`}>
                <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10`}>
                    <div className="flex-1 flex items-center">
                        <Image className={`${styles.imagenes}`} src="/calendario.jpg" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1">
                        <div className={`${styles.cardsPropuesta}`}>
                            <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Administra
                                tus propias notificaciones</h2>
                            <p>
                                Personalizar alertas para el cuidado de tus plantas. Configura recordatorios para riego,
                                fertilización, poda y otras tareas según tu horario. Personaliza el contenido y el
                                método de
                                notificación para una gestión eficiente de tus plantas</p>
                            <button className={`${styles.botonCards} w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Administrar</button>
                        </div>
                    </div>
                </div>
                <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10`}>
                    <div className="flex-1 flex items-center">
                        <Image className={`${styles.imagenes}`} src="/seguimiento.jfif" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1">
                        <div className={`${styles.cardsPropuesta}`}>
                            <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Haz un
                                seguimiento de tu
                                progreso</h2>
                            <p>Lleva un registro detallado de tu experiencia de cultivo con nuestra función de
                                seguimiento.
                                Anota cuándo plantas, riegas y cosechas, y recibe recordatorios automáticos para las
                                tareas
                                de cuidado de tus plantas. </p>
                            <button
                                className={`${styles.botonCards} w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Seguir
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10`}>
                    <div className="flex-1 flex items-center">
                        <Image className={`${styles.imagenes}`} src="/tutoriales.png" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1">
                        <div className={`${styles.cardsPropuesta}`}>
                            <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Busca y
                                aprende
                                tutoriales</h2>
                            <p>Domina el arte de la horticultura urbana con nuestros tutoriales paso a paso. Aprende
                                cómo
                                cuidar de tus plantas, identificar y solucionar problemas, y maximizar tus cosechas. Los
                                tutoriales son fáciles de seguir y adecuados para todos.</p>
                            <button
                                className={`${styles.botonCards} w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Biblioteca
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10`}>
                    <div className={`flex-1 flex items-center`}>
                        <Image className={`${styles.imagenes}`} src="/ideal.png" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1">
                        <div className={`${styles.cardsPropuesta}`}>
                            <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Descubre Tu
                                planta Ideal para
                                tu jardín</h2>
                            <p>Encuentra las plantas perfectas para tu espacio con nuestra herramienta de recomendación
                                personalizada. Simplemente ingresa tus preferencias y te ayudaremos a seleccionar las
                                plantas que mejor se adapten a tu situación.</p>
                            <button
                                className={`${styles.botonCards} w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Descubrir
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}
