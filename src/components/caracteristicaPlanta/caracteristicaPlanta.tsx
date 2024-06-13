"use client"
import Image from "next/image";

import stylesResultado from "@/app/resultado/[id]/resultado.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import styles from "@/app/home.module.css";
import React, {useEffect, useState} from "react";

import Link from "next/link";
import Loading from "@/components/Spinner/Spinner";

interface PlantData {
    id: string;
    language: string;
    candidates: Candidate[];
    image: Image;
}



interface Candidate {
    score: number;
    specie: Species;
    plant_data: PlantDataDetail;
}

interface Species {
    scientific_name: string;
    genus_name: string;
    family_name: string;
    common_names: string[];
}




interface PlantDataDetail {
    description: string;
    height: number | null;
    fertilizer: string;
    watering: string;
    soil: string;
    sun_exposure: string | null;
    insecticide: string;
    temperature_max: number | null;
    temperature_min: number | null;
    tips: string;
    harvest_time: string;
    growth_season: string;
    planting_time: string;
    pruning:string;
}

interface Image {
    uuid: string;
    url: string;
}

interface IdentificarPlanta{
    planta:string
    espacio:string
}

export default function CaracteristicaPlanta(props:IdentificarPlanta) {
    const { planta, espacio } = props
    const defaultPlantData: Species = {
        scientific_name: '',
        genus_name: '',
        family_name: '',
        common_names: [],
    };

    const [plantData, setPlantData] = useState<PlantData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/v1/candidates/${planta}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: PlantData) => {
                setPlantData(data);
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [planta]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="md:h-[453px] flex items-center justify-center flex-col gap-2 my-3">
            <h3 className={"text-gray-700"}>¡Oh no! Algo salió mal. Intenta identificar la imagen de nuevo, por favor.</h3>
            <Image src="/algo-salio-mal.png" alt="mas-icon" width="300"
                   height="200"/>
            <Link href="/" className="bg-[#88BC43] text-white py-2 px-4 rounded">Reintentar</Link>
            </div>;
    }

    return (
        <section className="max-w-[1300px] m-auto">

            <main className={`${styles.contenedor}`}>
                <section className={"m-10"}>
                    <div
                        className={`flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center m-12 gap-12`}>


                        <div className={'flex flex-col items-center gap-10'}>
                            <h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>{}</h1>
                            <div className="flex-1 flex items-start flex-col gap-5">
                                {/*<Image src={`${plantData?.image.url}`} alt="Albahaca-sana" width="500"
                                       height="500"/>*/}
                                <img src={`${plantData?.image.url}`}
                                     width="500"
                                     height="500"
                                    alt={`${plantData?.candidates[0].specie.common_names[0]}`}/>
                                <Link href={`/registro/${planta}`}
                                    className={`bg-[#88BC43] text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                               height="20"/>
                                    </div>
                                    Guardar
                                </Link>
                            </div>
                        </div>
                        <div className={'table-container'}>
                            <table className={'vertical-header-table'}>
                                <tbody>
                                <tr>
                                    <th className={'p-10 border'}>Nombre científico</th>
                                    <td className={'p-10 border'}><p>{plantData?.candidates[0].specie.scientific_name}</p></td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Nombres comunes</th>
                                    <td className={'p-10 border'}>
                                        {plantData?.candidates[0].specie.common_names.map((name, index) => (
                                            <p key={index}>{name}</p>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Género</th>
                                    <td className={'p-10 border'}><p>{plantData?.candidates[0].specie.genus_name}</p></td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Familia</th>
                                    <td className={'p-10 border'}><p>{plantData?.candidates[0].specie.family_name}</p></td>
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
                        <p className="text-justify">
                            {plantData?.candidates[0].plant_data.description}
                        </p>
                        {/*<p className={'text-justify'}>
                            La albahaca, conocida científicamente como Ocium Basilicum, es una hierba aromática
                            originaria de la India, Irán y de otras regiones de Asia, de intenso aroma y color. Además
                            de proporcionar belleza al jardín y la terraza, ofrece numerosos beneficios como condimento
                            en la cocina, hierba saludable y protección para otras plantas del jardín y el huerto.</p>*/}
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
                                        {/*<li>Tallo de 30 a 50 cm de altura</li>
                                        <li>Hojas de 3 a 5 cm de longitud</li>*/}
                                        <li>{plantData?.candidates[0].plant_data.height}</li>
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
                                    {/*<p className={`${stylesResultado.texto}`}>Aplicar un fertilizante
                                        equilibrado una vez al mes durante la temporada de crecimiento.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.fertilizer}</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/riego-icon.png" alt="riego-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Riego</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Mantener el suelo ligeramente
                                        húmedo, evitando el encharcamiento.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.watering}</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tierra-icon.png" alt="tierra-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Tierra</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Requiere un suelo bien drenado y
                                        fértil, preferiblemente con un pH entre 6.0 y 7.5.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.soil}</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/exposolar-icon.png" alt="exposolar-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Exposición solar</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Luz solar directa por la mañana
                                        y sombra parcial por la tarde.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.sun_exposure}</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/insecticida-icon.png" alt="insecticida-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Insecticida</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Controlar plagas con
                                        insecticidas naturales como jabón insecticida o aceite de neem.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.insecticide}</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temperatura-icon.png" alt="temperatura-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Temperatura adecuada</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Prefiere temperaturas cálidas
                                        entre 18-25°C, evitando temperaturas extremadamente frías.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.temperature_min}</p>
                                    <p>{plantData?.candidates[0].plant_data.temperature_max}</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temporada-icon.png" alt="temporada-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Temporada</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Se puede sembrar en primavera
                                        después de que haya pasado el
                                        riesgo de heladas.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.harvest_time}</p>
                                    <p>{plantData?.candidates[0].plant_data.growth_season}</p>
                                    <p>{plantData?.candidates[0].plant_data.planting_time}</p>
                                </div>
                            </div>


                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/podado-icon.png" alt="podado-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Podado</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Podar cada 15 días
                                        aproximadamente, para conseguir un mayor crecimiento y que la recolecta sea más
                                        abundante.</p>*/}
                                    <p>{plantData?.candidates[0].plant_data.pruning}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={''}>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Consejos</h2>
                        <ul className={`list-disc list-inside flex flex-col gap-8`}>
                            {/*<li>La albahaca es más aromática cuando se utiliza fresca, así que arranca las hojas justo
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
                            </li>*/}
                            <li>{plantData?.candidates[0].plant_data.tips}</li>
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