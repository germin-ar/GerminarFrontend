"use client"
import styles from "@/app/home.module.css";
import stylesJardin from "@/app/jardin/jardin.module.css"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {IoIosHome} from "react-icons/io";
import {FaClock, FaHeart, FaTrash} from "react-icons/fa";
import {PiPottedPlantFill} from "react-icons/pi";

interface Plant {
    id: number;
    alias: string;
    creation_date: string;
    modification_date: string;
    is_favorite: boolean;
    image: string;
    quantity: number;
    specie: string;
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
        creation_date: string;
        modification_date: string;
    }[];
    is_active: boolean | null;
}

export default function JardinPage() {

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
                    is_favorite: false,
                    specie: "verdura"
                },
                {
                    id: 201,
                    alias: "Albahaca",
                    is_active: true,
                    creation_date: "hoy",
                    modification_date: "hoy",
                    image: "/resultado/albahaca-sana.jpg",
                    quantity: 5,
                    is_favorite: true,
                    specie: "especia"
                },
                {
                    id: 202,
                    alias: "Perejil",
                    is_active: true,
                    creation_date: "ayer",
                    modification_date: "ayer",
                    image: "/recomendacion/rucula.PNG",
                    quantity: 2,
                    is_favorite: false,
                    specie: "especia"
                }
            ],
            is_active: true
        },
        {
            id: 1,
            name: "Spring blossom",
            user: {
                id: 101,
                name: "Alice",
                email: "alice@gmail.com"
            },
            plants: [
                {
                    id: 201,
                    alias: "Tomate",
                    is_active: true,
                    creation_date: "hoy",
                    modification_date: "hoy",
                    image: "/recomendacion/tomate.PNG",
                    quantity: 3,
                    is_favorite: true,
                    specie: "fruta"
                },
                {
                    id: 202,
                    alias: "Lechuga",
                    is_active: true,
                    creation_date: "ayer",
                    modification_date: "ayer",
                    image: "/recomendacion/lechuga.PNG",
                    quantity: 1,
                    is_favorite: true,
                    specie: "verdura"
                }
            ],
            is_active: true
        }
    ];

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

    const mostrarPopup = (planta: any, idPlanta: any) => {
        setPopupVisible(true);
        setPlantaSeleccionada(planta);
        setCat(idPlanta);
        console.log(planta)
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

    return (
        <>
            {/*<section>*/}
            {/*    <div className={"flex flex-col items-center my-12"}>*/}
            {/*        /!*<h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Mi jardín</h1>*!/*/}
            {/*        <div className="flex justify-center items-center gap-10">*/}
            {/*            <div className="flex-1 flex justify-center items-center gap-5">*/}
            {/*                <button*/}
            {/*                    className={`bg-[#88BC43] w-max hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>*/}
            {/*                    <div>*/}
            {/*                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"*/}
            {/*                               height="20"/>*/}
            {/*                    </div>*/}
            {/*                    Añadir nueva planta*/}
            {/*                </button>*/}
            {/*                <button*/}
            {/*                    className={`bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>*/}
            {/*                    <div>*/}
            {/*                        <CiCalendar className={`${stylesJardin.iconos}`}/>*/}
            {/*                    </div>*/}
            {/*                    Calendario*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className="flex-1 w-96">*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    placeholder="Buscar"*/}
            {/*                    value={filtro}*/}
            {/*                    onChange={handleFiltroChange}*/}
            {/*                    className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <div className={`${stylesJardin.contenidoAjustado} flex mb-10`}>
                <div className="w-72 flex-shrink-0">
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
                            <ul className={`pl-5 transition-max-height duration-500 ease-in-out`}>
                                <li className="cursor-pointer"
                                    onClick={() => handleUbicacionFilter("todos")}>
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                <span
                                                    className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Todos</span>
                                    </button>
                                </li>
                                {data.map(garden => (
                                    <li key={garden.id} className="cursor-pointer"
                                        onClick={() => handleUbicacionFilter(garden.name)}>
                                        <button type="button"
                                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                        <span
                                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">{garden.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
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
                <section className="flex-1 flex gap-10 flex-col px-2 mt-3">
                    <div className="flex flex-col sm:grid sm:grid-cols-1 gap-4 md:grid-cols-2">
                        {data.map(garden => (
                            <div key={garden.id} className="border border-gray-200 p-4 rounded-lg relative">
                                <FaTrash color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2"}/>
                                <h3 className="text-lg font-semibold mb-2">{garden.name ? garden.name : "Sin jardín"}</h3>
                                <div className="flex flex-wrap gap-2 justify-between sm:grid sm:grid-cols-3 sm:gap-4">
                                    {garden.plants.map((plant, index) => (
                                        <div key={index} className="flex items-center cursor-pointer w-2/5"
                                             onClick={() => mostrarPopup(plant, plant.quantity)}>
                                            <img src={plant.image} alt={plant.alias}
                                                 className="w-12 h-12 mr-2 rounded-full"/>
                                            <span>{plant.alias}</span>
                                            {plant.is_favorite && (
                                                <span className="ml-3"><FaHeart color={"#cc3333"} size={20}/></span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {popupVisible && plantaSeleccionada && (
                        <>
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="flex flex-col items-center gap-2 bg-white p-8 rounded-lg w-96">
                                    <img src={plantaSeleccionada.image} alt={plantaSeleccionada.alias}
                                         className="w-16 h-16 mr-2 rounded-full"/>
                                    <h3 className="text-lg font-semibold mb-2">{plantaSeleccionada.alias}</h3>
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