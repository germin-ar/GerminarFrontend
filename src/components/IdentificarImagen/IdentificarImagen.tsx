"use client"
import styles from "@/components/IdentificarImagen/identificarImagen.module.css";
import Image from "next/image";
import React, {ChangeEvent, forwardRef, useRef, useState} from "react";
import {useRouter} from "next/navigation";




interface IdentificarImagenProps {
    imagen: string;
    pagina: string;
    forwardRef?: React.RefObject<HTMLDivElement>;
    onResultadoRecibido: (resultado: any) => void;
}

export default function IdentificarImagen(props: IdentificarImagenProps) {
    const {imagen, pagina, onResultadoRecibido} = props;
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
        null
    );


    //const [ubicacion, setUbicacion] = useState("");

    const router = useRouter()


    const handleArchivoSeleccionado = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const archivo = event.target.files[0];
            setArchivoSeleccionado(archivo);
        }
    };

    const handleIdentificarClick = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        if (!archivoSeleccionado) {
            alert("Por favor selecciona un archivo primero.");
            return;
        }

        const formData = new FormData();
        formData.append("image", archivoSeleccionado);

        if (props.imagen === "imagenIdentificarEspacio") {
            // Si es igual a "imagenIdentificarEspacio", no hacer fetch
            /*await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/images`,
                {
                    method: "POST",
                    body: formData,
                }
            ).then(res => {
                return res.json();
            })
                .then(json => {
                    setUbicacion(json);
                    onResultadoRecibido(json);
                })
                .catch(err => console.error("Error", err));

             */
            onResultadoRecibido("llegaaaa");
        }
        if (props.imagen === "imagenIdentificar"){
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/images`,
            {
                method: "POST",
                body: formData,
                /*headers:{
                    "Content-Type": "multipart/form-data"
                }*/
            }
        )
            .then(res => {
                return res.json();
            })
            .then(json => {
                //redirect()
                router.push(`/resultado/${json.id}`)
            })
            .catch(err => console.error("Error", err))
        }
        /*await fetch(
            "http://127.0.0.1:5000/upload",
            {
                method: "POST",
                body: formData,
                /*headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
        )
            .then(res => {
                return res.json();
            })
            .then(json => {
                //router.push(`/resultado/${id}`);
                //redirect()
                console.log(json)
                const reader = new FileReader();
                reader.onloadend = () => {
                    localStorage.setItem('imagen', reader.result as string);
                };
                reader.readAsDataURL(archivoSeleccionado);
                router.push(`/resultado/${json.predictions[0].label}`)

            })
            .catch(err => console.error("Error", err))*/
    };

    return (
        <section className={`${styles[imagen]}`} ref={props.forwardRef}>
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
                    <h2 className={`font-bold`}>Subí o arrastrá tu foto</h2>
                    <div className={`${styles.subirIdentificar} flex gap-8 items-center justify-center`}>
                        <label htmlFor="archivoInput" className={"cursor-pointer flex flex-col sm:flex-row items-center"}>
                            <p className={`${styles.seleccionarIdentificar} text-lg bg-[#d9d9d9] py-2 px-4 w-full sm:w-60`}>
                                Seleccioná un archivo
                            </p>
                            <input type="file" id="archivoInput" onChange={handleArchivoSeleccionado}
                                   style={{display: 'none'}}/>
                            <p className="text-lg bg-[#323331] py-2 px-4 ">{archivoSeleccionado ? archivoSeleccionado.name : "Sin archivo seleccionado"}</p>
                        </label>
                    </div>
                    <button type="submit"
                            className={`mb-10 bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                        Identificar
                    </button>
                </form>
            </div>
        </section>
    )
}
