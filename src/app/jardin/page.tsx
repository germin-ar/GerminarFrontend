"use client"
import styles from "@/app/home.module.css";
import stylesJardin from "@/app/jardin/jardin.module.css"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { FaClock, FaHeart, FaLeaf, FaTrash } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import { GiTreeBranch } from "react-icons/gi";
import { BalooBhaina2 } from "../ui/fonts";

interface Plant {
    id: number;
    alias: string;
    creation_date: string;
    modification_date: string;
    is_favorite: boolean;
    image: string;
    quantity: number;
    specie: string;
    is_active: boolean;
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
        is_favorite: boolean;
        specie: string;
        image: string;
        quantity: number;
        creation_date: string;
        modification_date: string;
    }[];
    is_active: boolean | null;
}

export default function JardinPage() {

    const plantsInfo: Plant[] = [
        {
            id: 201,
            alias: "Cebolla",
            is_active: true,
            creation_date: "hoy",
            modification_date: "hoy",
            image: "/resultado/albahaca-sana.jpg",
            quantity: 5,
            is_favorite: false,
            specie: "verdura"
        },
        {
            id: 202,
            alias: "Rucula",
            is_active: true,
            creation_date: "ayer",
            modification_date: "ayer",
            image: "/recomendacion/rucula.PNG",
            quantity: 2,
            is_favorite: true,
            specie: "verdura"
        },
        {
            id: 203,
            alias: "Albahaca",
            is_active: true,
            creation_date: "hoy",
            modification_date: "hoy",
            image: "/resultado/albahaca-sana.jpg",
            quantity: 5,
            is_favorite: false,
            specie: "especia"
        },
        {
            id: 204,
            alias: "Perejil",
            is_active: true,
            creation_date: "ayer",
            modification_date: "ayer",
            image: "/recomendacion/rucula.PNG",
            quantity: 2,
            is_favorite: true,
            specie: "especia"
        },
        {
            id: 205,
            alias: "Tomate",
            is_active: true,
            creation_date: "hoy",
            modification_date: "hoy",
            image: "/recomendacion/tomate.PNG",
            quantity: 3,
            is_favorite: false,
            specie: "fruta"
        },
        {
            id: 206,
            alias: "Cebolla",
            is_active: true,
            creation_date: "hoy",
            modification_date: "hoy",
            image: "/resultado/albahaca-sana.jpg",
            quantity: 5,
            is_favorite: false,
            specie: "verdura"
        },
        {
            id: 207,
            alias: "Lechuga",
            is_active: true,
            creation_date: "ayer",
            modification_date: "ayer",
            image: "/recomendacion/lechuga.PNG",
            quantity: 1,
            is_favorite: false,
            specie: "verdura"
        }
    ];


    const data = [
        {
            id: 1,
            name: "Summer plants",
            user: {
                id: 101,
                name: "Alice",
                email: "alice@gmail.com"
            },
            plants: [
                {
                    id: 201,
                    alias: "Cebolla",
                    is_active: true,
                    creation_date: "hoy",
                    modification_date: "hoy",
                    image: "/resultado/albahaca-sana.jpg",
                    quantity: 5,
                    is_favorite: false,
                    specie: "verdura"
                },
                {
                    id: 202,
                    alias: "Rucula",
                    is_active: true,
                    creation_date: "ayer",
                    modification_date: "ayer",
                    image: "/recomendacion/rucula.PNG",
                    quantity: 2,
                    is_favorite: true,
                    specie: "verdura"
                },
                {
                    id: 203,
                    alias: "Albahaca",
                    is_active: true,
                    creation_date: "hoy",
                    modification_date: "hoy",
                    image: "/resultado/albahaca-sana.jpg",
                    quantity: 5,
                    is_favorite: false,
                    specie: "especia"
                },
                {
                    id: 204,
                    alias: "Perejil",
                    is_active: true,
                    creation_date: "ayer",
                    modification_date: "ayer",
                    image: "/recomendacion/rucula.PNG",
                    quantity: 2,
                    is_favorite: true,
                    specie: "especia"
                }
            ],
            is_active: true
        },
        {
            id: 2,
            name: "Spring blossom",
            user: {
                id: 101,
                name: "Alice",
                email: "alice@gmail.com"
            },
            plants: [
                {
                    id: 205,
                    alias: "Tomate",
                    is_active: true,
                    creation_date: "hoy",
                    modification_date: "hoy",
                    image: "/recomendacion/tomate.PNG",
                    quantity: 3,
                    is_favorite: false,
                    specie: "fruta"
                },
                {
                    id: 206,
                    alias: "Cebolla",
                    is_active: true,
                    creation_date: "hoy",
                    modification_date: "hoy",
                    image: "/resultado/albahaca-sana.jpg",
                    quantity: 5,
                    is_favorite: false,
                    specie: "verdura"
                },
                {
                    id: 207,
                    alias: "Lechuga",
                    is_active: true,
                    creation_date: "ayer",
                    modification_date: "ayer",
                    image: "/recomendacion/lechuga.PNG",
                    quantity: 1,
                    is_favorite: false,
                    specie: "verdura"
                }
            ],
            is_active: true
        }
    ];

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
            const response = await fetch('http://localhost:8080/api/v1/gardens', {
                headers: {
                    'id-user': userId.toString(),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch gardens');
            }
            const data = await response.json();


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
        } else if (e === "isFavorite") {
            setFiltroPlantaFavorito(true);
            setFiltroPlantas(false);
            setFiltroPlantaTipo('');
        } else if (e != '') {
            console.log("e:", e);
            setFiltroPlantaTipo(e);
            setFiltroPlantaFavorito(false);
            setFiltroPlantas(false);
        }
        setFiltro('');
    };

    const handleBuscadorChange = (e: any) => {
        setBuscador(e.target.value);
    };

    const filtrarPorBuscador = () => {
        if (buscador.trim() === '') {
            return data;
        }
        return data.filter(garden =>
            garden.name.toLowerCase().includes(buscador.toLowerCase()) ||
            garden.plants.some(plant =>
                plant.alias.toLowerCase().includes(buscador.toLowerCase())
            )
        );
    };

    const filtrarPorFiltro = () => {
        if (filtro === '') {
            return data;
        }
        return data.filter(garden =>
            garden.name.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    const filtrarPlantasPorFiltro = () => {
        let plantasFiltradas: Plant[] = [];

        if (filtroPlantas || (!filtroPlantas && !filtroPlantaFavorita && !filtroPlantaTipo)) {
            plantsInfo.forEach(plant => {
                plantasFiltradas.push(plant);
            });
        } else if (filtroPlantaFavorita && (!filtroPlantas && filtroPlantaTipo == '')) {
            plantsInfo.forEach(plant => {
                if (plant.is_favorite) {
                    plantasFiltradas.push(plant);
                }
            });

        } else if (filtroPlantaTipo != '' && !filtroPlantas && !filtroPlantaFavorita) {
            // Asumiendo que `prueba` es un array inicial
            plantasFiltradas = plantsInfo.filter(plant =>
                plant.specie.toLowerCase().includes(filtroPlantaTipo.toLowerCase())
            );
        }
        return plantasFiltradas;
    };

    useEffect(() => {
        filtrarPlantasPorFiltro();
    }, [filtroPlantas, filtroPlantaFavorita, filtroPlantaTipo]);

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

    const uniqueSpecies = Array.from(new Set(plantsInfo.map(plant => plant.specie)));
    console.log(filtrarPlantasPorFiltro(), "plantas:", filtroPlantas, "favs:", filtroPlantaFavorita, "specie", filtroPlantaTipo);

    return (
        <>
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
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
                                        onClick={() => handleFiltroChange("todos")}
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                            Todos
                                        </span>
                                    </button>
                                </li>
                                {data.map(garden => (
                                    <li
                                        key={garden.id}
                                        className="cursor-pointer"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleFiltroChange(garden.name)}
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <span
                                                className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                                {garden.name.charAt(0).toUpperCase() + garden.name.slice(1)}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button type="button"
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <PiPottedPlantFill size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold"
                                        onClick={() => handleFiltroPlantaChange("plantas")}>Plantas</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button type="button"
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <FaHeart size={25} className={"hidden sm:block sm:w-6 sm:h-6"} />
                                    <span
                                        className="flex-1 mx-1 ms:ms-3 text-left rtl:text-right whitespace-nowrap text-ms ms:text-lg font-bold"
                                        onClick={() => handleFiltroPlantaChange("isFavorite")}>Favoritos</span>
                                </button>
                            </div>
                        </div>
                        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
                            <ul
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
                                            onClick={() => handleFiltroPlantaChange(specie)}
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <span
                                                className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">
                                                {specie.charAt(0).toUpperCase() + specie.slice(1)}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 ">
                                <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-bold">Más recientes</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
                    {/* {plantasFiltradas?.length == 0 && ( */}
                    <h2 className={`${BalooBhaina2.className} ms-10 text-[#88BC43] font-bold`}>Tus jardines</h2>
                    {/* )} */}
                    <div>
                        {filtrarPorBuscador().length > 0 && buscador != '' ? (
                            <div className="flex flex-col sm:grid sm:grid-cols-1 gap-4 md:grid-cols-2">
                                {filtrarPorBuscador().map(garden => (
                                    <div key={garden.id} className="border border-gray-200 p-4 rounded-lg relative">
                                        <FaTrash color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2"} />
                                        <h3 className="text-lg font-semibold mb-2">{garden.name ? garden.name : "Sin jardín"}</h3>
                                        <div
                                            className="flex flex-wrap gap-2 justify-between grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-10">
                                            {garden.plants.map((plant, index) => (
                                                <div key={index}
                                                    className="flex flex-row justify-between items-center cursor-pointer"
                                                    onClick={() => mostrarPopup(plant, plant.quantity)}>
                                                    <div className={"flex items-center"}>
                                                        <img src={plant.image} alt={plant.alias}
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
                                    <div key={garden.id} className="border border-gray-200 p-4 rounded-lg relative">
                                        <FaTrash color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2"} />
                                        <h3 className="text-lg font-semibold mb-2">{garden.name ? garden.name : "Sin jardín"}</h3>
                                        <div
                                            className="flex flex-wrap gap-2 justify-between grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-10">
                                            {garden.plants.map((plant, index) => (
                                                <div key={index}
                                                    className="flex flex-row justify-between items-center cursor-pointer"
                                                    onClick={() => mostrarPopup(plant, plant.quantity)}>
                                                    <div className={"flex items-center"}>
                                                        <img src={plant.image} alt={plant.alias}
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
                                {plantasFiltradas?.length == 0 && (
                                    <h3 className="ms-10 overflow lg:text-nowrap text-[#1F2325]">
                                        No se encontraron resultados para <span
                                            className="font-bold text-[#275F08]">&quot;{buscador}&quot;</span>.
                                    </h3>
                                )}
                            </div>
                        )}
                    </div>
                    {/* --------------------------------------------------------------------------------------------------------------------------------------------- */}

                    {plantasFiltradas?.length != 0 && (
                        <h2 className={`${BalooBhaina2.className} ms-10 mt-10 text-[#88BC43] font-bold`}>Tus plantas</h2>
                    )}

                    <div>
                        { filtrarPlantasPorFiltro().length > 0 ? (
                            <div className="flex flex-col md:grid md:grid-cols-2 md:flex-row lg:grid-cols-2 gap-4 lg:flex flex-wrap">
                                {filtrarPlantasPorFiltro().map(plant => (

                                    <div key={plant.id} className="border border-gray-200 p-4 rounded-lg lg:w-60">

                                        <div
                                            className="flex flex-row flex-wrap gap-2 items-center justify-between"
                                            onClick={() => mostrarPopup(plant, plant.quantity)}>
                                            <div className={"flex items-center"}>
                                                <img src={plant.image} alt={plant.alias}
                                                    className="w-8 h-8 lg:w-12 lg:h-12 mr-2 rounded-full" />
                                                <span>{resaltarTexto(plant.alias)}</span>
                                            </div>
                                            {plant.is_favorite ? (
                                                <div>
                                                    <FaTrash color={"#d3d3d3"} size={20} />
                                                    <span

                                                        className={"ml-3 w-fit"}><FaHeart
                                                            color={"#cc3333"} size={20} /></span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <FaTrash color={"#d3d3d3"} size={20} />
                                                    <span

                                                        className={"ml-3 w-fit invisible"}><FaHeart
                                                            color={"#cc3333"} size={20} /></span>
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                ))}
                            </div>

                        ) : filtrarPlantasPorFiltro().length == 0 && filtroPlantas === true ? (
                            <div className="flex flex-col grid grid-cols-1">
                                <h3 className="ms-10 overflow lg:text-nowrap text-[#1F2325]">
                                    No tienes plantas guardadas en tus <span
                                        className="font-bold text-[#275F08]"> favoritos</span>.
                                </h3>
                            </div>
                            // acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        ) : filtrarPlantasPorFiltro().length == 0 && filtroPlantas == false ? (
                            <div className="flex flex-col grid grid-cols-1">
                                <h3 className="ms-10 overflow lg:text-nowrap text-[#1F2325]">
                                    No tienes plantas guardadas.
                                </h3>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    {popupVisible && plantaSeleccionada && (
                        <>
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="flex flex-col items-center gap-2 sm:gap-3 bg-white p-8 rounded-lg w-96">
                                    <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row items-center">
                                        <div className={"flex flex-col items-center"}>
                                            <img src={plantaSeleccionada.image} alt={plantaSeleccionada.alias}
                                                className="w-16 h-16 rounded-full" />
                                            <h3 className="text-lg font-semibold">{plantaSeleccionada.alias}</h3>
                                        </div>
                                        <div>
                                            {/*plantaSeleccionada.isHealthy*/}
                                            <p className={"w-fit text-center"}>¡Tu planta está sana!</p>
                                        </div>
                                    </div>
                                    {/*<p>Descripción: {plantaSeleccionada.description}</p>*/}
                                    <div className={"flex gap-3"}>
                                        <Link href={"/editar"}
                                            className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                            Editar
                                        </Link>
                                        <button
                                            className={`bg-[#E53E3E] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#CC3333] active:bg-[#B32D2D] active:scale-75`}
                                            onClick={() => setPopupVisible(false)}>
                                            Cerrar
                                        </button>
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