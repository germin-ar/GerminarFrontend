"use client"
import Image from "next/image";

import stylesResultado from "@/app/resultado/[id]/resultado.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import styles from "@/app/home.module.css";
import {Suspense, useEffect, useState} from "react";


import Link from "next/link";

interface PlantData {
    scientificName: string;
    genusName: string;
    familyName: string;
    score: number;
    commonNames: string[];
}

export default function PlantaPage({params: {id}}: { params: { id: string } }) {
    const defaultPlantData: PlantData = {
        scientificName: '',
        genusName: '',
        familyName: '',
        score: 0,
        commonNames: [],
    };

    const [imagenDataUrl, setImagenDataUrl] = useState<string>('');
    useEffect(() => {

        const imagenGuardada = localStorage.getItem('imagen');
        if (imagenGuardada) {
            setImagenDataUrl(imagenGuardada);
        }
    }, []);

    return (
        <section className="max-w-[1300px] m-auto">
            <main className={`${styles.contenedor}`}>
                <section className={"m-10"}>
                    <div
                        className={`flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center m-12 gap-12`}>
                        <div className={'flex flex-col items-center gap-10'}>
                            <h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}></h1>
                            <div className="flex-1 flex items-start flex-col gap-5">
                                <div className="h-[500px] overflow-hidden flex items-center justify-center">
                                    <img src={imagenDataUrl} className="object-cover max-w-full max-h-full"
                                         alt="Albahaca-sana" width="500"
                                         height="500"/>
                                </div>
                                <div>
                                    <p className="flex items-center gap-5">¿Querés saber cómo planta?
                                        <Link href="/guia"
                                              className={`bg-[#88BC43] text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                            Empezar
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={'table-container'}>
                            <table className={'vertical-header-table'}>
                                <tbody>
                                <tr>
                                    <th className={'p-10 border'}>Nombre cientifico:</th>
                                    <td className={'p-10 border'}>nombre_cientifico</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Nombres comunes</th>
                                    <td className={'p-10 border'}>
                                        nombre_comun
                                    </td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Género</th>
                                    <td className={'p-10 border'}>genero</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Familia</th>
                                    <td className={'p-10 border'}>familia</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className={'flex flex-col gap-12 m-20'}>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Estado de
                            salud</h2>
                        <div className={`flex items-center gap-5`}>
                            <div>
                                <Image className={`w-14 sm:w-20`} src="/resultado/planta-sana-icon.png"
                                       alt="Planta-sana-icon" width="80" height="80"/>
                            </div>
                            <div>
                                estado_de_salud
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Descripción general</h2>
                        <p className={'text-justify'}>
                            descripcion_general</p>
                    </div>

                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Características</h2>
                        <div className={'flex flex-wrap'}>
                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tamaño-icon.png" alt="tamaño-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col items-start'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Tamaño</h3>
                                    <ul className={`${stylesResultado.texto} list-disc list-inside`}>
                                        <li>Tallo de 30 a 50 cm de altura</li>
                                        <li>Hojas de 3 a 5 cm de longitud</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/fertilizante-icon.png" alt="fertilizante-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Fertilizante</h3>
                                    <p className={`${stylesResultado.texto}`}>Aplicar un fertilizante
                                        equilibrado una vez al mes durante la temporada de crecimiento.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/riego-icon.png" alt="riego-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Riego</h3>
                                    <p className={`${stylesResultado.texto}`}>Mantener el suelo ligeramente
                                        húmedo, evitando el encharcamiento.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tierra-icon.png" alt="tierra-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Tierra</h3>
                                    <p className={`${stylesResultado.texto}`}>Requiere un suelo bien drenado y
                                        fértil, preferiblemente con un pH entre 6.0 y 7.5.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/exposolar-icon.png" alt="exposolar-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Exposición solar</h3>
                                    <p className={`${stylesResultado.texto}`}>Luz solar directa por la mañana
                                        y sombra parcial por la tarde.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/insecticida-icon.png" alt="insecticida-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Insecticida</h3>
                                    <p className={`${stylesResultado.texto}`}>Controlar plagas con
                                        insecticidas naturales como jabón insecticida o aceite de neem.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temperatura-icon.png" alt="temperatura-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Temperatura adecuada</h3>
                                    <p className={`${stylesResultado.texto}`}>Prefiere temperaturas cálidas
                                        entre 18-25°C, evitando temperaturas extremadamente frías.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temporada-icon.png" alt="temporada-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Temporada</h3>
                                    <p className={`${stylesResultado.texto}`}>Se puede sembrar en primavera
                                        después de que haya pasado el
                                        riesgo de heladas.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/ubicacion-icon.png" alt="ubicacion-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Ubicaciones posibles</h3>
                                    <p className={`${stylesResultado.texto}`}>Ventana, balcón, terraza, patio
                                        trasero, porche.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/podado-icon.png" alt="podado-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Podado</h3>
                                    <p className={`${stylesResultado.texto}`}>Podar cada 15 días
                                        aproximadamente, para conseguir un mayor crecimiento y que la recolecta sea más
                                        abundante.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={''}>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Consejos</h2>
                        <ul className={`list-disc list-inside flex flex-col gap-8`}>
                            <li>La albahaca es más aromática cuando se utiliza fresca, así que arranca las hojas justo
                                antes de usarlas para obtener el mejor sabor y aroma.
                            </li>
                            <li>Si la albahaca comienza a florecer, retira las flores para prolongar la producción de
                                hojas y mantener el mejor sabor.
                            </li>
                            <li>Si es necesario lavar las hojas de albahaca, hazlo suavemente y sécalas completamente
                                antes de usarlas para evitar que pierdan su sabor.
                            </li>
                            <li>Si no vas a utilizar toda la albahaca de inmediato, puedes conservar las hojas en un
                                recipiente hermético en la nevera durante unos días o congelarlas para usarlas más
                                tarde.
                            </li>
                        </ul>

                        <div className={'mt-14 flex'}>
                            <Link href="/registro"
                                  className={`bg-[#88BC43]  text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                <div>
                                    <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                           height="20"/>
                                </div>
                                Guardar
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

        </section>

    )
}