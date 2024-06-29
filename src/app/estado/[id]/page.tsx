'use client'
import { BalooBhaina2 } from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/estado/[id]/estado.module.css";
import HomeStyles from "@/app/home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Health {
    is_healthy: boolean
    candidates: Candidate[]
}

export interface Candidate {
    name: string
    scientific_name_disease: string
    type: string
    common_name: string
    kingdom_taxonomy: string
    entity_id: string
    class_taxonomy: string
    genus_taxonomy: string
    order_taxonomy: string
    family_taxonomy: string
    phylum_taxonomy: string
    wiki_urls: string
}

export interface Plant {
    id: number
    alias: string
    creation_date: string
    modification_date: string
    planting_date: string
    description: string
    favorite: boolean
    height: number
    sun_exposure: string
    notes: string
    name_garden: string
    expo: string
    id_garden: number
    plant_catalog_family_name: string
    plant_catalog_genus: string
    plant_catalog_watering_frecuency: string
    plant_catalog_description: string
    plant_catalog_common_name: string
    plant_catalog_scientific_name: string
    images: Image[]
    plant_catalog_sun_exposure: string
    history: History[]
}

export interface Image {
    url: string
}

export interface History {
    id_plant: number
    notes: string
    height: number
    alias: string
    url_image: string
    modified_at: string
    id_diseases: number
}

export default function EstadoPage({ params: { id } }: { params: { id: number } }) {

    const [plant, setPlant] = useState<Plant>();
    const [plantaDiagnostico, setPlantaDiagnostico] = useState<Health>();
 
     const fetchPlants = async () => {
         try {
             const userId = 1;
             const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/plants/${id}/health-status`, {
                 headers: {
                     'id-user': userId.toString(),
                 },
             });
             if (!response.ok) {
                 throw new Error('Failed to fetch gardens');
             }
             const data = await response.json();
             console.log(data)
 
             console.log(data)
             setPlantaDiagnostico(data);
         } catch (error) {
             console.error('Error fetching gardens:', error);
         }
     };
 
     useEffect(() => {
         fetchPlants()
         fetchPlantData()
     }, []);

    const fetchPlantData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/plants/${id}`, {
                headers: {
                    'id-user': '1'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch plant data');
            }
            const plant = await response.json();
            setPlant(plant);
            console.log(plant)
        } catch (error) {
            console.error('Error fetching plant data:', error);
        }
    };

    return (
        <>
            <section>
                <div
                    className={`flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center my-12 gap-12`}>
                    <div className={'flex-1 flex flex-col items-center gap-5'}>
                        <h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Diagnóstico
                            de tu planta</h1>
                        <div className={`flex-1 flex items-start flex-col gap-5`}>
                            <div>
                                { plant &&
                                <img src={ plant.images && plant.images.length > 0 && plant.images[plant.images.length - 1].url !== "" ? plant.images[plant.images.length - 1].url : ""}
                                    className={`sm:w-96 rounded shadow-lg border-2 border-green-800`}
                                    width="250"
                                    height="250" />
                                }
                            </div>
                            <div className="flex w-full gap-5 justify-between">
                                <Link href={`/jardin/${id}/editar`}
                                    className={`${styles.botonCards} bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                            height="20" />
                                    </div>
                                    Guardar planta
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/*<div className={`${styles.tabla} flex-1  text-2xl`}>*/}
                    {/*    <table className={'vertical-header-table'}>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <th className={`${styles.tablaCampos} p-10 border`}>Nombre científico</th>*/}
                    {/*            <td className={`${styles.tablaCampos} p-10 border`}>Ocimum basilicum</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th className={`${styles.tablaCampos} p-10 border`}>Nombres comunes</th>*/}
                    {/*            <td className={`${styles.tablaCampos} p-10 border`}>Albahaca, Alhábega, Alfábega,*/}
                    {/*                Basílico*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th className={`${styles.tablaCampos} p-10 border`}>Género</th>*/}
                    {/*            <td className={`${styles.tablaCampos} p-10 border`}>Ocimum</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th className={`${styles.tablaCampos} p-10 border`}>Familia</th>*/}
                    {/*            <td className={`${styles.tablaCampos} p-10 border`}>Lamiaceae</td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                </div>
            </section>
            <section className={'flex flex-col gap-12 m-20'}>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className={`${BalooBhaina2.className} text-[#88BC43]`}>Estado de
                        salud</h2>
                    <div className={`flex items-center gap-5`}>
                        <div>
                            <Image className={`w-14 sm:w-20`} src="/estado/planta.png" alt="estado" width="100" height="100" />
                        </div>
                        <div>
                            {
                                !plantaDiagnostico?.is_healthy ? <p>¡Tu planta necesita ayuda!</p> : <p>¡Tu planta parece sana!</p>
                            }

                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-lg p-6">
                    {plantaDiagnostico?.candidates[0] && (
                        <>
                            <h2 className={`${BalooBhaina2.className} text-[#88BC43]`}>Problema detectado</h2>
                            <h3 className={`${BalooBhaina2.className} `}>Enfermedad de la {plantaDiagnostico.candidates[0].name}</h3>
                            <p>
                                Esta enfermedad también conocida como <span className="font-bold"> {plantaDiagnostico.candidates[0].common_name}</span> afecta a las plantas, siendo causada por el organismo <span className="font-bold"> {plantaDiagnostico.candidates[0].scientific_name_disease}</span>. Esta enfermedad es clasificada como <span className="font-bold"> {plantaDiagnostico.candidates[0].type}</span> y se encuentra dentro del reino <span className="font-bold"> {plantaDiagnostico.candidates[0].kingdom_taxonomy}</span>. Según su taxonomía, pertenece al filo <span className="font-bold"> {plantaDiagnostico.candidates[0].phylum_taxonomy}</span>, clase <span className="font-bold"> {plantaDiagnostico.candidates[0].class_taxonomy}</span>, orden <span className="font-bold"> {plantaDiagnostico.candidates[0].order_taxonomy}</span>, familia <span className="font-bold"> {plantaDiagnostico.candidates[0].family_taxonomy}</span> y género <span className="font-bold"> {plantaDiagnostico.candidates[0].genus_taxonomy}</span>.
                            </p>
                            <p>Para obtener más información detallada sobre esta enfermedad, podés consultar este <Link className="underline" href={`${plantaDiagnostico.candidates[0].wiki_urls}`} target="_blank">enlace</Link> a Wikipedia.</p>

                        </>
                    )}
                </div>


                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className={`${BalooBhaina2.className} text-[#88BC43]`}>Posibles enfermedades</h2>
                    <p>Tené cuidado, estas son posibles enfermedades que pueden afectar tu planta: </p>
                    <ol>
                        {plantaDiagnostico && plantaDiagnostico.candidates.map((candidate, index) => (
                            <div key={index}>
                                {index !== 0 && (
                                    <>
                                        <li className="font-bold list-disc list-inside"> {candidate.name}</li>
                                    </>
                                )}
                            </div>
                        ))}
                    </ol>

                </div>

            </section>
        </>
    )
}