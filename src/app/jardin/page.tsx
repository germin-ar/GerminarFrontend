"use client"
import stylesJardin from "@/app/jardin/jardin.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import {CiCalendar} from "react-icons/ci";
import {useState} from "react";
import {IoIosHome} from "react-icons/io";
import {PiPottedPlantFill} from "react-icons/pi";
import {FaClock, FaHeart} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Planta {
    nombre: string;
    foto: string;
    especifico: { nombre: string; foto: string; }[];
}

export default function JardinPage() {
    const data = [
        {
            categoria: 'Balcón',
            plantas: [
                {
                    nombre: 'Tomate',
                    foto: '/recomendacion/tomate.png',
                    especifico: [
                        {
                            nombre: 'Tomate',
                            foto: '/recomendacion/tomate.png',
                            codigo: "2580"
                        },
                        {
                            nombre: 'Carlos',
                            foto: '/recomendacion/carlos.png',
                            codigo: "2581"
                        }
                    ]
                },
                {
                    nombre: 'Rúcula',
                    foto: '/recomendacion/rucula.png',
                    especifico: [
                        {
                            nombre: 'Rucula',
                            foto: '/recomendacion/rucula.png',
                            codigo: "2582"
                        }
                    ]
                },
            ]
        },
        {
            categoria: 'Patio trasero',
            plantas: [
                {
                    nombre: 'Lechuga',
                    foto: '/recomendacion/lechuga.png',
                    especifico: [
                        {
                            nombre: 'Lechuga',
                            foto: '/recomendacion/lechuga.png',
                            codigo: "2583"
                        }
                    ]
                }

            ]
        },
        {
            categoria: 'Cocina',
            plantas: [
                {
                    nombre: 'morrón',
                    foto: '/recomendacion/morrón.png',
                    especifico: [
                        {
                            nombre: 'morrón',
                            foto: '/recomendacion/morrón.png'
                        }
                    ]
                },
                {
                    nombre: 'albahaca',
                    foto: '/recomendacion/albahaca.png',
                    especifico: [
                        {
                            nombre: 'albahaca',
                            foto: '/recomendacion/albahaca.png'
                        }
                    ]
                }
            ]
        }
    ];

    const [filtro, setFiltro] = useState('');

    const handleFiltroChange = (e: any) => {
        setFiltro(e.target.value);
    };

    const filteredData = data.filter((categoria) => {
        const categoriaIncluida = categoria.categoria.toLowerCase().includes(filtro.toLowerCase());
        const plantasFiltradas = categoria.plantas.filter((planta) => planta.nombre.toLowerCase().includes(filtro.toLowerCase()));
        return categoriaIncluida || plantasFiltradas.length > 0;
    });

    /**sidebar**/
    const [ubicacionVisible, setUbicacionVisible] = useState(false);
    const [prioridadVisible, setPrioridadVisible] = useState(false);
    const [tipoVisible, setTipoVisible] = useState(false);
    const [antiguedadVisible, setAntiguedadVisible] = useState(false);

    const handleUbicacionFilter = (ubicacion: string) => {
        setFiltro(ubicacion === 'Todos' ? '' : ubicacion);
        setUbicacionVisible(true);
    };

    /****/
    const [popupVisible, setPopupVisible] = useState(false);
    const [plantaSeleccionada, setPlantaSeleccionada] = useState<Planta | null>(null); //
    const [cat, setCat] = useState("");

    const mostrarPopup = (planta: Planta, categoria: string) => {
        setPopupVisible(true);
        setPlantaSeleccionada(planta);
        setCat(categoria);
        console.log(planta)
    };

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
                <div className={`${stylesJardin.contenidoAjustado} flex mb-10`}>
                    <div className="w-72 flex-shrink-0">
                        <ul className="pl-5 pt-5 select-none">
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <IoIosHome size={25}/>
                                        <span
                                            className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold"
                                            onClick={() => setUbicacionVisible(!ubicacionVisible)}>Ubicación</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>
                                </div>
                                {ubicacionVisible && (
                                    <ul className="pl-5">
                                        <li className="cursor-pointer"
                                            onClick={() => handleUbicacionFilter('Todos')}>
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
                                )}
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
                        {filteredData.map((categoria, index) => (
                            <div className="flex flex-col flex-wrap" key={index}>
                                <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>{categoria.categoria}</h2>
                                <div className={`flex gap-10 flex-wrap`}>
                                    {categoria.plantas.map((planta, idx) => (
                                        <div key={idx}> {/* Aquí he agregado un div contenedor */}
                                            <h3 className={`${BalooBhaina2.className} text-center`}>{planta.nombre} {planta.especifico ? planta.especifico.length : 0} </h3>
                                            <div>
                                                <Image
                                                    className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800 cursor-pointer`}
                                                    onClick={() => mostrarPopup(planta, categoria.categoria)}
                                                    src={`${planta.foto}`} alt={`${planta.nombre}`}
                                                    width="250" height="250"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {popupVisible && plantaSeleccionada && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="bg-white p-8 rounded-lg ">
                                    <div>
                                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>{cat}</h2>
                                        <ul className="flex items-center justify-center gap-5">
                                            {plantaSeleccionada.especifico.map((detalle, index) => (
                                                <li key={index} className="mb-2">
                                                    <div className={`${stylesJardin.imagenADetallePlantas}`}
                                                         key={detalle.nombre}>
                                                        <Link href={`/jardin/${detalle.nombre}`}>
                                                            <Image src={`${detalle.foto}`} alt={`${detalle.nombre}`}
                                                                   width="300" height="150"/>
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        className={`${stylesJardin.boton} font-bold mt-3 py-2 px-4 rounded text-white`}
                                        onClick={() => setPopupVisible(false)}>Cerrar
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    )
}