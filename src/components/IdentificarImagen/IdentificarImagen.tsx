"use client"
import styles from "@/components/IdentificarImagen/identificarImagen.module.css";
import Image from "next/image";
import React, { ChangeEvent, forwardRef, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { json } from "node:stream/consumers";
import { SpacePlantingService } from "@/services/SpacePlantingService";
import { ImageService } from "@/services/ImageService";
import ToastWarning from "../Toasts/ToastWarning";




interface IdentificarImagenProps {
    imagen: string;
    pagina: string;
    forwardRef?: React.RefObject<HTMLDivElement>;
    onResultadoRecibido: (resultado: any) => void;
}

export default function IdentificarImagen(props: IdentificarImagenProps) {
    const { imagen, pagina, onResultadoRecibido } = props;
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
        null
    );


    //const [ubicacion, setUbicacion] = useState("");

    const router = useRouter()


    const handleArchivoSeleccionado = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const archivo = event.target.files[0];
            setArchivoSeleccionado(archivo);
            setIsButtonDisabled(false);
        }
    };

    const [showToastWarning, setShowToastWarning] = useState(false);
    const [message, setMessage] = useState('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const spacePlantingService = new SpacePlantingService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const imageService = new ImageService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    const handleIdentificarClick = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        if (!archivoSeleccionado) {
            setMessage("Seleccioná una imagen primero");
            setShowToastWarning(true);
            return;
        }

        setIsButtonDisabled(true);

        const formData = new FormData();
        formData.append("image", archivoSeleccionado);

        if (props.imagen === "imagenIdentificarEspacio") {
            try {
                const response = await spacePlantingService.getSpacePlanting(formData);
                if (response) {
                    onResultadoRecibido(response.space_name);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (props.imagen === "imagenIdentificar") {
            try {
                const response = await imageService.saveImage(formData);
                if (response) {
                    router.push(`/resultado/${response.id}`)
                }
            } catch (error) {
                console.error(error);
            }
        }
    };



    return (
        <>
            <section className={`${styles[imagen]} relative`} ref={props.forwardRef}>
                <div className="fixed right-10 z-10">
                    {showToastWarning && (
                        <ToastWarning
                            message={`${message}`}
                            onClose={() => setShowToastWarning(false)}
                        />
                    )}
                </div>
                <div className={`${styles.contenidoIdentificar} flex flex-col items-center justify-center`}>
                    <div className={`${styles.logoIdentificar} flex-1 flex items-center justify-center md:px-4`}>
                        <Image className={`${styles.marca} `} src={`/isotipo-fondo-claro.png`} alt="usuario prueba"
                            width="150" height="150" />
                        {imagen === 'imagenIdentificarEspacio' ? (
                            <>
                                <h2 className="font-bold">Identificá tu espacio ¡Es gratis!</h2>
                            </>
                        ) : (
                            <>
                                <h2 className={`${styles.textoPrimario} font-bold text-center`}>Identificá tu planta y su estado de salud ¡Es
                                    gratis!</h2>
                                <h2 className={`${styles.textoSecundario} font-bold text-center`}>Identificá tu planta y su estado ¡Gratis!</h2>
                            </>
                        )}
                    </div>
                    <form className={`${styles.form} flex-1 flex items-center flex-col gap-16 w-[90%]`}
                        onSubmit={handleIdentificarClick}>
                        <h2 className={`font-bold`}>Subí tu foto</h2>
                        <div className={`${styles.subirIdentificar} flex gap-8 items-center justify-center`}>
                            <label htmlFor="archivoInput" className={"cursor-pointer flex flex-col sm:flex-row items-center"}>
                                <p className={`${styles.seleccionarIdentificar} text-lg bg-[#d9d9d9] py-2 px-4 w-full sm:w-60`}>
                                    Seleccioná un archivo
                                </p>
                                <input type="file" id="archivoInput" onChange={handleArchivoSeleccionado}
                                    style={{ display: 'none' }} />
                                <p className="text-lg bg-[#323331] py-2 px-4 ">{archivoSeleccionado ? archivoSeleccionado.name : "Sin archivo seleccionado"}</p>
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className={`mb-10 bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75 disabled:bg-gray-500`}>
                            Identificar
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}
