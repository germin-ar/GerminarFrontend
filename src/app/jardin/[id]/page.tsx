"use client"
import stylesDescriptionPlants from "@/app/jardin/[id]/descripcion.module.css";
import Image from "next/image";
import {BalooBhaina2} from "@/app/ui/fonts";


import {FaRegIdCard} from "react-icons/fa";
import {RiPlantLine} from "react-icons/ri";
import {GiPlantRoots} from "react-icons/gi";
import {MdOutlineHealthAndSafety} from "react-icons/md";
import {IoSunnyOutline} from "react-icons/io5";
import {MdOutlineWaterDrop} from "react-icons/md";
import {CiRuler} from "react-icons/ci";
import {CiCalendar} from "react-icons/ci";
import {FiAlertCircle} from "react-icons/fi";
import {FaLocationDot} from "react-icons/fa6";
import {FaImages} from "react-icons/fa";
import {FaRegNoteSticky} from "react-icons/fa6";
import {LuPencilLine} from "react-icons/lu";
import {FaTrash} from "react-icons/fa";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

/*export async function generateStaticParams(){
    return[{id: '1'}]
}*/

interface Plant {
    id: number;
    alias: string;
    creationDate: string;
    modificationDate: string;
    plantingDate: string;
    description: string;
    favorite: boolean;
    height: number;
    sunExposure: string;
    notes: string;
    nameGarden: string;
    expo: string;
    idGarden: number;
    userId: number;
}

export default function JardinPage({params: {id}}: { params: { id: number } }) {
    const router = useRouter();
    const [plant, setPlant] = useState<Plant | null>(null);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/plants/${id}`, {
                    headers: {
                        'id-user': '1'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch plant');
                }
                const data = await response.json();
                console.log(data);
                setPlant(data);
            } catch (error) {
                console.error('Error fetching plant:', error);
            }
        };

        if (id) {
            fetchPlant();
        }
    }, [id]);

    if (!plant) {
        return <div>Loading...</div>;
    }




    return (
        <section className={`${stylesDescriptionPlants.contenedor}`}>
            <section className="m-10">
                <div className="flex justify-between flex-col md:flex-row md:gap-3">
                    <div className="flex-1">
                        <h1 className={`${BalooBhaina2.className} text-[50px] text-[#88BC43]`}>{plant.alias}</h1>
                    </div>
                    <div className="flex-1 flex justify-end items-center gap-3 ">
                        <Link href={`/jardin/${id}/editar`}
                            className="py-2 px-4 flex items-center gap-2 font-bold  rounded text-white bg-[#88BC43]">
                            <LuPencilLine className="w-[15px] h-[15px] "/>
                            Editar
                        </Link>
                        <button
                            className="py-2 px-4 flex items-center gap-2 font-bold  rounded text-white bg-[#BC4388]">
                            <FaTrash className="w-[15px] h-[15px] "/>
                            Borrar
                        </button>
                        <Link href={`/jardin`}
                              className="py-2 px-4 flex items-center gap-2 font-bold  rounded text-white bg-[#88BC43]">
                            Volver al jardín
                        </Link>
                    </div>
                </div>
                <div className={`${stylesDescriptionPlants.planta} mt-4`}>
                    <div className={`${stylesDescriptionPlants.item1}`}>
                        <Image className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                               src={`/recomendacion/${id}.png`} alt={`${id}`} width="450"
                               height="200"/>
                    </div>
                    <div className={`${stylesDescriptionPlants.item2}`}>
                        <div>
                            <div className="flex gap-2">
                                <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Nombre:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.alias}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <RiPlantLine className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Tipo:</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <GiPlantRoots className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Familia:</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <MdOutlineHealthAndSafety className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Estado
                                    de
                                    salud:</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <IoSunnyOutline className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Exposición
                                    solar:</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Frecuencia
                                    de riego:</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.item3}`}>
                        <div>
                            <div className="flex gap-2">
                                <CiRuler className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Altura:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.height}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <CiCalendar className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Fecha de
                                    plantación:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.plantingDate}</p>
                        </div>

                    </div>
                    <div className={`${stylesDescriptionPlants.item4}`}>
                        <div>
                            <div className="flex gap-2">
                                <FiAlertCircle className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Descripción
                                    general</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.description}</p>
                        </div>
                        <div>
                            <div className="flex gap-2 mt-4">
                                <FaLocationDot className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Ubicación</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="m-10 flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                    <div className="flex gap-2">
                        <FaImages className={`${stylesDescriptionPlants.iconos}`}/>
                        <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Imágenes</p>
                    </div>
                    <div className={`${stylesDescriptionPlants.item1}`}>
                        <Image className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                               src={`/recomendacion/${id}.png`} alt={`${id}`} width="450"
                               height="200"/>

                    </div>
                    <button className="font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]">Ver todas</button>
                </div>
                <div className="flex-1 flex gap-2 flex-col">
                    <div className="flex gap-2">
                        <FaRegNoteSticky className={`${stylesDescriptionPlants.iconos}`}/>
                        <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Notas
                            adicionales</p>
                    </div>
                    <div className={`${stylesDescriptionPlants.efectoHoja} bg-[#EFE8D6]`}>
                        <p className="text-[24px] p-8 rounded">{plant.notes}</p>
                    </div>
                </div>
            </section>
            <div className="m-10">

                <button className="flex items-center gap-2 font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]">
                    <LuPencilLine className="w-[15px] h-[15px] "/>
                    Editar
                </button>
            </div>
        </section>
    )

}
