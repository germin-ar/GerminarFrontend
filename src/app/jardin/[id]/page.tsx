"use client"
import stylesDescriptionPlants from "@/app/jardin/[id]/descripcion.module.css";
import { BalooBhaina2 } from "@/app/ui/fonts";
import { FaImages, FaTrash } from "react-icons/fa";
import { RiIdCardLine, RiPlantLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
import { FaLocationDot, FaRegNoteSticky } from "react-icons/fa6";
import { LuCalendarDays, LuLeaf, LuPencilLine, LuRuler } from "react-icons/lu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlantService } from "@/services/PlantService";
import ToastSuccess from "@/components/Toasts/ToastSuccess";
import ToastWarning from "@/components/Toasts/ToastWarning";
import { PlantEdit, History } from "@/interfaces";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineWaterDrop } from "react-icons/md";
import Loading from "@/components/Spinner/Spinner";
import {AuthenticationService} from "@/services/AuthenticationService";

/*export async function generateStaticParams(){
    return[{id: '1'}]
}*/

export default function JardinPage({ params: { id } }: { params: { id: number } }) {
    const router = useRouter();

    const [plant, setPlant] = useState<PlantEdit | null>(null);
    const [orderedHistory, setOrderedHistory] = useState<History[]>([]);
    const [order, setOrder] = useState(false);

    const [popUps, setPopUps] = useState(false);

    const [showAll, setShowAll] = useState(false);
    const handleShowAllImages = () => {
        setShowAll(!showAll);
    };
    const plantService = new PlantService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastWarning, setShowToastWarning] = useState(false);
    const [message, setMessage] = useState('');
    const auth = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    useEffect(() => {
        auth.validateLogged()
        const fetchPlant = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/plants/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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

    const handleClick = () => {
        setPopUps(true);
    }

    const handleCancelDelete = () => {
        setPopUps(false);
    }

    const handleConfirmDelete = async () => {
        auth.validateLogged()
        try {
            await plantService.deletePlant(plant?.id)
            setMessage("Planta borrada exitosamente.")
            setShowToastSuccess(true);
            router.push("/jardin");
        } catch (error: any) {
            if (error.code === 'NotAuthorizedException') {
                router.push('/login');
            } else {
                setMessage("No se pudo borrar tu planta.");
                setShowToastWarning(true);
            }
        }
    }

    if (!plant) {
        return <Loading />
    }

    return (
        <section className={`${stylesDescriptionPlants.contenedor}`}>
            <div className="relative">
                <div className="fixed right-10 z-10">
                    {showToastSuccess && (
                        <ToastSuccess
                            message={`${message}`}
                            onClose={() => setShowToastSuccess(false)}
                        />
                    )}
                    {showToastWarning && (
                        <ToastWarning
                            message={`${message}`}
                            onClose={() => setShowToastWarning(false)}
                        />
                    )}
                </div>
            </div>
            <section className="m-10">
                <div className="flex justify-between flex-col md:flex-row md:gap-3">
                    <div className="flex-1">
                        <h1 className={`${BalooBhaina2.className} text-[#88BC43]`}>{plant && plant.alias}</h1>
                    </div>
                    <div className="flex-1 flex justify-end items-center gap-3 ">
                        <div className="flex gap-5 justify-between">
                            <Link href={`/jardin/${id}/editar`}
                                className={`bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                <LuPencilLine />
                                Editar
                            </Link>
                        </div>
                        <button
                            onClick={handleClick}
                            className="flex gap-2 items-center bg-[#BC4388] text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:bg-[#9A326E] active:bg-[#7A2455] active:scale-75">
                            <FaTrash />
                            Borrar
                        </button>

                        <Link href={`/jardin`}
                            className={`bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            Volver al jardín
                        </Link>
                        {popUps && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                                <div className="bg-white p-6 rounded shadow-lg">
                                    <p className="mb-4">¿Estás seguro de que querés borrar esta planta?</p>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleConfirmDelete}
                                            className="bg-red-500 w-14 text-white px-4 py-2 mr-2 rounded transition duration-300 ease-in-out transform hover:bg-red-600 active:bg-red-700 active:scale-75"
                                        >
                                            Sí
                                        </button>
                                        <button
                                            onClick={handleCancelDelete}
                                            className="bg-gray-500 w-14 text-white px-4 py-2 mr-2 rounded transition duration-300 ease-in-out transform hover:bg-gray-600 active:bg-gray-700 active:scale-75">
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`${stylesDescriptionPlants.planta} mt-4`}>
                    <div className={`${stylesDescriptionPlants.item1}`}>
                        {/*<Image className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                               src={plant.images[0].url} alt={`${id}`} width="450"
                               height="200"/>*/}

                        <img className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                            src={plant && plant.images.length > 0 ? plant.images[plant.images.length - 1].url : ''}
                            alt={`${plant?.alias}`} width="450"
                            height="200" />
                    </div>
                    <div className={`${stylesDescriptionPlants.item2} flex flex-col gap-5`}>
                        <div>
                            <div className="flex gap-2">
                                <RiIdCardLine className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold  text-[#1F2325]`}>Alias:</p>
                            </div>
                            <p className="pl-9">{plant && plant.alias}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <RiIdCardLine className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Nombre:</p>
                            </div>
                            <p className="pl-9">{plant && plant.plant_catalog_scientific_name}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <RiPlantLine className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Género:</p>
                            </div>
                            <p className="pl-9">{plant && plant.plant_catalog_genus}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <LuLeaf className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Familia:</p>
                            </div>
                            <p className="pl-9">{plant && plant.plant_catalog_family_name}</p>
                        </div>
                        {/*<div>
                            <div className="flex gap-2">
                                <MdOutlineHealthAndSafety className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Estado
                                    de
                                    salud:</p>
                            </div>
                            <p className="text-[24px] pl-9">a</p>
                        </div>*/}
                        <div>
                            <div className="flex gap-2">
                                <FiSun className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Exposición
                                    solar:</p>
                            </div>
                            <p className="pl-9">{plant && plant.plant_catalog_sun_exposure}</p>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Frecuencia
                                    de riego:</p>
                            </div>
                            <p className="pl-9">{plant && plant.plant_catalog_watering_frecuency}</p>
                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.item3} flex flex-col gap-5`}>
                        <div>
                            <div className="flex gap-2">
                                <LuRuler className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Altura:</p>
                            </div>
                            <p className="pl-9">{plant && plant.height}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <LuCalendarDays className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Fecha de
                                    última modificación:</p>
                            </div>
                            <p className="pl-9">{plant && plant.modification_date.replace("T", " ").replace("Z", "")}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <LuCalendarDays className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Fecha de
                                    plantación:</p>
                            </div>
                            <p className="pl-9">{plant && plant.planting_date?.slice(0, 10)}</p>
                        </div>

                    </div>

                    <div className={`${stylesDescriptionPlants.item4} flex flex-col gap-5`}>
                        <div>
                            <div className="flex gap-2">
                                <IoMdInformationCircleOutline className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Descripción
                                    general</p>
                            </div>
                            <p className="pl-9">{plant && plant.plant_catalog_description}</p>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <FaLocationDot className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Jardín</p>
                            </div>
                            <p className="pl-9">{plant && plant.id_garden == null ? "-" : plant && plant.name_garden}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="m-10 flex flex-col md:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-3">
                    <div className="flex gap-2">
                        <FaImages className={`${stylesDescriptionPlants.iconos}`} />
                        <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Imágenes</p>
                    </div>
                    <div className={`${stylesDescriptionPlants.item1}`}>
                        {/*<Image className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                               src={`/recomendacion/${id}.png`} alt={`${id}`} width="450"
                               height="200"/>*/}
                        <img className={`${stylesDescriptionPlants.sombraImagen} rounded-[5px]`}
                            src={plant && plant.images.length > 0 ? plant.images[plant.images.length - 1].url : ''}
                            alt={`${plant?.alias}`} width="450"
                            height="200" />
                    </div>
                    <button onClick={handleShowAllImages}
                        className={`bg-[#88BC43] w-max mt-5 flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                        Ver todas
                    </button>
                    <div className="flex items-center p-2 gap-2 ">
                        {showAll && (

                            plant && plant.images.map((img, index) => (
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
                        <FaRegNoteSticky className={`${stylesDescriptionPlants.iconos}`} />
                        <p className={`${BalooBhaina2.className} font-bold text-[#1F2325]`}>Notas
                            adicionales</p>
                    </div>
                    <div className={`${stylesDescriptionPlants.efectoHoja} ${stylesDescriptionPlants.sombraImagen} bg-[#EFE8D6]`}>
                        <p className="p-8 rounded">{plant && plant.notes}</p>
                    </div>
                </div>
            </section>
            <section className="m-10">
                <button onClick={toggleOrder}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Cambiar Orden: {order ?
                        `Más nuevo primero` : `Más viejo primero`}
                </button>
                <section>
                    <h3 className="text-[#1F2325]">Historial de tu planta: {plant && plant.alias}</h3>
                    <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        {orderedHistory.map((entry, index) => (
                            entry.alias === "imagen subida" ?
                                <li key={index} className="mb-10 ms-6 flex">
                                    <div className="flex-1">
                                        <h3 className="flex items-center mb-1 text-lg font-semibold">
                                            {entry.alias}
                                        </h3>
                                        <time>Imagen subida el: {entry.modified_at.slice(0, 19)}</time>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        {entry.url_image && (
                                            <img src={entry.url_image} alt="Plant Image"
                                                className="h-32 w-auto object-cover rounded-lg" />
                                        )}
                                    </div>
                                </li>
                                :
                                <li key={index} className="mb-10 ms-6 flex">
                                    <div className="flex-1">
                                        <time>Modificado: {entry.modified_at.slice(0, 19)}</time>
                                        <p>Alias: {entry.alias}</p>
                                        <p>Altura: {entry.height}</p>
                                        <p>Notas: {entry.notes}</p>
                                        {/* TODO: Mapear enfermedades si es necesario */}
                                        {/*entry.id_diseases ? <p>Estado de salud: {entry.id_diseases}</p> : <p>-</p>*/}
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        {entry.url_image && entry.url_image === "buildear" ? (
                                            <p>-</p>

                                        ) :
                                            (
                                                <img src={entry.url_image} alt="Plant Image"
                                                    className="h-32 w-auto object-cover rounded-lg" />
                                            )}
                                    </div>
                                </li>
                        ))}
                    </ol>
                </section>
            </section>
            <div className="flex w-full gap-5 justify-between m-10 inline-block">
                <Link href={`/jardin/${id}/editar`}
                    className={`bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                    <LuPencilLine />
                    Editar
                </Link>
            </div>
        </section>

    )

}
