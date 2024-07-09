"use client"
import styles from "@/app/home.module.css";
import stylesJardin from "@/app/jardin/jardin.module.css"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { FaClock, FaHeart, FaLeaf, FaTrash } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
import { BalooBhaina2 } from "../ui/fonts";
import { GardenService } from "../../services/GardenService";
import { PlantService } from "../../services/PlantService";
import { Garden, Plant } from "@/interfaces/index";
import ToastSuccess from "@/components/Toasts/ToastSuccess";
import ToastWarning from "@/components/Toasts/ToastWarning";
import { useRouter } from "next/navigation";
import { AuthenticationService } from "@/services/AuthenticationService";

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
    const [plantaSeleccionada, setPlantaSeleccionada] = useState<Plant | null>(null);
    const [jardinDePlanta, setJardinDePlanta] = useState<Garden | null>(null);
    const [cat, setCat] = useState(0);

    const mostrarPopup = (planta: any, idPlanta: any, garden: Garden | null) => {
        setPopupVisible(true);
        setPlantaSeleccionada(planta);
        setCat(idPlanta);
        setJardinDePlanta(garden || null);
        // console.log(planta)
    };

    const [filtro, setFiltro] = useState('');
    const [filtroPlantas, setFiltroPlantas] = useState(false);
    const [filtroPlantaFavorita, setFiltroPlantaFavorito] = useState(false);
    const [filtroPlantaTipo, setFiltroPlantaTipo] = useState('');
    const [filtroPlantaFechaReciente, setFiltroPlantaFechaReciente] = useState(false);
    const [filtroPlantaFechaAntiguo, setFiltroPlantaFechaAntiguo] = useState(false);
    const [buscador, setBuscador] = useState('');
    const [gardens, setGardens] = useState<Garden[]>([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idGardenDelete, setIdGardenDelete] = useState<number | any>();
    const [confirmDeleteGarden, setConfirmDeleteGarden] = useState(false);
    const gardenService = new GardenService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const plantService = new PlantService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const auth = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    const handleCancelDelete = () => {
        setConfirmDelete(false);
        setConfirmDeleteGarden(false);
    };
    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const handleDeleteGardenClick = (garden: Garden) => {
        setConfirmDeleteGarden(true);
        setIdGardenDelete(garden.id);
    };

    useEffect(() => {
        auth.validateLogged()
        fetchGardens();

        filtrarPlantasPorFiltro();

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
    }, [filtroPlantas, filtroPlantaFavorita, filtroPlantaTipo, filtroPlantaFechaReciente, filtroPlantaFechaAntiguo]);

    const router = useRouter();

    const fetchGardens = async () => {
        auth.validateLogged()
        try {
            const garden = await gardenService.getGardens();
            setGardens(garden);
        } catch (e: any) {
            if (e.code === 'NotAuthorizedException') {
                router.push('/login');
            } else {
                console.error(e);
            }
        }
    };

    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastWarning, setShowToastWarning] = useState(false);
    const [message, setMessage] = useState('');

    const handleConfirmDelete = async () => {
        auth.validateLogged()
        try {
            await plantService.deletePlant(plantaSeleccionada?.id);

            fetchGardens();
            setMessage("Planta borrada exitosamente.");
            setShowToastSuccess(true);
            setConfirmDelete(false);
            setPopupVisible(false);

        } catch (error: any) {
            console.error('Error deleting plant:', error);

            if (error.code === 'NotAuthorizedException') {
                router.push('/login');
            } else {
                setMessage("No se pudo borrar tu planta.");
                setShowToastWarning(true);
            }
        }
    };

    const handleConfirmDeleteGarden = async () => {
        auth.validateLogged()
        try {
            await gardenService.deleteGarden(idGardenDelete);
            fetchGardens();
            setMessage("Jardín borrado exitosamente.");
            setShowToastSuccess(true);
            setConfirmDeleteGarden(false);
            setPopupVisible(false);
        } catch (error: any) {
            if (error.code === 'NotAuthorizedException') {
                router.push('/login');
            } else {
                setMessage("Tu Jardín tiene plantas.");
                setConfirmDeleteGarden(false);
                setShowToastWarning(true);
            }
        }
    };

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

    const uniqueGardenNames = Array.from(new Set(gardens.flatMap(garden => garden.name)));

    const [showButton, setShowButton] = useState(false);

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

    function formatDateString(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year}`;
    }

    const findGardenIdFromPlantId = (plantId: number): string | null => {
        for (const garden of gardens) {
            for (const plant of garden.plants) {
                if (plant.id === plantId) {
                    return garden.name;
                }
            }
        }
        return null;
    };

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
                <div className={"flex flex-col items-center my-12"}>
                    {/*<h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Mi jardín</h1>*/}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10">
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
                                                {garden.id && <FaTrash
                                                    onClick={() => handleDeleteGardenClick(garden)}
                                                    color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2 cursor-pointer"} />
                                                }
                                                <h3 className="text-lg font-semibold mb-2">{garden.name}</h3>
                                                <div
                                                    className="flex flex-wrap gap-2 justify-between grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-10">
                                                    {garden.plants.map((plant, index) => (
                                                        <div key={index}
                                                            className="flex flex-row justify-between items-center cursor-pointer"
                                                            onClick={() => mostrarPopup(plant, plant.id, garden)}>
                                                            <div className={"flex items-center"}>
                                                                <img src={plant.photos && plant.photos.length > 0 && plant.photos[plant.photos.length - 1].url !== "" ? plant.photos[plant.photos.length - 1].url : "/planta-sin-foto.jpg"} alt={plant.alias}
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
                                                {garden.id &&
                                                    <FaTrash
                                                        data-testid={`popup-button-${garden.id}`}
                                                        onClick={() => handleDeleteGardenClick(garden)}
                                                        color={"#d3d3d3"} size={20} className={"absolute top-0 right-0 m-2 cursor-pointer"} />
                                                }
                                                <h3 className="text-lg font-semibold mb-2">{garden.name}</h3>
                                                <div
                                                    className="flex flex-wrap gap-2 justify-between grid sm:grid-cols-2 sm:gap-y-4 sm:gap-x-10">
                                                    {garden.plants.map((plant, index) => (
                                                        <div key={index}
                                                            className="flex flex-row justify-between items-center cursor-pointer"
                                                            onClick={() => mostrarPopup(plant, plant.id, garden)}>
                                                            <div className={"flex items-center"}>
                                                                <img src={plant.photos && plant.photos.length > 0 && plant.photos[plant.photos.length - 1].url !== "" ? plant.photos[plant.photos.length - 1].url : "/planta-sin-foto.jpg"} alt={plant.alias}
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
                                                    onClick={() => mostrarPopup(plant, plant.id, null)}>
                                                    <div className="flex items-center">
                                                        <img src={plant.photos && plant.photos.length > 0 && plant.photos[plant.photos.length - 1].url !== "" ? plant.photos[plant.photos.length - 1].url : "/planta-sin-foto.jpg"} alt={plant.alias}
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
                                                    onClick={() => mostrarPopup(plant, plant.id, null)}>
                                                    <div className="flex items-center">
                                                        <img src={plant.photos && plant.photos.length > 0 && plant.photos[plant.photos.length - 1].url !== "" ? plant.photos[plant.photos.length - 1].url : "/planta-sin-foto.jpg"} alt={plant.alias}
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
                                            <img
                                                src={
                                                    plantaSeleccionada.photos &&
                                                        plantaSeleccionada.photos.length > 0 &&
                                                        plantaSeleccionada.photos[plantaSeleccionada.photos.length - 1].url !== ""
                                                        ? plantaSeleccionada.photos[plantaSeleccionada.photos.length - 1].url
                                                        : "/planta-sin-foto.jpg"
                                                } alt={plantaSeleccionada.alias}
                                                className="w-20 h-20 rounded-full" />
                                            <h3 className="text-lg font-semibold">{plantaSeleccionada.alias}</h3>
                                        </div>
                                        <div>
                                            <div>
                                                <table className="vertical-header-table rounded w-80 border-collapse">
                                                    <tbody>
                                                        <tr>
                                                            <th className={`p-4 border`}>Jardín</th>
                                                            <td className={`p-4 border`}>{findGardenIdFromPlantId(plantaSeleccionada.id) || 'Sin Jardín'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th className={`p-4 border`}>Guardada el</th>
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
                    {confirmDeleteGarden && idGardenDelete && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <p className="mb-4">¿Estás seguro de que querés borrar este jardín?</p>
                                <div className="flex justify-end">
                                    <button
                                        data-testid="delete-button"
                                        onClick={handleConfirmDeleteGarden}
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
                </section>
            </div>
        </>
    )
}
