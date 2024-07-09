"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BalooBhaina2 } from "@/app/ui/fonts";
import { ImSpinner } from "react-icons/im";
import Link from "next/link";
import { PlantSuggestionService } from "@/services/PlantSuggestionsService";
import { PlantSuggestion } from "@/interfaces/index";
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {AuthenticationService} from "@/services/AuthenticationService";

export default function RecomendacionPage() {

    const [plantRecomendation, setPlantRecomendation] = useState<PlantSuggestion[]>([]);
    const searchParams = useSearchParams()
    const espacio = searchParams.get('espacio')
    const temporada = searchParams.get('temporada')
    const luz = searchParams.get('luz')

    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");
    const auth = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const plantSuggestionService = new PlantSuggestionService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    useEffect(() => {
        auth.isLogging()
        const fetchPlantSuggestions = async () => {
            try {
                setLoading(true)
                const data = await plantSuggestionService.getPLantsSuggestionPlace(luz, temporada, espacio);
                setPlantRecomendation(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlantSuggestions();
    }, []);

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
                            tienes algunas opciones para sembrar en<span className={"text-green-800"}> {espacio} </span>
                            durante <span className={"text-green-800"}> {temporada} </span>
                            con <span className={"text-green-800"}>{luz === 'sin-luz' ? 'sombra' : luz === 'sol-pleno' ? 'sol pleno' : luz === 'mas-4hs-sol' ? 'sol parcial' : luz}</span>.
                        </p>
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
                                plantRecomendation.map((plant, index) => (
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