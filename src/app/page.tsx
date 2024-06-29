"use client"
import styles from "./home.module.css"
import { BalooBhaina2 } from "@/app/ui/fonts";
import Image from "next/image";
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";
import React, {useRef, useState} from 'react';


export default function Home() {
    const targetRef = useRef<HTMLDivElement>(null);

    const handleResultado = (resultado: any) => {
        console.log("Resultado recibido en el padre:", resultado);
    };

    return (
        <>
            <IdentificarImagen targetRef={targetRef} imagen="imagenIdentificar" pagina="resultado" forwardRef={targetRef} onResultadoRecibido={handleResultado}/>
            <section className="flex justify-center items-center">
                <div>
                    {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                    <HerramientasDeCultivo targetRef={targetRef} />
                </div>
            </section>

            <section>
                <div className="flex flex-col md:flex-row items-center px-6 md:p-6 mb-4">
                    <div className="md:w-1/2 md:px-20">
                        <h2 className={`${styles.tituloSecundario} ${BalooBhaina2.className} mb-0 md:mb-4`}>Nuestra propuesta</h2>
                        <p className="leading-relaxed">
                            ¿Soñás con alimentos frescos directamente de tu casa? Nuestra aplicación transforma cada
                            rincón de tu hogar en un jardín próspero. Olvidate de las limitaciones de espacio y la falta
                            de experiencia. Te guiaremos paso a paso para cultivar con éxito en balcones, terrazas y
                            hasta interiores.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:pl-8 mb-4 md:mb-0">
                        <div className="max-w-full">
                            <Image
                                className={`rounded-lg shadow-md w-[500px]`}
                                src="/ecosistema.jpeg"
                                alt="Ecosistema"
                                width="1700"
                                height="1134"
                            />
                        </div>
                    </div>
                </div>
            </section>


            <section
                className={`bg-[#EFE8D6] grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6 justify-center px-10`}>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/calendario.jpg" alt="Calendario" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Administrá tus notificaciones</h3>
                            <div className="flex flex-col">
                                <p className={"w-full"}>
                                    Personalizá alertas para cuidar tus plantas. Configurá recordatorios para riego, fertilización, poda y más según tu horario y preferencias.
                                </p>
                                <button
                                    className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    Configurar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/seguimiento.jpeg" alt="Progreso" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Llevá un control de tu progreso</h3>
                            <div className="flex flex-col">
                                <p className={"w-full"}>
                                    Registrá tu experiencia de cultivo con nuestra función de seguimiento. Anotá plantaciones, riegos y cosechas con recordatorios automáticos.</p>
                                <button
                                    className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    Seguir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/tutoriales.jpeg" alt="Tutorial" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Buscá y aprendé de tutoriales</h3>
                            <div className="flex flex-col">
                                <p className={"w-full"}>
                                    Aprendé con nuestros tutoriales paso a paso. Cuidá tus plantas, resolvé problemas y maximizá tus cosechas de manera fácil y accesible.</p>
                                <button
                                    className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    Explorar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/ideal.jpeg" alt="Jardín" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Descubrí la planta ideal para tu jardín</h3>
                            <div className="flex flex-col">
                                <p className={"w-full"}>
                                    Encontrá plantas perfectas para tu espacio con nuestra herramienta de recomendación personalizada.</p>
                                <button
                                    className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    Descubrir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
