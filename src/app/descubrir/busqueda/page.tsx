"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import Link from "next/link";
import { BalooBhaina2 } from "@/app/ui/fonts";
import { PlantSuggestionService, PlantSuggestion } from "@/app/api/v1/plant-suggestion/PlantSuggestionsService";

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
  
    const plantSuggestionService = new PlantSuggestionService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    useEffect(() => {
        const fetchPlantSuggestions = async () => {
            try {
                setLoading(true)
                const data = await plantSuggestionService.getPlantsSuggestion(latitude, longitude, sunExposure, squareCentimeters);
                setPlantSuggestions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
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

    return (
        <>
            <section className="container mx-auto mt-8">
                <div className="flex justify-between items-center ">
                    <h3 className={`${BalooBhaina2.className} mb-4 w-4/5 md:w-4/5 text-wrap`}>Sugerencias de plantas</h3>
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
                                            <Link href={`/descubrir/busqueda/${plant.scientific_name.toLowerCase().replace(" ", "-")}`} className="bg-[#88BC43] rounded px-4 py-2 text-white">Ir a detalles
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

