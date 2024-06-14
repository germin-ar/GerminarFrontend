"use client"
import stylesHeader from "../../components/Header/header.module.css";
import stylesIdentificar from "./identificarPlanta.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import styles from "@/app/home.module.css";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import Loading from "@/components/Spinner/Spinner";

interface IdentificarPlanta{
    enlace:string;
}


export default function IdentificarPlanta(props:IdentificarPlanta) {
    const { enlace: string } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetchData();

        async function fetchData() {
            try {
                const result: string = await new Promise((resolve) => {
                    setTimeout(() => resolve("Datos cargados"), 2000);
                });

                setData(result);
            } catch (error) {
                console.error("Error al cargar los datos:", error)
            } finally {
                setIsLoading(false);
            }
        }
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <section className={`${stylesIdentificar.contenedor}`}>
                <section>
                    <div className={'flex flex-col justify-center items-start gap-4 my-12'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} mb-4`}>Diagnosticar
                            planta</h1>
                        <p>¿Querés asegurarte de que tus vegetales, hierbas y
                            cultivos estén siempre en su mejor estado? ¡Con nuestra aplicación puedes hacerlo
                            fácilmente! Escanea tus plantas y descubre si están sanas y felices, o si necesitan un poco
                            más de atención.</p>
                    </div>
                    <div className={"my-5 flex flex-col items-center gap-5"}>
                        <div className="col-span-full flex justify-center w-full">
                            <div
                                className={`${stylesIdentificar.subirFoto} flex justify-center rounded-lg border-4 border-dashed border-green-900 px-10 py-10    ${stylesIdentificar.fondo}`}>
                                <div className="text-center">
                                    <svg className="mx-auto h-24 w-24 text-slate-400" viewBox="0 0 24 24"
                                         fill="currentColor" aria-hidden="true">
                                        <path
                                              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                              />
                                    </svg>
                                    <div className="mt-4 flex leading-6">
                                        <label htmlFor="file-upload"
                                               className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Sube tu foto</span>
                                            <input id="file-upload" name="file-upload" type="file"
                                                   className="sr-only"></input>
                                        </label>
                                        <p className="pl-1">o arrastra y suelta</p>
                                    </div>
                                    <p className="leading-5">PNG, JPG, GIF hasta 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link href={"/estado"}
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                Identificar
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className={'flex flex-col justify-center items-start gap-4 my-12'}>
                        <h2 className={`${stylesHeader.titulo} ${BalooBhaina2.className}`}>¿Cómo
                            funciona
                            <br/> nuestro escaneo de plantas?</h2>
                        <div className={`${stylesIdentificar.procesoSubirFoto} flex items-center gap-10`}>
                            <p className={`${stylesIdentificar.textoProceso} w-3/5`}>Para comenzar, selecciona una planta en tu jardín o
                                maceta que desees evaluar. Luego, abre nuestra aplicación en tu teléfono o computadora y
                                accede a la opción -Escanear Plantas-. Toma una foto clara de la planta, asegurándote de
                                capturar todos sus detalles, desde las hojas hasta el tallo. Cuanta más claridad tenga
                                la imagen, mejor será nuestra evaluación. En cuestión de segundos, la aplicación
                                analizará la foto y te proporcionará información sobre la planta, incluyendo su nombre y
                                su estado de salud. ¡Es como tener un botánico en tu bolsillo, listo para ofrecerte
                                diagnósticos precisos!</p>
                            <div className={'flex justify-center'}>
                                <Image src="/identificar/identificar.jpg" alt="Escaneo" width="400"
                                       height="266"/>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

        </>

    )
}