"use client"
import stylesJardin from "@/app/jardin/jardin.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import {CiCalendar} from "react-icons/ci";
import {useEffect, useState} from "react";
import {IoIosHome} from "react-icons/io";
import {PiPottedPlantFill} from "react-icons/pi";
import {FaClock, FaHeart} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Plant {
    id: number;
    alias: string;
    creation_date: string;
    modification_date: string;
}
interface Garden {
    id: number;
    name: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    plants: {
        id: number;
        alias: string;
        is_active: boolean;
        creation_date: string;
        modification_date: string;
    }[];
    is_active: boolean | null;
}

export default function JardinPage() {


    const [filtro, setFiltro] = useState('');

    const handleFiltroChange = (e: any) => {
        setFiltro(e.target.value);
    };

    /*const filteredData = data.filter((categoria) => {
        const categoriaIncluida = categoria.categoria.toLowerCase().includes(filtro.toLowerCase());
        const plantasFiltradas = categoria.plantas.filter((planta) => planta.nombre.toLowerCase().includes(filtro.toLowerCase()));
        return categoriaIncluida || plantasFiltradas.length > 0;
    });*/

    /**sidebar**/
    const [ubicacionVisible, setUbicacionVisible] = useState(false);
    const [prioridadVisible, setPrioridadVisible] = useState(false);
    const [tipoVisible, setTipoVisible] = useState(false);
    const [antiguedadVisible, setAntiguedadVisible] = useState(false);

    const toggleUbicacion = () => {
        setUbicacionVisible(!ubicacionVisible);
    };

    const handleUbicacionFilter = (ubicacion: string) => {
        setFiltro(ubicacion === 'Todos' ? '' : ubicacion);
        // setUbicacionVisible(true);
    };

    /****/
    const [popupVisible, setPopupVisible] = useState(false);
    const [plantaSeleccionada, setPlantaSeleccionada] = useState<Plant | null>(null); //
    const [cat, setCat] = useState(0);

    const mostrarPopup = (planta: Plant, idPlanta: number) => {
        setPopupVisible(true);
        setPlantaSeleccionada(planta);
        setCat(idPlanta);
        console.log(planta)
    };

    const [gardens, setGardens] = useState<Garden[]>([]);

    const fetchGardens = async () => {
        try {
            const userId = 1;
            const response = await fetch('http://localhost:8080/api/v1/gardens/all', {
                headers: {
                    'id-user': userId.toString(),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch gardens');
            }
            const data = await response.json();


            data.sort((a:any, b:any) => a.name.localeCompare(b.name));
            console.log(data)
            setGardens(data);
        } catch (error) {
            console.error('Error fetching gardens:', error);
        }
    };

    useEffect(() => {
        fetchGardens()
    }, []);

    return (
        <>
            <main className={`${stylesJardin.contenedorPlantas}`}>
                <section>
                    <div className={"flex flex-col items-center my-12"}>
                        <h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Mi jardín</h1>
                        <div className="flex justify-center items-center gap-10">
                            <div className="flex-1 flex justify-center items-center gap-5">
                                <button
                                    className={`bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                    <div>
                                        <CiCalendar className={`${stylesJardin.iconos}`}/>
                                    </div>
                                    Calendario
                                </button>

                                <button
                                    className={`bg-[#88BC43] w-max hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                               height="20"/>
                                    </div>
                                    Añadir nueva planta
                                </button>
                            </div>
                            <div className="flex-1 w-96">
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                    className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className={`${stylesJardin.contenidoAjustado} flex mb-10  `}>
                    <div className="w-72 flex-shrink-0 bg-[#88BC43]">
                        <ul className="pl-5 pt-5 select-none">
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        onClick={toggleUbicacion}
                                    >
                                        <IoIosHome size={25}/>
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold"
                                            // onClick={() => setUbicacionVisible(!ubicacionVisible)}
                                        >Ubicación</span>
                                        <svg
                                            className={`w-3 h-3 transition-transform duration-300 ${
                                                ubicacionVisible ? 'rotate-180' : ''
                                            }`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {/*{ubicacionVisible && (*/}
                                <ul className={`pl-5 transition-max-height duration-500 ease-in-out ${ubicacionVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                                    <li className="cursor-pointer" onClick={() => handleUbicacionFilter('Todos')}>
                                            <button type="button"
                                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                <span
                                                    className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Todos</span>
                                            </button>

                                        </li>
                                        <li className="cursor-pointer"
                                            onClick={() => handleUbicacionFilter('Balcón')}>
                                            <button type="button"
                                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                <span
                                                    className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Balcón</span>
                                            </button>
                                        </li>
                                        <li className="cursor-pointer"
                                            onClick={() => handleUbicacionFilter('Patio trasero')}>
                                            <button type="button"
                                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                <span
                                                    className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Patio trasero</span>
                                            </button>
                                        </li>
                                        <li className="cursor-pointer"
                                            onClick={() => handleUbicacionFilter('cocina')}>
                                            <button type="button"
                                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                <span
                                                    className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Cocina</span>
                                            </button>
                                        </li>
                                    </ul>
                                {/*)}*/}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <FaHeart size={25}/>
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold"
                                            onClick={() => setPrioridadVisible(!prioridadVisible)}>Favoritos</span>
                                    </button>
                                </div>
                                {prioridadVisible && (
                                    <div className="pl-5">

                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <PiPottedPlantFill size={25}/>
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold"
                                            onClick={() => setTipoVisible(!tipoVisible)}>Tipo</span>
                                    </button>
                                </div>
                                {tipoVisible && (
                                    <div className="pl-5">
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <FaClock size={25}/>
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold"
                                            onClick={() => setAntiguedadVisible(!antiguedadVisible)}>Antigüedad</span>
                                    </button>
                                </div>
                                {antiguedadVisible && (
                                    <div className="pl-5">
                                    </div>
                                )}
                            </div>
                        </ul>
                    </div>
                    <section className="flex-1 flex gap-10 flex-col pl-10 pt-10 pb-10">
                        <div>
                            <h1 className="text-center">Jardines</h1>
                            <ul>
                                {gardens.map(garden => (
                                    <li key={garden.id}>
                                        <h2>{garden.name ? garden.name : "Sin jardín"}</h2>
                                        <ul>
                                            {garden.plants.map(plant => (
                                                <li onClick={() => mostrarPopup(plant, plant.id)} key={plant.id}>
                                                    {plant.alias}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {popupVisible && plantaSeleccionada && (
                            <>
                                <div
                                    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                    <div className="bg-white p-8 rounded-lg">
                                        <h2 className="text-green-500 font-bold">{plantaSeleccionada.alias}</h2>
                                        {/*<ul className="flex items-center justify-center gap-5">
                                            {plantaSeleccionada.map((detalle, index) => (
                                                <li key={index} className="mb-2">
                                                    <div className="imagenADetallePlantas" key={detalle.nombre}>
                                                        <Link href={`/jardin/${detalle.nombre}`}>
                                                            <Image src={detalle.foto} alt={detalle.nombre} width="300"
                                                                   height="150"/>
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>*/}
                                        <button className="font-bold mt-3 py-2 px-4 rounded text-white bg-green-500"
                                                onClick={() => setPopupVisible(false)}>
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {/*{popupVisible && plantaSeleccionada && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="bg-white p-8 rounded-lg">
                                    <h2 className="text-green-500 font-bold">{cat}</h2>
                                    <ul className="flex items-center justify-center gap-5">
                                        {plantaSeleccionada.map((detalle, index) => (
                                            <li key={index} className="mb-2">
                                                <div className="imagenADetallePlantas" key={detalle.nombre}>
                                                    <Link href={`/jardin/${detalle.nombre}`}>
                                                        <Image src={detalle.foto} alt={detalle.nombre} width="300" height="150" />
                                                    </Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="font-bold mt-3 py-2 px-4 rounded text-white bg-green-500" onClick={() => setPopupVisible(false)}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        )}*/}
                    </section>
                </div>
            </main>
        </>
    )
}