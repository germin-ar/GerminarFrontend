"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import Link from "next/link";
import { BalooBhaina2 } from "@/app/ui/fonts";
import { PlantSuggestionService } from "@/services/PlantSuggestionsService";
import { PlantSuggestion } from "@/interfaces/index";
import { number } from "prop-types";
import { FaRegCheckCircle } from "react-icons/fa";
import {AuthenticationService} from "@/services/AuthenticationService";

export default function BusquedaPage() {

    const [plantSuggestions, setPlantSuggestions] = useState<PlantSuggestion[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");

    const searchParams = useSearchParams();
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const sunExposure = searchParams.get('sunExposure');
    const squareCentimeters = searchParams.get('squareCentimeters');
    const auth = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const plantSuggestionService = new PlantSuggestionService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const [season, setSeason] = useState('');
    useEffect(() => {
        auth.validateLogged()
        const fetchPlantSuggestions = async () => {
            try {
                setLoading(true)
                const data = await plantSuggestionService.getPlantsSuggestion(latitude, longitude, sunExposure, squareCentimeters);
                console.log(data)
                setPlantSuggestions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        const determineSeason = () => {
            if (latitude != null) {
                const lat = parseInt(latitude);

                const hemisphere = lat < 0 ? 'southern' : 'northern';
                const date = new Date();
                const month = date.getMonth();


                switch (month) {
                    case 11:
                    case 0:
                    case 1:
                        setSeason('Verano');
                        break;
                    case 2:
                    case 3:
                    case 4:
                        setSeason('Otoño');
                        break;
                    case 5:
                    case 6:
                    case 7:
                        setSeason('Invierno');
                        break;
                    case 8:
                    case 9:
                    case 10:
                        setSeason('Primavera');
                        break;
                    default:
                        setSeason('No se pudo determinar la estación');
                        break;
                }
            }
        };

        determineSeason();
        fetchPlantSuggestions();
    }, [latitude, longitude, sunExposure, squareCentimeters, currentPage]);

    const openModal = (imageUrl: string) => {
        setModalImageUrl(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalImageUrl("");
        setModalOpen(false);
    };

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <section className="container mx-auto mt-8">
                <button
                    className={`bg-[#88BC43] my-4 w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}
                    onClick={handleGoBack}>Volver
                </button>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <FaRegCheckCircle className={`w-6 h-6 text-[#275F08] mb-1`} />
                        <p className={`${BalooBhaina2.className}`}>Aquí
                            tienes algunas opciones para sembrar en <span className={"text-green-800"}>{season}</span></p>
                    </div>
                    <span>Hacé click en la imagen para expandir...</span>
                </div>

                <div className="overflow-x-auto max-h-[500px]">
                    <table className="min-w-full bg-white border border-gray-200 overflow-y-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase w-1/3">Nombre
                                    Común
                                </th>
                                <th className="border-b border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase w-1/3">Nombre
                                    Científico
                                </th>
                                <th className="border-b border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase w-1/3">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="border-b border-gray-200 px-6 py-4 w-full">
                                        <div
                                            className="flex flex-col items-center justify-center gap-10 w-full mx-auto h-[500px]">
                                            <ImSpinner className="spinner h-20 w-40 mx-auto text-green-600 animate-spin" />
                                            <h2 className="text-gray-700">Cargando...</h2>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                plantSuggestions.map((plant, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                        style={{ height: '80px' }}>
                                        <td className="border-b border-gray-200 px-6 py-4">{plant.common_name}</td>
                                        <td className="border-b border-gray-200 px-6 py-4">{plant.scientific_name}</td>
                                        <td className="border-b border-gray-200 px-6 py-4 flex gap-2 justify-center items-center">
                                            <div className="max-w-[100px] max-h-[80px] overflow-hidden cursor-pointer"
                                                onClick={() => openModal(plant.url_image)}>
                                                <img src={plant.url_image} alt={plant.common_name}
                                                    className="object-cover h-24 max-w-full h-auto" />
                                            </div>
                                            <Link href={`/descubrir/busqueda/${plant.slug_scientific_name}`} className="bg-[#88BC43] rounded px-4 py-2 text-white">Ir a detalles
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>




                {modalOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="h-[500px] w-[500px]  relative max-w-full max-h-full overflow-hidden">
                            <button className="absolute top-2 right-2 text-white text-2xl focus:outline-none"
                                onClick={closeModal}>&times;</button>
                            <img src={modalImageUrl} alt="Imagen Grande"
                                className="object-contain max-w-full max-h-full" />
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

