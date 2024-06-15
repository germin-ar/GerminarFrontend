"use client"
import styles from "@/components/IdentificarImagen/identificarImagen.module.css";
import Image from "next/image";
import React, {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";


interface IdentificarImagenProps {
    imagen: string;
    pagina: string;
    forwardRef?: React.RefObject<HTMLDivElement>
}

export default function IdentificarImagen(props: IdentificarImagenProps) {
    const {imagen, pagina} = props;
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
        null
    );
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
            router.push("/espacio/recomendacion");
            return;
        }

        await fetch(
            "http://localhost:8080/api/v1/images",
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
                           width="150" height="150"/>
                    {imagen === 'imagenIdentificarEspacio' ? (
                        <>
                            <h1>Identifica tu Espacio ¡Es gratis!</h1>
                        </>
                    ) : (
                        <>
                            <h1 className={`${styles.textoPrimario}`}>Identifica tu planta y su estado de salud ¡Es
                                gratis!</h1>
                            <h1 className={`${styles.textoSecundario}`}>Identifica tu planta y su estado ¡Gratis!</h1>
                        </>
                    )}
                </div>
                <form className={`${styles.form} flex-1 flex items-center flex-col gap-16 w-[90%]`}
                      onSubmit={handleIdentificarClick}>
                    <h2 className={``}>Sube o arrastre tu foto</h2>
                    <div className={`${styles.subirIdentificar} flex gap-8 items-center justify-center`}>
                        <label htmlFor="archivoInput" className={"cursor-pointer flex items-center gap-3"}>
                            <div className={`${styles.seleccionarIdentificar} text-lg`}>
                                Selecciona Archivo
                            </div>
                            <input type="file" id="archivoInput" onChange={handleArchivoSeleccionado}
                                   style={{display: 'none'}}/>
                            <p>{archivoSeleccionado ? archivoSeleccionado.name : "Sin archivo seleccionado"}</p>
                        </label>
                    </div>
                    <button type="submit"
                            className={`bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                        Identificar
                    </button>
                </form>
            </div>
        </section>
    )
}