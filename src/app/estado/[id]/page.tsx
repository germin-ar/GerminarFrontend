'use client'
import { BalooBhaina2 } from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/estado/[id]/estado.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlantService } from "@/services/PlantService";
import { PlantEdit, PlantHealth } from "@/interfaces/index";
import { useRouter } from "next/navigation";
import {AuthenticationService} from "@/services/AuthenticationService";

export default function EstadoPage({ params: { id } }: { params: { id: number } }) {

    const [plant, setPlant] = useState<PlantEdit | any>();
    const [plantaDiagnostico, setPlantaDiagnostico] = useState<PlantHealth | any>();
    const plantService = new PlantService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const auth = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const router = useRouter();

    useEffect(() => {
        auth.validateLogged()
        const fetchPlantHealthStatus = async () => {
            try {
                const dataHealthStatus = await plantService.getHealthPlantStatus(id);
                setPlantaDiagnostico(dataHealthStatus);

                const dataPlant = await plantService.getPlant(id);
                setPlant(dataPlant);
            } catch (e: any) {
                if (e.code === 'NotAuthorizedException') {
                    router.push('/login');
                } else {
                    console.error(e);
                }
            }
        };
        fetchPlantHealthStatus();
    }, []);

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
                                {plant &&
                                    <img
                                        data-testid="img"
                                        src={plant.images && plant.images.length > 0 && plant.images[plant.images.length - 1].url !== "" ? plant.images[plant.images.length - 1].url : ""}
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
                        {plantaDiagnostico && plantaDiagnostico.candidates.map((candidate: any, index: any) => (
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