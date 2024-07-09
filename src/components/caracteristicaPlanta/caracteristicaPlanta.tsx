"use client"
import Image from "next/image";
import stylesResultado from "@/app/resultado/[id]/resultado.module.css";
import { BalooBhaina2 } from "@/app/ui/fonts";
import styles from "@/app/home.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Spinner/Spinner";
import { CandidatesService } from "@/services/CandidatesService";
import { PlantCatalogService } from "@/services/PlantCatalogService";
import { PlantCaracts, Specie, PlantSuggestion } from '@/interfaces/index';
import { useRouter } from "next/navigation";
import {AuthenticationService} from "@/services/AuthenticationService";

interface IdentificarPlanta {
    planta: string
    espacio: string
    sugerencia: string
}

export default function CaracteristicaPlanta(props: IdentificarPlanta) {

    const identificarPlanta: IdentificarPlanta = {
        planta: "Tomate",
        espacio: "Jardín o huerto",
        sugerencia: "Asegúrese de proporcionar un buen drenaje y pleno sol para obtener una cosecha óptima."
    };

    const { planta: planta, espacio, sugerencia } = props
    const router = useRouter();

    const [showPopup, setShowPopup] = useState(false);
    const handleClick = () => {
        setShowPopup(!showPopup);
    };
    const [plantCaracts, setPlantCaracts] = useState<PlantCaracts | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [plantaSugerencia, setPlantaSugerencia] = useState<PlantSuggestion | null>(null);
    const [error, setError] = useState<string | null>(null);
    const candidatesService = new CandidatesService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const plantCatalogService = new PlantCatalogService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const auth = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    useEffect(() => {
        auth.isLogging()


        if (sugerencia === "no") {
            setLoading(true);
            setError(null);

            const fetchGardens = async () => {
                try {
                    const data = await candidatesService.getCandidates(`${planta}`);
                    setPlantCaracts(data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setError("error");
                    setLoading(false);
                }
                setLoading(false);
            };
            fetchGardens();

        } else if (sugerencia === 'si') {
            auth.isLogging()
            const fetchPlantCatalog = async () => {
                try {
                    const data = await plantCatalogService.getPlantCatalog(`${planta}`);
                    setPlantaSugerencia(data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setError("error");
                    setLoading(false);
                }
                setLoading(false);
            };
            fetchPlantCatalog();
        }

    }, [planta]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="md:h-[453px] flex items-center justify-center flex-col gap-2 my-3">
            <h3 className={"text-gray-700"}>¡Oh no! Algo salió mal. Volvé más tarde, por favor.</h3>
            <Image src="/algo-salio-mal.png" alt="mas-icon" width="300"
                height="200" />
            <Link href="/" className={`${styles.botonCards} bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>Reintentar</Link>
        </div>
    }

    const handleGoBack = () => {
        router.back();
    };

    return (
        <section className="max-w-[1300px] m-auto">

            <section className={`${styles.contenedor}`}>

                <section className={"m-10"}>
                    <button
                        className={`${styles.botonCards} w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}
                        onClick={handleGoBack}>Volver
                    </button>
                    <div
                        className={`flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center m-12 gap-12`}>


                        <div className={'flex flex-col items-center gap-10'}>
                            <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>{plantCaracts?.candidates[0].specie.scientific_name}</h2>
                            <div className="flex-1 flex items-start flex-col gap-5">
                                {/*<Image src={`${plantData?.image.url}`} alt="Albahaca-sana" width="500"
                                       height="500"/>*/}
                                {
                                    plantCaracts && (
                                        <img src={`${plantCaracts?.image.url}`}
                                            className="rounded-lg shadow-lg"
                                            width="500"
                                            height="500"
                                            alt={`${plantCaracts?.candidates[0].specie.common_names[0]}`} />
                                    )
                                }
                                {
                                    plantaSugerencia && (
                                        <img src={`${plantaSugerencia.url_image}`}
                                            className="rounded-lg shadow-lg"
                                            width="500"
                                            height="500"
                                            alt={`${plantaSugerencia.url_image}`} />
                                    )
                                }
                                {
                                    plantCaracts && (
                                        <Link href={`/registro/${planta}`}
                                            className={`${styles.botonCards} w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                            <div>
                                                <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                                    height="20" />
                                            </div>
                                            Guardar planta
                                        </Link>
                                    )
                                }
                                {
                                    sugerencia === 'si' && (
                                        <div className="flex items-center justify-between flex-row gap-2">
                                            <p> ¿Querés saber saber cómo plantar?</p>
                                            <Link href={`/biblioteca`}
                                                className={`${styles.botonCards} mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                                Empezar
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={'table-container'}>
                            <table className={'vertical-header-table'}>
                                <tbody>
                                    <tr>
                                        <th className={'md:p-10 p-2 border text-nowrap'}><p>Nombre científico</p></th>
                                        {
                                            plantCaracts && (
                                                <td className={'md:p-10 p-2 border'}>
                                                    <p>{plantCaracts?.candidates[0].specie.scientific_name}</p></td>
                                            )
                                        }
                                        {
                                            plantaSugerencia && (
                                                <td className={'md:p-10 p-2 border'}><p>{plantaSugerencia.scientific_name}</p>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <th className={'md:p-10 p-2 border text-nowrap'}><p>Nombres comunes</p></th>
                                        {
                                            plantCaracts && (
                                                <td className={'md:p-10 p-2 border'}>
                                                    {plantCaracts?.candidates[0].specie.common_names.map((name, index) => (
                                                        <p key={index}>{name}</p>
                                                    ))}
                                                </td>
                                            )
                                        }
                                        {
                                            plantaSugerencia && (
                                                <td className={'md:p-10 p-2 border'}><p>{plantaSugerencia.common_name}</p></td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <th className={'md:p-10 p-2 border text-nowrap'}><p>Género</p></th>
                                        {
                                            plantCaracts && (
                                                <td className={'md:p-10 p-2 border'}>
                                                    <p>{plantCaracts?.candidates[0].specie.genus_name}</p></td>
                                            )
                                        }
                                        {
                                            plantaSugerencia && (
                                                <td className={'md:p-10 p-2 border'}><p>{plantaSugerencia.genus}</p></td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <th className={'md:p-10 p-2 border text-nowrap'}><p>Familia</p></th>
                                        {
                                            plantCaracts && (
                                                <td className={'md:p-10 p-2 border'}>
                                                    <p>{plantCaracts?.candidates[0].specie.family_name}</p></td>
                                            )
                                        }
                                        {
                                            plantaSugerencia && (
                                                <td className={'md:p-10 p-2 border'}><p>{plantaSugerencia.family_name}</p></td>
                                            )
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className={'flex flex-col gap-12'}>

                    {
                        plantCaracts && (
                            <div className={'bg-white rounded-lg shadow-lg p-6'}>
                                <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Estado de
                                    salud</h2>
                                <div className={`flex items-center gap-5`}>
                                    <div>
                                        <Image className={`w-14 sm:w-20`} src="/resultado/planta-sana-icon.png"
                                            alt="Planta-sana-icon" width="80" height="80" />
                                    </div>
                                    <div>
                                        {plantCaracts?.health.is_healty ? <p>¡Tu planta parece sana!</p> : <p>¡Tu planta necesita ayuda!</p>}
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className={'bg-white rounded-lg shadow-lg p-6'}>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Descripción general</h2>

                        {
                            plantCaracts && (
                                <p className="text-justify">
                                    {plantCaracts?.candidates[0].plant_data.description}
                                </p>)
                        }
                        {
                            plantaSugerencia && (
                                <p className="text-justify">
                                    {plantaSugerencia.description}
                                </p>)
                        }
                        {/*<p className={'text-justify'}>
                            La albahaca, conocida científicamente como Ocium Basilicum, es una hierba aromática
                            originaria de la India, Irán y de otras regiones de Asia, de intenso aroma y color. Además
                            de proporcionar belleza al jardín y la terraza, ofrece numerosos beneficios como condimento
                            en la cocina, hierba saludable y protección para otras plantas del jardín y el huerto.</p>*/}
                    </div>

                    <div className={'bg-white rounded-lg shadow-lg p-6'}>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Características</h2>
                        <div className={'flex flex-wrap'}>
                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/tamaño-icon.png" alt="tamaño-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col items-start'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Tamaño</h3>
                                    {/*<li>Tallo de 30 a 50 cm de altura</li>
                                        <li>Hojas de 3 a 5 cm de longitud</li>*/}
                                    {
                                        plantCaracts && (
                                            <p>La altura máxima es de <span className="font-bold">{plantCaracts?.candidates[0].plant_data.height}<span className="text-base">cm</span></span></p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>La altura máxima es de <span className="font-bold">{plantaSugerencia.max_size}<span className="text-base">cm</span></span></p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/fertilizante-icon.png" alt="fertilizante-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Fertilizante</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Aplicar un fertilizante
                                        equilibrado una vez al mes durante la temporada de crecimiento.</p>*/}
                                    {
                                        plantCaracts && (
                                            <p>{plantCaracts?.candidates[0].plant_data.fertilizer}</p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>{plantaSugerencia.fertilizer}</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/riego-icon.png" alt="riego-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Riego</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Mantener el suelo ligeramente
                                        húmedo, evitando el encharcamiento.</p>*/}
                                    {
                                        plantCaracts && (
                                            <p>{plantCaracts?.candidates[0].plant_data.watering}</p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>{plantaSugerencia.watering_frecuency}</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/tierra-icon.png" alt="tierra-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Tierra</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Requiere un suelo bien drenado y
                                        fértil, preferiblemente con un pH entre 6.0 y 7.5.</p>*/}
                                    {
                                        plantCaracts && (
                                            <p>{plantCaracts?.candidates[0].plant_data.soil}</p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>{plantaSugerencia.soil}</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/exposolar-icon.png" alt="exposolar-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Exposición solar</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Luz solar directa por la mañana
                                        y sombra parcial por la tarde.</p>*/}

                                    {
                                        plantCaracts && (
                                            <p>{plantCaracts?.candidates[0].plant_data.sun_exposure}</p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>{plantaSugerencia.sun_light}</p>
                                        )
                                    }

                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/insecticida-icon.png" alt="insecticida-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Insecticida</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Controlar plagas con
                                        insecticidas naturales como jabón insecticida o aceite de neem.</p>*/}
                                    {
                                        plantCaracts && (
                                            <p>{plantCaracts?.candidates[0].plant_data.insecticide}</p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>{plantaSugerencia.insecticide}</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/temperatura-icon.png" alt="temperatura-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Temperatura adecuada</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Prefiere temperaturas cálidas
                                        entre 18-25°C, evitando temperaturas extremadamente frías.</p>*/}
                                    {
                                        plantCaracts && (
                                            <p>Entre <span className="font-bold">{plantCaracts?.candidates[0].plant_data.temperature_min}°C</span> y <span className="font-bold">{plantCaracts?.candidates[0].plant_data.temperature_max}°C</span></p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>Entre <span className="font-bold">{plantaSugerencia.temperature_min}°C</span> y <span className="font-bold">{plantaSugerencia.temperature_max}°C</span></p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/temporada-icon.png" alt="temporada-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Temporadas</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Se puede sembrar en primavera
                                        después de que haya pasado el
                                        riesgo de heladas.</p>*/}
                                    {
                                        plantCaracts && (
                                            <>
                                                <p><span className="font-bold">De siembra:</span> {plantCaracts?.candidates[0].plant_data.planting_time}</p>
                                                <p><span className="font-bold">De crecimiento:</span> {plantCaracts?.candidates[0].plant_data.growth_season}</p>
                                                <p><span className="font-bold">De cosecha:</span> {plantCaracts?.candidates[0].plant_data.harvest_time}</p>
                                            </>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <>
                                                <p><span className="font-bold">De siembra:</span> {plantaSugerencia.planting_time}</p>
                                                <p><span className="font-bold">De crecimiento:</span> {plantaSugerencia.growth_season}</p>
                                                <p><span className="font-bold">De cosecha:</span> {plantaSugerencia.harvest_time}</p>
                                            </>
                                        )
                                    }
                                </div>
                            </div>


                            <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                <div>
                                    <Image className="max-w-[100px] min-w-[100px]" src="/resultado/podado-icon.png" alt="podado-icon" width="150"
                                        height="150" />
                                </div>
                                <div className={'flex flex-col'}>
                                    <h3 className={`${BalooBhaina2.className}`}>Podado</h3>
                                    {/*<p className={`${stylesResultado.texto}`}>Podar cada 15 días
                                        aproximadamente, para conseguir un mayor crecimiento y que la recolecta sea más
                                        abundante.</p>*/}
                                    {
                                        plantCaracts && (
                                            <p>{plantCaracts?.candidates[0].plant_data.pruning}</p>
                                        )
                                    }
                                    {
                                        plantaSugerencia && (
                                            <p>{plantaSugerencia.pruning}</p>
                                        )
                                    }
                                </div>
                            </div>


                            {
                                plantaSugerencia && plantaSugerencia.toxic && (
                                    <div className={'mt-16 flex items-center gap-8 md:w-2/4'}>
                                        <div>
                                            <Image className="max-w-[100px] min-w-[100px]" src="/resultado/toxicidad-icon.png" alt="toxicidad-icon" width="150"
                                                height="150" />
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <h3 className={`${BalooBhaina2.className}`}>Toxicidad</h3>
                                            {/*<p className={`${stylesResultado.texto}`}>Podar cada 15 días
                                            aproximadamente, para conseguir un mayor crecimiento y que la recolecta sea más
                                            abundante.</p>*/}
                                            {
                                                <p>{plantaSugerencia.toxic}</p>
                                            }
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    <div className={'bg-white rounded-lg shadow-lg p-6 mb-2'}>
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
                            {
                                plantCaracts && (
                                    <li>{plantCaracts?.candidates[0].plant_data.tips}</li>
                                )
                            }
                            {
                                plantaSugerencia && (
                                    <li>{plantaSugerencia.tips}</li>
                                )
                            }
                        </ul>

                    </div>
                    {
                        plantCaracts && (
                            <div className={'flex justify-end mb-5'}>
                                <Link href={`/registro/${planta}`}
                                    className={`${styles.botonCards} w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                            height="20" />
                                    </div>
                                    Guardar planta
                                </Link>
                            </div>
                        )
                    }
                </section>
            </section>
        </section>
    )
}
