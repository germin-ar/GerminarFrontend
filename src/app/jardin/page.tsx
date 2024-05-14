"use client"
import stylesJardin from "@/app/jardin/jardin.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import {CiCalendar} from "react-icons/ci";
import {IoAdd} from "react-icons/io5";
import {useState} from "react";
import {IoIosHome} from "react-icons/io";
import { PiPottedPlantFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa";
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
                    foto: '/recomendacion/morron.png',
                    especifico: [
                        {
                            nombre: 'morrón',
                            foto: '/recomendacion/morron.png'
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

    const handleUbicacionFilter = (ubicacion:string) => {
        setFiltro(ubicacion === 'Todos' ? '' : ubicacion);
        setUbicacionVisible(true);

    };



/****/
    const [popupVisible, setPopupVisible] = useState(false);
    const [plantaSeleccionada, setPlantaSeleccionada] = useState<Planta | null>(null); //
    const [cat, setCat] = useState("");


    const mostrarPopup = (planta: Planta, categoria:string) => {
        setPopupVisible(true);
        setPlantaSeleccionada(planta);
        setCat(categoria);
        console.log(planta)
    };


    return (
        <>
            <section className={`${stylesJardin.contenedor}`}>
                <h2 className={`${BalooBhaina2.className} ${stylesJardin.titulo}`}>Mi Jardín</h2>
                <div className="flex justify-center items-center gap-28">
                    <div className="flex-1 flex justify-center items-center  gap-5">
                        <div
                            className={`${stylesJardin.botones} flex justify-center items-center text-white font-bold py-2 px-4 rounded gap-2`}>
                            <CiCalendar className={`${stylesJardin.iconos}`}/>
                            <p>Calendario</p>
                        </div>
                        <div
                            className={`${stylesJardin.botones} flex justify-center items-center text-white font-bold py-2 px-4 rounded gap-2`}>
                            <IoAdd className={`${stylesJardin.iconos}`}/>
                            <p>Añadir nueva planta</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={filtro}
                            onChange={handleFiltroChange}
                            className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </section>
            <main className={`${stylesJardin.contenedorPlantas}`}>
                <div className={`${stylesJardin.contenidoAjustado} flex mb-10`}>
                    <div className="bg-gray-300 w-72 flex-shrink-0">
                        <ul className="pl-5 pt-5 select-none">
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <IoIosHome/>
                                    <p className="cursor-pointer text-[24px] font-bold"
                                       onClick={() => setUbicacionVisible(!ubicacionVisible)}>Ubicación</p>
                                </div>
                                {ubicacionVisible && (
                                    <ul className="pl-5">
                                        <li className="cursor-pointer text-[23px] "
                                            onClick={() => handleUbicacionFilter('Todos')}>Todos
                                        </li>
                                        <li className="cursor-pointer text-[23px] "
                                            onClick={() => handleUbicacionFilter('Balcón')}>Balcón
                                        </li>
                                        <li className="cursor-pointer text-[23px]"
                                            onClick={() => handleUbicacionFilter('Patio trasero')}>Patio trasero
                                        </li>
                                        <li className="cursor-pointer text-[23px] "
                                            onClick={() => handleUbicacionFilter('cocina')}>Cocina
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 ">
                                <p className="cursor-pointer text-[24px] font-bold"
                                       onClick={() => setPrioridadVisible(!prioridadVisible)}>Prioridad</p>
                                </div>
                                {prioridadVisible && (
                                    <div className="pl-5">

                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <PiPottedPlantFill/>
                                    <p className="cursor-pointer text-[23px] font-bold" onClick={() => setTipoVisible(!tipoVisible)}>Tipo</p>
                                </div>
                                {tipoVisible && (
                                    <div className="pl-5">
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 ">
                                    <FaClock/>
                                    <p className="cursor-pointer text-[24px] font-bold"
                                       onClick={() => setAntiguedadVisible(!antiguedadVisible)}>Antigüedad</p>
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
                                    <h3 className={`${stylesJardin.tituloContenedor} ${BalooBhaina2.className}`}>
                                        {categoria.categoria}
                                    </h3>
                                    <div className={`flex gap-10 flex-wrap`}>
                                        {categoria.plantas.map((planta, idx) => (
                                            <div key={idx}> {/* Aquí he agregado un div contenedor */}
                                                <p className={`${stylesJardin.plantasJardin} ${BalooBhaina2.className} text-[25px] font-bold text-center`}>{planta.nombre} {planta.especifico ? planta.especifico.length : 0} </p>
                                                <div className={`${stylesJardin.imagen}`}>
                                                    <Image className="cursor-pointer" onClick={() => mostrarPopup(planta, categoria.categoria)} src={`${planta.foto}`} alt={`${planta.nombre}`} width="500" height="250" />
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
                                        <h2 className={`${BalooBhaina2.className} ${stylesJardin.colorText} text-[50px]  text-2xl font-bold mb-4`}>{cat}:</h2>
                                        <p className=" text-[30px]  text-2xl font-bold mb-4 text-[#275F08]">{plantaSeleccionada.nombre}:</p>
                                        <ul  className="flex items-center justify-center gap-5">
                                            {plantaSeleccionada.especifico.map((detalle, index) => (
                                                <li key={index} className="mb-2">
                                                    <p className=" text-[24px] font-bold text-[#275F08]">{detalle.nombre}</p>
                                                    <div className={`${stylesJardin.imagenADetallePlantas}`} key={detalle.nombre}>
                                                        <Link href={`/jardin/${detalle.nombre}`}>
                                                            <Image src={`${detalle.foto}`} alt={`${detalle.nombre}`}
                                                                           width="300" height="150"/>
                                                        </Link>
                                                    </div>
                                                </li>
                                                ))}
                                        </ul>
                                    </div>
                                    <button className={`${stylesJardin.boton} font-bold mt-3 py-2 px-4 rounded text-white`}
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