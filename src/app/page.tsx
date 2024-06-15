"use client"
import styles from "./home.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";
import React, {useRef} from 'react';

export default function Home() {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <IdentificarImagen imagen="imagenIdentificar" pagina="resultado" forwardRef={targetRef}/>
            <section className="flex justify-center items-center">
                <div>
                    {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                    <HerramientasDeCultivo targetRef={targetRef}/>
                </div>
            </section>
            <section>
                <div className="flex flex-col md:flex-row items-center p-6 mb-4">
                    <div className="md:w-1/2 px-20">
                        <h2 className={`${styles.tituloSecundario} ${BalooBhaina2.className} mb-4`}>Nuestra propuesta</h2>
                        <p className="leading-relaxed">
                            ¿Sueñas con alimentos frescos directamente de tu casa? Nuestra aplicación transforma cada
                            rincón de tu hogar en un jardín próspero. Olvídate de las limitaciones de espacio y la falta
                            de experiencia. Te guiaremos paso a paso para cultivar con éxito en balcones, terrazas y
                            hasta interiores.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:pl-8 mb-4 md:mb-0">
                        <div className="max-w-full">
                            <Image
                                className={`rounded-lg shadow-md`}
                                src="/ecosistema.jpg"
                                alt="Ecosistema"
                                width="500"
                                height="300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`bg-[#EFE8D6] grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6 justify-center shadow-lg px-10`}>
                <div className={`flex items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className={`${styles.imagenes}`} src="/calendario.jpg" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"flex flex-col"}>
                            <h3 className={`${BalooBhaina2.className} text-nowrap`}>Administra tus notificaciones</h3>
                            <p className={"w-full"}>
                                Personaliza alertas para cuidar tus plantas. Configura recordatorios para riego, fertilización, poda y más según tu horario y preferencias.
                            </p>
                            <button
                                className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                Administrar
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className={`${styles.imagenes}`} src="/seguimiento.jfif" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"flex flex-col"}>
                            <h3 className={`${BalooBhaina2.className}`}>Haz un
                                seguimiento de tu
                                progreso</h3>
                            <p className={"w-full"}>
                                Registra tu experiencia de cultivo con nuestra función de seguimiento. Anota plantaciones, riegos y cosechas con recordatorios automáticos.</p>
                            <button
                                className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                Seguir
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className={`${styles.imagenes}`} src="/tutoriales.png" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"flex flex-col"}>
                            <h3 className={`${BalooBhaina2.className} text-nowrap`}>Busca y
                                aprende
                                tutoriales</h3>
                            <p className={"w-full"}>
                                Aprende horticultura urbana con nuestros tutoriales paso a paso. Cuida tus plantas, resuelve problemas y maximiza tus cosechas de manera fácil y accesible.</p>
                            <button
                                className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                Biblioteca
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className={`${styles.imagenes}`} src="/ideal.png" alt="Ecosistema" width="200"
                               height="200"/>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"flex flex-col"}>
                            <h3 className={`${BalooBhaina2.className}`}>Descubre tu planta ideal para tu jardín</h3>
                            <p className={"w-full"}>
                                Encuentra plantas perfectas para tu espacio con nuestra herramienta de recomendación personalizada.</p>
                            <button
                                className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                Descubrir
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
