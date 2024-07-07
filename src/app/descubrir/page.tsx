"use client"
import stylesDescubrir from "./descubrir.module.css";
import { BalooBhaina2 } from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/home.module.css";
import { useState } from "react";
import Map from "@/components/map/Map";
import Link from "next/link";

interface Location {
    latitude: number | null | string;
    longitude: number | null | string;
}

export default function DescubrirPage() {
    const [locationData, setLocationData] = useState<Location>({ latitude: null, longitude: null });
    const [mapa, setMapa] = useState(false);


    const handleCoordinatesChange = (lat: string, lng: string) => {

        setLocationData({
            latitude: lat,
            longitude: lng
        })
    };

    const handleMapClick = (event: any) => {
        setMapa(!mapa)
    };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationData({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    const [value, setValue] = useState(1);

    const handleChange = (e: any) => {
        setValue(parseInt(e.target.value));
    };

    const [valueLugar, setValueLugar] = useState(1);
    const handleChangeLugar = (e: any) => {
        setValueLugar(parseInt(e.target.value));
    };


    return (
        <>
            <section className={"m-10"}>
                <div className={'flex flex-col justify-center items-start gap-4 mt-12'}>
                    <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>
                        Encontrá tu planta perfecta</h2>

                    <p className="text-justify">Utilizando tu ubicación real, nuestra aplicación
                        identifica la época en la que te encontrás y te proporciona recomendaciones personalizadas
                        de plantas para sembrar y cosechar. Desde cultivos frescos de primavera hasta cosechas de
                        invierno abundantes, nuestra guía te ayudará a cultivar alimentos deliciosos durante todo el
                        año, adaptados a tu ubicación y clima locales. ¡Tu jardín florecerá en cada temporada
                        con nuestra ayuda!</p>
                </div>
                <div className={'flex flex-col gap-8'}>
                    <div className={'flex flex-col sm:flex-row items-center gap-5 mt-5'}>
                        <div className="flex gap-1">
                            <div>
                                <Image src="/descubrir/ubicacion-icon.png" alt="ubicacion-icon" width="30"
                                    height="30" />
                            </div>
                            <button onClick={getLocation} type="button"
                                className={'cursor-pointer underline font-semibold'}>
                                <p>Activar ubicación</p>
                            </button>
                        </div>
                        <p>o</p>
                        <button
                            onClick={handleMapClick}
                            className={`bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            {!mapa ? "Abrir Mapa" : "Cerrar Mapa"}
                        </button>
                    </div>

                    <div>
                        {
                            mapa && <Map onCoordinatesChange={handleCoordinatesChange} />
                        }
                        {locationData.latitude !== null && locationData.longitude !== null && (
                            <div>
                                <p>Latitud: {locationData.latitude}</p>
                                <p>Longitud: {locationData.longitude}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className={"m-10"}>
                <h3 className={`${BalooBhaina2.className} text-[#88BC43]`}>Luz solar</h3>
                <p>Seleccioná la cantidad de luz solar que recibirá (1 = poca luz, 10 = mucha luz)</p>
                <div className="flex items-center w-[80%] mx-auto gap-5 mt-2">
                    <p>{value}</p>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={value}
                        onChange={handleChange}
                        className="slider-thumb appearance-none w-full h-1 bg-gray-300 rounded-full outline-none appearance-none focus:outline-none"
                    />
                    <p>10</p>
                </div>
            </section>

            <section className={"m-10"}>
                <h3 className={`${BalooBhaina2.className} text-[#88BC43]`}>Espacio disponible</h3>
                <p>Seleccioná las dimensiones de tu espacio</p>
                <div className="flex items-center w-[80%] mx-auto gap-5 mt-2">
                    <p>{valueLugar}cm²</p>
                    <input
                        type="range"
                        min="30"
                        max="2500"
                        value={valueLugar}
                        onChange={handleChangeLugar}
                        className="slider-thumb appearance-none w-full h-1 bg-gray-300 rounded-full outline-none appearance-none focus:outline-none"
                    />
                    <p>2500cm²</p>
                </div>
            </section>
            
            <section className={"m-10"}>
                <Link href={`/descubrir/busqueda?latitude=${locationData.latitude}&longitude=${locationData.longitude}&sunExposure=${value}&squareCentimeters=${valueLugar}`}
                    className={`bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                    Buscar
                </Link>
            </section>
        </>

    )
}
