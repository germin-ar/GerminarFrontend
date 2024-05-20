"use client"
import Image from "next/image";
import stylesHeader from "../../../components/Header/header.module.css";
import stylesResultado from "./resultado.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import styles from "@/app/home.module.css";
import {Suspense, useEffect, useState} from "react";
import Loading from "@/app/resultado/[id]/loading";

interface PlantData {
    scientificName: string;
    genusName: string;
    familyName: string;
    score: number;
    commonNames: string[];
}
export default function ResultadoPage({params: {id}}: { params: { id: string } }) {
    const defaultPlantData: PlantData = {
        scientificName: '',
        genusName: '',
        familyName: '',
        score: 0,
        commonNames: [],
    };
    const [datosPlanta, setDatosPlanta] = useState<PlantData[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/candidates/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const candidates = data.candidates.map((candidate: any) => ({
                    scientificName: candidate.specie.scientific_name,
                    genusName: candidate.specie.genus_name,
                    familyName: candidate.specie.family_name,
                    commonNames: candidate.specie.common_names,
                    score: candidate.score,
                }));
                candidates.sort((a: any, b: any) => b.score - a.score);
                setDatosPlanta(candidates);
                console.log(candidates);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="max-w-[1300px] m-auto">
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
            <main className={`${styles.contenedor}`}>
                <section className={"m-10"}>
                    <div
                        className={`flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center m-12 gap-12`}>


                        <div className={'flex flex-col items-center gap-10'}>
                            <h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>{datosPlanta[0].commonNames[0]}</h1>
                            <div className="flex-1 flex items-start flex-col gap-5">
                                <Image src="/resultado/albahaca-sana.jpg" alt="Albahaca-sana" width="500"
                                       height="500"/>
                                <button
                                    className={`bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                               height="20"/>
                                    </div>
                                    Guardar
                                </button>
                            </div>
                        </div>
                        <div className={'table-container'}>
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
                                <p>¡Tu planta parece sana!</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Descripción general</h2>
                        <p className={'text-justify'}>
                            La albahaca, conocida científicamente como Ocium Basilicum, es una hierba aromática
                            originaria de la India, Irán y de otras regiones de Asia, de intenso aroma y color. Además
                            de proporcionar belleza al jardín y la terraza, ofrece numerosos beneficios como condimento
                            en la cocina, hierba saludable y protección para otras plantas del jardín y el huerto.</p>
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

                        <div className={'mt-14'}>
                            <button
                                className={`bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                <div>
                                    <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                           height="20"/>
                                </div>
                                Guardar
                            </button>
                        </div>
                    </div>
                </section>
            </main>

        </section>

    )
}