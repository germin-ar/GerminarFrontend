"use client"
import stylesDescubrir from "./descubrir.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/home.module.css";
import {useState} from "react";
import Map from "@/components/map/Map";
import Link from "next/link";

interface Location {
    latitude: number | null | string;
    longitude: number | null | string;
}

export default function DescubrirPage(){
    const [locationData, setLocationData] = useState<Location>({latitude: null, longitude: null});
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

    const handleChange = (e:any) => {
        setValue(parseInt(e.target.value));
    };

    const [valueLugar, setValueLugar] = useState(1);
    const handleChangeLugar = (e:any) => {
        setValueLugar(parseInt(e.target.value));
    };


    return (
        <>
            <main className={`${stylesDescubrir.contenedor}`}>
                <section className={"m-10"}>
                    <div className={'flex flex-col justify-center items-start gap-4 mt-12'}>
                        <h1 className={`${BalooBhaina2.className} text-[#88BC43]`}>
                            Encuentra las plantas perfectas
                            <br/>para cada estación del año</h1>

                        <p>Utilizando tu ubicación real, nuestra aplicación
                            identifica la época en la que te encuentras y te proporciona recomendaciones personalizadas
                            de plantas para sembrar y cosechar. Desde cultivos frescos de primavera hasta cosechas de
                            invierno abundantes, nuestra guía te ayudará a cultivar alimentos deliciosos durante todo el
                            año, adaptados a tu ubicación y clima locales. ¡Haz que tu jardín florezca en cada temporada
                            con nuestra ayuda!</p>
                    </div>
                    <div className={'flex flex-col gap-8'}>
                        <div className={'flex items-center gap-5 mt-10'}>
                            <div>
                                <Image src="/descubrir/ubicacion-icon.png" alt="ubicacion-icon" width="30"
                                       height="30"/>
                            </div>
                            <button onClick={getLocation} type="button"
                                    className={'cursor-pointer underline font-semibold'}>Activar ubicación o
                            </button>
                            <p>o</p>
                            <button
                                onClick={handleMapClick}
                                className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>{!mapa ? "Abrir Mapa" : "Cerrar Mapa"}
                            </button>
                        </div>
                        <div>

                        </div>
                        <div>

                            {
                                mapa && <Map onCoordinatesChange={handleCoordinatesChange}/>
                            }
                            {locationData.latitude !== null && locationData.longitude !== null && (
                                <div>
                                    <p>Latitud: {locationData.latitude}</p>
                                    <p>Longitud: {locationData.longitude}</p>
                                </div>
                            )}
                        </div>
                        <div>
                        </div>
                    </div>


                </section>
                <section className={"m-10"}>
                    <h2 className={`${BalooBhaina2.className} text-[#88BC43]`}>Seleccion cantidad de luz</h2>
                    <div className="flex items-center w-[80%] mx-auto">
                        <span className="mr-2">{value}</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={value}
                            onChange={handleChange}
                            className="slider-thumb appearance-none w-full h-1 bg-gray-300 rounded-full outline-none appearance-none focus:outline-none"
                        />
                    </div>
                </section>
                <section className={"m-10"}>
                    <h2 className={`${BalooBhaina2.className} text-[#88BC43]`}>Seleccion cantidad metros</h2>
                    <div className="flex items-center w-[80%] mx-auto">
                        <span className="mr-2">{valueLugar}</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={valueLugar}
                            onChange={handleChangeLugar}
                            className="slider-thumb appearance-none w-full h-1 bg-gray-300 rounded-full outline-none appearance-none focus:outline-none"
                        />
                    </div>
                </section>
                <section className={"m-10"}>
                    <Link href={`/descubrir/busqueda?latitude=${locationData.latitude}&longitude=${locationData.longitude}&sun_exposure=${value}&square_meters=${valueLugar}&page=1`}
                        className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                        Buscar
                    </Link>
                </section>

            </main>

        </>

    )
}
