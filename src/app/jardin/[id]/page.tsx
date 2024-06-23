"use client"
import stylesDescriptionPlants from "@/app/jardin/[id]/descripcion.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";


import {FaImages, FaRegIdCard, FaTrash} from "react-icons/fa";
import {RiPlantLine} from "react-icons/ri";
import {GiPlantRoots} from "react-icons/gi";
import {MdOutlineHealthAndSafety, MdOutlineWaterDrop} from "react-icons/md";
import {IoSunnyOutline} from "react-icons/io5";
import {CiCalendar, CiRuler} from "react-icons/ci";
import {FiAlertCircle} from "react-icons/fi";
import {FaLocationDot, FaRegNoteSticky} from "react-icons/fa6";
import {LuPencilLine} from "react-icons/lu";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/components/Spinner/Spinner";

/*export async function generateStaticParams(){
    return[{id: '1'}]
}*/

interface Plant {
    id: number;
    alias: string;
    creation_date: string | null;
    modification_date: string;
    planting_date: string | null;
    description: string | null;
    favorite: boolean | null;
    height: number | null;
    sun_exposure: string | null;
    notes: string | null;
    name_garden: string | null;
    expo: string | null;
    id_garden: number;
    plant_catalog_family_name: string;
    plant_catalog_genus: string;
    plant_catalog_watering_frecuency: string;
    plant_catalog_description: string;
    plant_catalog_common_name: string;
    plant_catalog_scientific_name: string;
    plant_catalog_sun_exposure: string;
    images: {
        url: string;
    }[];
    history: {
        id_plant: number;
        notes: string;
        height: number;
        alias: string;
        url_image: string;
        modified_at: string;
        id_diseases: number;
    }[];
}

interface PlantHistory{
        id_plant: number;
        notes: string;
        height: number;
        alias: string;
        url_image: string;
        modified_at: string;
        id_diseases: number;
}

export default function JardinPage({params: {id}}: { params: { id: number } }) {
    const router = useRouter();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [orderedHistory, setOrderedHistory] = useState<PlantHistory[]>([]);
    const [order, setOrder] = useState(false);


    const [showAll, setShowAll] = useState(false);
    const handleShowAllImages = () => {
        setShowAll(!showAll);
    };

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

                const sortedHistory = [...data.history].reverse();


                console.log(data);
                setOrder(true);
                setPlant(data);
                setOrderedHistory(sortedHistory);
            } catch (error) {
                console.error('Error fetching plant:', error);
            }
        };

        if (id) {
            fetchPlant();
        }
    }, [id]);

    const toggleOrder = () => {
        const reversedHistory = [...orderedHistory].reverse();
        setOrder(!order);
        setOrderedHistory(reversedHistory);
    };

    if (!plant) {
        return <Loading/>
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
                        {/*<Image className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                               src={plant.images[0].url} alt={`${id}`} width="450"
                               height="200"/>*/}

                        <img className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                             src={plant.images.length > 0 ? plant.images[plant.images.length - 1].url : ''} alt={`${id}`} width="450"
                             height="200"/>
                    </div>
                    <div className={`${stylesDescriptionPlants.item2}`}>
                        <div>
                            <div className="flex gap-2">
                                <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold  text-[#1F2325]`}>Alias:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.alias}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Nombre:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.plant_catalog_scientific_name}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <RiPlantLine className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Género:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.plant_catalog_genus}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <GiPlantRoots className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Familia:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.plant_catalog_family_name}</p>
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
                            <p className="text-[24px] pl-9">{plant.plant_catalog_sun_exposure}</p>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Frecuencia
                                    de riego:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.plant_catalog_watering_frecuency}</p>
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
                                    última modificación:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.modification_date.replace("T", " ").replace("Z", "")}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <CiCalendar className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Fecha de
                                    plantación:</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.planting_date?.slice(0, 10)}</p>
                        </div>

                    </div>

                    <div className={`${stylesDescriptionPlants.item4}`}>
                        <div>
                            <div className="flex gap-2">
                                <FiAlertCircle className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Descripción
                                    general</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.plant_catalog_description}</p>
                        </div>
                        <div>
                            <div className="flex gap-2 mt-4">
                                <FaLocationDot className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Ubicación</p>
                            </div>
                            <p className="text-[24px] pl-9">{plant.id_garden == null ? "-" : plant.name_garden}</p>
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
                        {/*<Image className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                               src={`/recomendacion/${id}.png`} alt={`${id}`} width="450"
                               height="200"/>*/}
                        <img className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                             src={plant.images.length > 0 ? plant.images[plant.images.length - 1].url : ''} alt={`${id}`} width="450"
                             height="200"/>
                    </div>
                    <button onClick={handleShowAllImages} className="font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]">Ver todas</button>
                    <div className="flex items-center p-2 gap-2 ">
                    {showAll &&(

                         plant.images.map((img, index) => (
                            <img
                                key={index}
                                src={img.url}
                                alt={`Image ${index}`}
                                className="chat-image"
                                width="200"
                                height="200"
                            />
                        ))
                    )}
                    </div>
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
            <section className="m-10">
                <button onClick={toggleOrder}
                        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Cambiar Orden: { order ?
                    `Más nuevo primero` : `Más viejo primero`}
                </button>
                <section>
                    <h2 className="text-lg font-semibold mb-2">Historial de la planta</h2>
                    <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        {orderedHistory.map((entry, index) => (
                            entry.alias === "imagen subida" ?
                                <li key={index} className="mb-10 ms-6 flex">
                                    <div className="flex-1">
                                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                            {entry.alias}
                                        </h3>
                                        <time>Imagen subida el: {entry.modified_at.slice(0, 19)}</time>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        {entry.url_image && (
                                            <img src={entry.url_image} alt="Plant Image"
                                                 className="h-32 w-auto object-cover rounded-lg"/>
                                        )}
                                    </div>
                                </li>
                                :
                                <li key={index} className="mb-10 ms-6 flex">
                                    <div className="flex-1">
                                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                            {entry.alias}
                                        </h3>
                                        <time>Modificado: {entry.modified_at.slice(0, 19)}</time>
                                        <p>Alias: {entry.alias}</p>
                                        <p>Altura: {entry.height}</p>
                                        <p>Notas: {entry.notes}</p>
                                        {/* TODO: Mapear enfermedades si es necesario */}
                                        {entry.id_diseases ? <p>Estado de salud: {entry.id_diseases}</p> : <p>-</p>}
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        {entry.url_image && entry.url_image === "buildear" ? (
                                                <p>-</p>

                                        ) :
                                            (
                                                <img src={entry.url_image} alt="Plant Image"
                                                     className="h-32 w-auto object-cover rounded-lg"/>
                                            )}
                                    </div>
                                </li>
                        ))}
                    </ol>
                </section>
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
