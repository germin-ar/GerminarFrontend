"use client"
import { BalooBhaina2 } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function IdentificarPlanta() {

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

        <section className={"flex flex-col gap-10 m-10"}>

            <div className=" pt-10 pl-5 gap-3">
                <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Diagnosticar planta</h2>
                <p>Para diagnosticar el estado de salud de tu planta, seleccioná una planta de tu jardín.
                    Nuestro sistema analizará la imagen de tu planta y te proporcionará
                    un diagnóstico y recomendaciones para su cuidado.</p>
                <p className="text-sm mt-1 text-gray-500">* Tené en cuenta que se utilizará la última imagen guardada.</p>
            </div>

            {gardens.length > 0 ? (

                gardens.map(garden => (

                    <div key={garden.id} className="flex flex-wrap items-center gap-20 p-5 border border-gray-200 p-4 rounded-lg">
                        <div className="flex flex-col">
                            <h3 className={`${BalooBhaina2.className} mb-1`}>{garden.name}</h3>
                            <div className="flex flex-row justify-center sm:justify-start gap-y-5 flex-wrap mx-auto w-full">
                                {garden.plants.map((plant) => (

                                    <Link href={`estado/${plant.id}`} >
                                        <div className="rounded w-full cursor-pointer flex flex-col items-center">
                                            <img className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover object-center mb-2 hover:shadow-lg transform hover:scale-110 transition duration-300"
                                                src={plant.photos && plant.photos.length > 0 && plant.photos[plant.photos.length - 1].url !== "" ? plant.photos[plant.photos.length - 1].url : "/planta-sin-foto.jpg"}
                                                alt={plant.alias}
                                            />
                                            <div>
                                                <h2 className="text-lg text-[#275F08] font-bold title-font text-wrap text-center w-52">{plant.alias}</h2>
                                            </div>
                                        </div>
                                    </Link>

                                ))}
                            </div>
                        </div>
                    </div>
                ))

            ) : (
                <div className="pl-5 ">
                    <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Aún no tienes jardines</h2>
                    <Link href={"/"} className="hover:underline">Ir al Home</Link>
                </div>
            )
            }
        </section >
    )
}