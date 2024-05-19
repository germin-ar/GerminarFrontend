"use client"
import Image from "next/image";
import stylesHeader from "../../../components/Header/header.module.css";
import stylesResultado from "./resultado.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import styles from "@/app/home.module.css";
import {useEffect, useState} from "react";

interface PlantData {
    scientificName: string;
    genusName: string;
    familyName: string;
    score: number;
    commonNames: string[];
}
export default function ResultadoPage({params: {id}}: { params: { id: string } }) {

    const [datosPlanta, setDatosPlanta] = useState<PlantData[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/candidates/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const candidates = data.candidates.map((candidate:any) => ({
                    scientificName: candidate.specie.scientific_name,
                    genusName: candidate.specie.genus_name,
                    familyName: candidate.specie.family_name,
                    commonNames: candidate.specie.common_names,
                    score: candidate.score,
                }));
                candidates.sort((a:any, b:any) => b.score - a.score);
                setDatosPlanta(candidates);
                console.log(candidates)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);



    return (
        <>
            <section className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg overflow-x-auto">
                <h1 className="text-2xl font-bold mb-5">Información de la planta</h1>
                {datosPlanta.length === 0 ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="flex">
                        {datosPlanta.map((planta, index) => (
                            <div key={index} className="flex-shrink-0 mr-5">
                                <h2 className="text-xl font-bold mb-2">{planta.scientificName}</h2>
                                <p><span className="font-bold">Género:</span> {planta.genusName}</p>
                                <p><span className="font-bold">Familia:</span> {planta.familyName}</p>
                                <p><span className="font-bold">Nombres comunes:</span> {planta.commonNames.join(', ')}
                                </p>
                                <p><span className="font-bold">Score:</span> {planta.score}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <main className={`${stylesResultado.contenedor} p-10`}>
                <section>
                    <div className={'flex justify-center items-center gap-64 my-12'}>


                        <div className={'flex flex-col items-center gap-10'}>
                            <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>{datosPlanta[0].commonNames[0]}</h1>
                            <div className="flex-1 flex items-start flex-col gap-5">
                                <Image src="/resultado/albahaca-sana.jpg" alt="Albahaca-sana" width="500"
                                       height="500"/>
                                <button
                                    className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="30"
                                               height="30"/>
                                    </div>
                                    Guardar planta
                                </button>
                            </div>
                        </div>


                        <div className={'table-container text-2xl'}>
                            <table className={'vertical-header-table'}>
                                <tbody>
                                <tr>
                                    <th className={'p-10 border'}>Nombre científico</th>
                                    <td className={'p-10 border'}>{datosPlanta[0].scientificName}</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Nombres comunes</th>
                                    <td className={'p-10 border'}>
                                        {datosPlanta[0].commonNames && datosPlanta[0].commonNames.length > 0
                                            ? datosPlanta[0].commonNames.join(', ')
                                            : 'No hay nombres comunes disponibles'}
                                    </td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Género</th>
                                    <td className={'p-10 border'}>{datosPlanta[0].genusName}</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Familia</th>
                                    <td className={'p-10 border'}>{datosPlanta[0].familyName}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section>
                    <div className={'my-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Estado
                            de salud</h1>
                        <div className={'flex justify-start items-center gap-8 mt-10'}>
                            <div>
                                <Image src="/resultado/planta-sana-icon.jpg" alt="Albahaca-sana" width="50"
                                       height="50"/>
                            </div>
                            <p className={'text-3xl'}>¡Tu planta parece sana!</p>
                        </div>
                    </div>

                    <div className={'my-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Descripción
                            general</h1>
                        <p className={'text-3xl text-justify'}>
                            La albahaca, conocida científicamente como Ocium Basilicum, es una hierba aromática
                            originaria de la India, Irán y de otras regiones de Asia, de intenso aroma y color. Además
                            de proporcionar belleza al jardín y la terraza, ofrece numerosos beneficios como condimento
                            en la cocina, hierba saludable y protección para otras plantas del jardín y el huerto.</p>
                    </div>

                    <div className={'my-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Características</h1>

                        {/*div grande*/}
                        <div className={'flex flex-wrap'}>
                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tamaño-icon.png" alt="tamaño-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col items-start'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Tamaño</h2>
                                    <ul className={` ${stylesResultado.texto} list-disc list-inside text-2xl`}>
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
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Fertilizante</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Aplicar un fertilizante
                                        equilibrado una vez al mes durante la temporada de crecimiento.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/riego-icon.png" alt="riego-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Riego</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Mantener el suelo ligeramente
                                        húmedo, evitando el encharcamiento.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tierra-icon.png" alt="tierra-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Tierra</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Requiere un suelo bien drenado y
                                        fértil, preferiblemente con un pH entre 6.0 y 7.5.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/exposolar-icon.png" alt="exposolar-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Exposición
                                        solar</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Luz solar directa por la mañana
                                        y sombra parcial por la tarde.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/insecticida-icon.png" alt="insecticida-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Insecticida</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Controlar plagas con
                                        insecticidas naturales como jabón insecticida o aceite de neem.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temperatura-icon.png" alt="temperatura-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Temperatura
                                        adecuada</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Prefiere temperaturas cálidas
                                        entre 18-25°C, evitando temperaturas extremadamente frías.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temporada-icon.png" alt="temporada-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Temporada</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Se puede sembrar en primavera
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
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Ubicaciones
                                        posibles</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Ventana, balcón, terraza, patio
                                        trasero, porche.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/podado-icon.png" alt="podado-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Podado</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Podar cada 15 días
                                        aproximadamente, para conseguir un mayor crecimiento y que la recolecta sea más
                                        abundante.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'my-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Consejos</h1>
                        <ul className={`list-disc list-inside text-3xl flex flex-col gap-8`}>
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

                        <div className={'mt-20'}>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                <div>
                                    <Image src="/resultado/mas-icon.png" alt="Albahaca-sana" width="30"
                                           height="30"/>
                                </div>
                                Guardar planta
                            </button>
                        </div>
                    </div>
                </section>


            </main>

        </>

    )
}