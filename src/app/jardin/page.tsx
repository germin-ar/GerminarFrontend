"use client"
import styles from "@/app/home.module.css";
import stylesJardin from "@/app/jardin/jardin.module.css"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { FaClock, FaHeart, FaLeaf, FaTrash } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import { BalooBhaina2 } from "../ui/fonts";

export interface Garden {
    id: number | null;
    name: string | null;
    plants: Plant[];
}

export interface Plant {
    id: number;
    alias: string;
    creation_date: string;
    modification_date: string;
    is_favorite: boolean;
    photos: Photo[];
}

export interface Photo {
    url: string;
}

export default function JardinPage() {
    /**sidebar**/
    const [ubicacionVisible, setUbicacionVisible] = useState(false);
    const [tipoVisible, setTipoVisible] = useState(false);
    const [antiguedadVisible, setAntiguedadVisible] = useState(false);

    const toggleUbicacion = () => {
        setUbicacionVisible(!ubicacionVisible);
    };

    const toggleTipo = () => {
        setTipoVisible(!tipoVisible);
    };

    const toggleAntiguedad = () => {
        setAntiguedadVisible(!antiguedadVisible);
    };

    /****/
    const [popupVisible, setPopupVisible] = useState(false);
    const [plantaSeleccionada, setPlantaSeleccionada] = useState<Plant | null>(null); //
    const [cat, setCat] = useState(0);

    const mostrarPopup = (planta: any, idPlanta: any) => {
        setPopupVisible(true);
        setPlantaSeleccionada(planta);
        setCat(idPlanta);
        // console.log(planta)
    };

    const [gardens, setGardens] = useState<Garden[]>([]);

    const fetchGardens = async () => {
        try {
            const userId = 1;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/gardens`, {
                headers: {
                    'id-user': userId.toString(),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch gardens');
            }
            const data = await response.json();
            console.log(data)

            //data.sort((a:any, b:any) => a.name.localeCompare(b.name));
            console.log(data)
            setGardens(data);
        } catch (error) {
            console.error('Error fetching gardens:', error);
        }
    };

    useEffect(() => {
        fetchGardens()
    }, []);

    const [mostrarJardin, setMostrarJardin] = useState(false);

    const [filtro, setFiltro] = useState('');
    const [filtroPlantas, setFiltroPlantas] = useState(false);
    const [filtroPlantaFavorita, setFiltroPlantaFavorito] = useState(false);
    const [filtroPlantaTipo, setFiltroPlantaTipo] = useState('');
    const [filtroPlantaFechaReciente, setFiltroPlantaFechaReciente] = useState(false);
    const [filtroPlantaFechaAntiguo, setFiltroPlantaFechaAntiguo] = useState(false);
    const [plantasFiltradas, setPlantasFiltradas] = useState<Plant[] | null>(null);
    const [buscador, setBuscador] = useState('');

    const handleFiltroChange = (e: any) => {
        setFiltro(e === 'todos' ? '' : e);
        setFiltroPlantas(false);
        setFiltroPlantaFavorito(false);
    };

    const handleFiltroPlantaChange = (e: any) => {
        if (e === "plantas") {
            setFiltroPlantas(true);
            setFiltroPlantaFavorito(false);
            setFiltroPlantaTipo('');
            setFiltroPlantaFechaReciente(false);
            setFiltroPlantaFechaAntiguo(false);
        } else if (e === "isFavorite") {
            setFiltroPlantaFavorito(true);
            setFiltroPlantas(false);
            setFiltroPlantaTipo('');
            setFiltroPlantaFechaReciente(false);
            setFiltroPlantaFechaAntiguo(false);
        } else if (e != '' && e !== "desc" && e !== "asc") {
            setFiltroPlantaTipo(e);
            setFiltroPlantaFavorito(false);
            setFiltroPlantas(false);
            setFiltroPlantaFechaReciente(false);
            setFiltroPlantaFechaAntiguo(false);
        } else if (e === "desc") {
            setFiltroPlantaFechaReciente(true);
            setFiltroPlantaFechaAntiguo(false);
            setFiltroPlantas(false);
            setFiltroPlantaTipo('');
            setFiltroPlantaFavorito(false);
        } else if (e === "asc") {
            setFiltroPlantaFechaAntiguo(true);
            setFiltroPlantaFechaReciente(false);
            setFiltroPlantas(false);
            setFiltroPlantaTipo('');
            setFiltroPlantaFavorito(false);
        }
        setFiltro('');
    };

    const handleBuscadorChange = (e: any) => {
        setBuscador(e.target.value);
    };

    let filtradoJardin: Garden[] = [];
    let filtradoPlantas: Plant[] = [];

    const filtrarPorBuscador = () => {

        if (buscador.trim() === '') {
            filtradoJardin = gardens;
            filtradoPlantas = gardens.flatMap(garden => garden.plants);
        }
        filtradoJardin = gardens.filter(garden =>
            garden.name && garden.name.toLowerCase().includes(buscador.toLowerCase())
            // ||
            // garden.plants.some(plant =>
            //     plant.alias.toLowerCase().includes(buscador.toLowerCase())
            // )
        );
        filtradoPlantas = gardens.flatMap(garden => garden.plants).filter(plant =>
            plant.alias.toLowerCase().includes(buscador.toLowerCase())
        )

        return { filtradoJardin, filtradoPlantas };
    };

    const filtrarPorFiltro = () => {
        if (filtro === '') {
            return gardens;
        }
        return gardens.filter(garden =>
            garden.name && garden.name.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    const filtrarPlantasPorFiltro = () => {
        let plantasFiltradas: Plant[] = [];

        if (filtroPlantas || (!filtroPlantas && !filtroPlantaFavorita && !filtroPlantaTipo && !filtroPlantaFechaReciente && !filtroPlantaFechaAntiguo)) {
            gardens.flatMap(garden => garden.plants).forEach(plant => {
                plantasFiltradas.push(plant);
            });
        }
        else if (filtroPlantaFavorita && (!filtroPlantas && filtroPlantaTipo == '')) {
            gardens.flatMap(garden => garden.plants).forEach(plant => {
                if (plant.is_favorite) {
                    plantasFiltradas.push(plant);
                }
            });
            /*
            } else if (filtroPlantaTipo != '' && !filtroPlantas && !filtroPlantaFavorita) {
                plantasFiltradas = gardens.flatMap(garden => garden.plants).filter(plant =>
                    plant.specie.toLowerCase().includes(filtroPlantaTipo.toLowerCase())
                );
            }
            */
        } else if (filtroPlantaFechaReciente) {
            plantasFiltradas = gardens.flatMap(garden => garden.plants)
                .sort((a, b) => {
                    const dateA = new Date(a.creation_date).getTime();
                    const dateB = new Date(b.creation_date).getTime();
                    return dateB - dateA;
                });
        } else if (filtroPlantaFechaAntiguo) {
            plantasFiltradas = gardens.flatMap(garden => garden.plants)
                .sort((a, b) => {
                    const dateA = new Date(a.creation_date).getTime();
                    const dateB = new Date(b.creation_date).getTime();
                    return dateA - dateB;
                });
        }

        return plantasFiltradas;
    };

    useEffect(() => {
        filtrarPlantasPorFiltro();
    }, [filtroPlantas, filtroPlantaFavorita, filtroPlantaTipo, filtroPlantaFechaReciente, filtroPlantaFechaAntiguo]);

    const resaltarTexto = (texto: any) => {
        if (!buscador) {
            return texto;
        }
        const partes = texto.split(new RegExp(`(${buscador})`, 'gi'));
        return partes.map((parte: any, index: any) =>
            parte.toLowerCase() === buscador.toLowerCase() ?
                <span key={index} className="font-bold">{parte}</span> : parte
        );
    };

    //const uniqueSpecies = Array.from(new Set(gardens.flatMap(garden => garden.plants).map(plant => plant.specie)));
    const uniqueGardenNames = Array.from(new Set(gardens.flatMap(garden => garden.name)));

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 5, behavior: 'smooth' });
    };

    const refPlant = useRef<HTMLHeadingElement>(null);

    const scrollToPlant = () => {
        if (refPlant.current) {
            refPlant.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const refGarden = useRef<HTMLHeadingElement>(null);

    const scrollToGarden = () => {
        if (refGarden.current) {
            refGarden.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const deletePlant = async (id: any) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/plants/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'id-user': '1'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                console.log(`Planta con ID ${id} eliminada correctamente`);
            };

            await deletePlant(plantaSeleccionada?.id);
            console.log(plantaSeleccionada?.id);


            await fetchGardens();


            setConfirmDelete(false);
            setPopupVisible(false);

        } catch (error) {
            console.error('Hubo un problema al eliminar la planta:', error);
        }
    };

    function formatDateString(dateString: string): string {
        const date = new Date(dateString); // Crear objeto Date a partir de la cadena
        const day = date.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (empezando desde 0)
        const year = date.getFullYear(); // Año con cuatro dígitos
        const hours = date.getHours().toString().padStart(2, '0'); // Horas con dos dígitos
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos
        const seconds = date.getSeconds().toString().padStart(2, '0'); // Segundos con dos dígitos

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-36 right-10 p-3 bg-gray-700 text-white rounded-full transition duration-300 ease-in-out transform hover:bg-gray-800 active:bg-gray-900 active:scale-75"
                >
                    Ir arriba
                </button>
            )}

            <section>
                <div className={"flex flex-col items-center my-12"}>
                    {/*<h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Mi jardín</h1>*/}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10">
                        <div className="flex-1 flex justify-center items-center gap-5">
                            <button
                                className={`${styles.botonCards} w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                <div>
                                    <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                        height="20" />
                                </div>
                                Añadir nueva planta
                            </button>
                            <button
                                className={`${styles.botonCards} flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                <div>
                                    <CiCalendar className={`${stylesJardin.iconos}`} />
                                </div>
                                Calendario
                            </button>
                        </div>
                        <div className="flex-1 w-96">
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={buscador}
                                onChange={handleBuscadorChange}
                                className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className={`${stylesJardin.contenidoAjustado} flex mb-10`}>
                <div className="flex-shrink-0 md:overflow-x-auto">
                    <ul className="pl-5 pt-5 select-none">
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                    onClick={() => {
                                        toggleUbicacion();
                                        // handleFiltroChange("todos");
                                    }}
                                >
                                    <IoIosHome size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold">Jardines
                                    </span>
                                    <svg
                                        className={`w-3 h-3 transition-transform duration-300 ${ubicacionVisible ? 'rotate-180' : ''
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
                            <ul
                                className={`md:pl-5 overflow-hidden transition-max-height duration-500 ease-in-out ${ubicacionVisible ? 'max-h-60' : 'max-h-0'
                                    }`}
                            >
                                <li
                                    className="cursor-pointer"
                                >
                                    <button
                                        type="button"
                                        onClick={() => { handleFiltroChange("todos"); scrollToGarden() }}
                                        className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                    >
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                            Todos
                                        </span>
                                    </button>
                                </li>

                                {uniqueGardenNames.length > 0 && (
                                    <>
                                        {uniqueGardenNames.map((name, index) => (
                                            <div key={index}>
                                                {name != null && (
                                                    <li key={name}
                                                        className="cursor-pointer">
                                                        <button
                                                            type="button"
                                                            onClick={() => { handleFiltroChange(name), scrollToGarden(); }}
                                                            className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white">                                            <span
                                                                className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                                                {name.charAt(0).toUpperCase() + name.slice(1)}
                                                            </span>
                                                        </button>
                                                    </li>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}

                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button type="button"
                                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white">
                                    <PiPottedPlantFill size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold"
                                        onClick={() => {
                                            handleFiltroPlantaChange("plantas");
                                            scrollToPlant();
                                        }}
                                    >Plantas</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button type="button"
                                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white">
                                    <FaHeart size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold"
                                        onClick={() => {
                                            handleFiltroPlantaChange("isFavorite");
                                            scrollToPlant();
                                        }}>Favoritos</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                    onClick={() => { toggleTipo(); }}
                                >
                                    <FaLeaf size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold">Tipo planta
                                    </span>
                                    <svg
                                        className={`w-3 h-3 transition-transform duration-300 ${tipoVisible ? 'rotate-180' : ''
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
                            {/* <ul
                                className={`md:pl-5 overflow-hidden transition-max-height duration-500 ease-in-out ${tipoVisible ? 'max-h-60' : 'max-h-0'
                                    }`}
                            >
                                {uniqueSpecies.map(specie => (
                                    <li
                                        key={specie}
                                        className="cursor-pointer"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => { handleFiltroPlantaChange(specie); scrollToPlant(); }}
                                            className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                        >
                                            <span
                                                className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                                {specie.charAt(0).toUpperCase() + specie.slice(1)}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                    onClick={toggleAntiguedad}
                                >
                                    <FaClock size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold">Fecha
                                    </span>
                                    <svg
                                        className={`w-3 h-3 transition-transform duration-300 ${antiguedadVisible ? 'rotate-180' : ''
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
                            <ul
                                className={`md:pl-5 overflow-hidden transition-max-height duration-500 ease-in-out ${antiguedadVisible ? 'max-h-60' : 'max-h-0'
                                    }`}
                            >
                                <li
                                    className="cursor-pointer"
                                >
                                    <button
                                        type="button"
                                        onClick={() => { handleFiltroPlantaChange("desc"); scrollToPlant(); }}
                                        className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                    >
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">Más recientes</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { handleFiltroPlantaChange("asc"); scrollToPlant(); }}
                                        className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-gray-900 hover:bg-[#275F08] hover:text-white"
                                    >
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">Más antiguos</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
                <section className="flex-1 flex gap-6 flex-col px-2 mt-3">

                    {gardens.length !== 0 ? (
                        <>
                            <h2 ref={refGarden} className={`${BalooBhaina2.className} ms-10 text-[#88BC43] font-bold`}>Tus jardines</h2>
                            <div>
                                {filtrarPorBuscador().filtradoJardin.length > 0 && buscador != '' ? (
                                    <div className="flex flex-col sm:grid sm:grid-cols-1 gap-4 md:grid-cols-2">
                                        {filtrarPorBuscador().filtradoJardin.map(garden => (
                                            <div key={garden.id} className={`border border-gray-200 p-4 rounded-lg relative hover:shadow-lg max-h-[100px] lg:max-h-[148px] overflow-y-auto ${stylesJardin.customScrollbar} overflow-x-hidden`}>
                                                <FaTrash color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2 cursor-pointer"} />
                                                <h3 className="text-lg font-semibold mb-2">{garden.name || "Sin nombre"}</h3>
                                                <div
                                                    className="flex flex-wrap gap-2 justify-between grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-10">
                                                    {garden.plants.map((plant, index) => (
                                                        <div key={index}
                                                            className="flex flex-row justify-between items-center cursor-pointer"
                                                            onClick={() => mostrarPopup(plant, plant.id)}>
                                                            <div className={"flex items-center"}>
                                                                <img src={plant.photos && plant.photos.length > 0 ? plant.photos[plant.photos.length - 1].url : ""} alt={plant.alias}
                                                                    className="w-8 h-8 lg:w-12 lg:h-12 mr-2 rounded-full" />
                                                                <span>{resaltarTexto(plant.alias)}</span>
                                                            </div>
                                                            {plant.is_favorite && (
                                                                <span
                                                                    className={`ml-3 ${stylesJardin.responsiveImage}`}><FaHeart
                                                                        color={"#cc3333"} size={20} /></span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : filtrarPorFiltro().length > 0 && buscador == '' ? (
                                    <div className="flex flex-col sm:grid sm:grid-cols-1 gap-4 md:grid-cols-2">
                                        {filtrarPorFiltro().map(garden => (
                                            <div key={garden.id} className={`border border-gray-200 p-4 rounded-lg relative hover:shadow-lg max-h-[100px] lg:max-h-[148px] overflow-y-auto ${stylesJardin.customScrollbar} overflow-x-hidden`}>
                                                <FaTrash color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2 cursor-pointer"} />
                                                <h3 className="text-lg font-semibold mb-2">{garden.name || "Sin nombre"}</h3>
                                                <div
                                                    className="flex flex-wrap gap-2 justify-between grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-10">
                                                    {garden.plants.map((plant, index) => (
                                                        <div key={index}
                                                            className="flex flex-row justify-between items-center cursor-pointer"
                                                            onClick={() => mostrarPopup(plant, plant.id)}>
                                                            <div className={"flex items-center"}>
                                                                <img src={plant.photos && plant.photos.length > 0 ? plant.photos[plant.photos.length - 1].url : ""} alt={plant.alias}
                                                                    className="w-8 h-8 lg:w-12 lg:h-12 mr-2 rounded-full" />
                                                                <span>{resaltarTexto(plant.alias)}</span>
                                                            </div>
                                                            {plant.is_favorite && (
                                                                <span
                                                                    className={`ml-3 ${stylesJardin.responsiveImage}`}><FaHeart
                                                                        color={"#cc3333"} size={20} /></span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col grid grid-cols-1">

                                        <h3 className="ms-10 overflow lg:text-nowrap text-[#1F2325]">
                                            No se encontraron jardines con el nombre <span
                                                className="font-bold text-[#275F08]">&quot;{buscador}&quot;</span>.
                                        </h3>

                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            <h2 className={`${BalooBhaina2.className} ms-10 text-[#88BC43] font-bold`}>Aún no tienes jardines</h2>
                            {/* <Link href={}
                                className="px-6 py-2 bg-[#88BC43] text-white rounded-lg hover:bg-[#6ba832] transition duration-300"
                            >
                                Crear un jardín
                            </Link> */}
                        </div>
                    )}

                    {/* --------------------------------------------------------------------------------------------------------------------------------------------- */}


                    {gardens.flatMap(garden => garden.plants).length !== 0 ? (
                        <>
                            <h2 ref={refPlant} className={`${BalooBhaina2.className} ms-10 mt-10 text-[#88BC43] font-bold`}>Tus plantas</h2>
                            <div>
                                {filtrarPorBuscador().filtradoPlantas.length > 0 && buscador != '' ? (
                                    <div className="flex flex-col md:grid md:grid-cols-2 md:flex-row lg:grid-cols-2 gap-4 lg:flex flex-wrap">
                                        {filtrarPorBuscador().filtradoPlantas.map(plant => (
                                            <div key={plant.id} className="border border-gray-200 p-4 rounded-lg lg:w-60 relative hover:shadow-lg">
                                                <div
                                                    className="flex flex-row flex-wrap gap-2 items-center justify-between h-full cursor-pointer"
                                                    onClick={() => mostrarPopup(plant, plant.id)}>
                                                    <div className="flex items-center">
                                                        <img src={plant.photos && plant.photos.length > 0 ? plant.photos[plant.photos.length - 1].url : ""} alt="plant.alias"
                                                            className="w-8 h-8 lg:w-12 lg:h-12 mr-2 rounded-full" />
                                                        <span>{resaltarTexto(plant.alias)}</span>
                                                    </div>
                                                    {plant.is_favorite ? (
                                                        <span
                                                            className={"w-fit"}><FaHeart
                                                                color={"#cc3333"} size={20} />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={"w-fit invisible"}><FaHeart
                                                                color={"#cc3333"} size={20} />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : filtrarPlantasPorFiltro().length > 0 && buscador == '' ? (
                                    <div className="flex flex-col md:grid md:grid-cols-2 md:flex-row lg:grid-cols-2 gap-4 lg:flex flex-wrap">
                                        {filtrarPlantasPorFiltro().map(plant => (
                                            <div key={plant.id} className="border border-gray-200 p-4 rounded-lg lg:w-60 relative hover:shadow-lg">
                                                <div
                                                    className="flex flex-row flex-wrap gap-2 items-center justify-between h-full cursor-pointer"
                                                    onClick={() => mostrarPopup(plant, plant.id)}>
                                                    <div className="flex items-center">
                                                        <img src={plant.photos && plant.photos.length > 0 ? plant.photos[plant.photos.length - 1].url : ""} alt="plant.alias"
                                                            className="w-8 h-8 lg:w-12 lg:h-12 mr-2 rounded-full" />
                                                        <span>{resaltarTexto(plant.alias)}</span>
                                                    </div>
                                                    {plant.is_favorite ? (
                                                        <span
                                                            className={"w-fit"}><FaHeart
                                                                color={"#cc3333"} size={20} />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={"w-fit invisible"}><FaHeart
                                                                color={"#cc3333"} size={20} />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (filtrarPlantasPorFiltro().length == 0 && filtroPlantaFavorita && !filtroPlantas && !filtroPlantaTipo && !filtroPlantaFechaReciente && !filtroPlantaFechaAntiguo) && !buscador ? (
                                    <div className="flex flex-col grid grid-cols-1">
                                        <h3 className="ms-10 overflow lg:text-nowrap text-[#1F2325]">
                                            No tienes plantas guardadas en tus <span
                                                className="font-bold text-[#275F08]"> favoritos</span>.
                                        </h3>
                                    </div>
                                ) : (
                                    <div className="flex flex-col grid grid-cols-1">
                                        <h3 className="ms-10 overflow lg:text-nowrap text-[#1F2325]">
                                            No se encontraron plantas con el nombre <span
                                                className="font-bold text-[#275F08]">&quot;{buscador}&quot;</span>.
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            <h2 className={`${BalooBhaina2.className} ms-10 text-[#88BC43] font-bold`}>Aún no tienes plantas.</h2>
                        </div>
                    )}

                    {popupVisible && plantaSeleccionada && (
                        <>
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="flex flex-col items-center justify-around gap-4 bg-white p-8 rounded-lg w-[450px] h-96 relative">
                                    <div className="flex flex-col gap-2 items-center">
                                        <div className={"flex flex-col items-center absolute top-[-45px]"}>
                                            <img src={plantaSeleccionada && plantaSeleccionada.photos.length > 0 ? plantaSeleccionada.photos[plantaSeleccionada.photos.length - 1].url : ""} alt={plantaSeleccionada.alias}
                                                className="w-20 h-20 rounded-full" />
                                            <h3 className="text-lg font-semibold">{plantaSeleccionada.alias}</h3>
                                        </div>
                                        <div>
                                            {/*plantaSeleccionada.isHealthy*/}
                                            <div className="flex justify-center mt-2">
                                                <p className={"w-fit my-3"}>¡Tu planta está sana!</p>
                                            </div>
                                            <div>
                                                <table className="vertical-header-table rounded w-80 border-collapse">
                                                    <tbody>
                                                        <tr>
                                                            <th className={`p-4 border`}>Jardín</th>
                                                            <td className={`p-4 border`}>Jardín</td>
                                                        </tr>
                                                        <tr>
                                                            <th className={`p-4 border`}>Creada el</th>
                                                            <td className={`p-4 border`}>
                                                                {formatDateString(plantaSeleccionada.creation_date)}
                                                            </td>
                                                        </tr>
                                                        <tr className="border">
                                                            <th className={`p-4 border`}>Favorito</th>
                                                            <td className={`p-4 relative`}>
                                                                {plantaSeleccionada.is_favorite ? (
                                                                    <span className={`absolute top-[17px] left-[15px] px-2 border inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                                                                        Si
                                                                    </span>
                                                                ) : (
                                                                    <span className={`absolute top-[17px] left-[15px] px-2 border inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800`}>
                                                                        No
                                                                    </span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>


                                        </div>
                                    </div>
                                    {/*<p>Descripción: {plantaSeleccionada.description}</p>*/}
                                    <div className={"flex gap-3"}>
                                        <Link href={`/jardin/${plantaSeleccionada.id}`}
                                            className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                            Ver detalles
                                        </Link>
                                        <Link href={`/jardin/${plantaSeleccionada.id}/editar`}
                                            className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                            Editar
                                        </Link>
                                        <button
                                            className={`bg-[#E53E3E] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#CC3333] active:bg-[#B32D2D] active:scale-75`}
                                            onClick={() => setPopupVisible(false)}
                                        >
                                            Cerrar
                                        </button>
                                        <FaTrash onClick={handleDeleteClick} color={"#d3d3d3"} size={20} className={"absolute top-2 right-2 cursor-pointer"} />
                                        {confirmDelete && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                                                <div className="bg-white p-6 rounded shadow-lg">
                                                    <p className="mb-4">¿Estás seguro de que quieres borrar esta planta?</p>
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={handleConfirmDelete}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded"
                                                        >
                                                            Sí
                                                        </button>
                                                        <button
                                                            onClick={handleCancelDelete}
                                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* <span
                                            className={`absolute top-1 right-1 bg-[#333333] text-white font-bold px-2 w-fit h-fit rounded transition duration-300 ease-in-out transform hover:bg-[#555555] active:bg-[#1f1f1f] active:scale-75 cursor-pointer`}
                                            onClick={() => setPopupVisible(false)}>
                                            ×
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    )
}
