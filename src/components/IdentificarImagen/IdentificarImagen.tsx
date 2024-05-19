"use client"
import styles from "@/components/IdentificarImagen/identificarImagen.module.css";
import Image from "next/image";

import {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";




interface IdentificarImagenProps{
    imagen: string;
    pagina: string;
}

export default function IdentificarImagen(props:IdentificarImagenProps){
    const { imagen, pagina } = props;
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

    const handleIdentificarClick = async () => {
        if (!archivoSeleccionado) {
            alert("Por favor selecciona un archivo primero.");
            return;
        }

        const formData = new FormData();
        formData.append("image", archivoSeleccionado);


            await fetch(
                "http://localhost:8080/api/v1/image",
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
    };

    return (
        <section className={`${styles[imagen]}`}>
            <div className={`${styles.contenidoIdentificar} flex flex-col items-center justify-center`}>
                <div className={`${styles.logoIdentificar} flex-1 flex items-center justify-center `}>
                    <Image className={`${styles.marca} `} src={`/isotipo-fondo-claro.png`} alt="usuario prueba"
                           width="150"
                           height="150"/>
                    <h2 className={`${styles.textoIdentificar}`}>Identifica tu planta y su estado de salud ¡Es
                        gratis!</h2>
                </div>
                <div className="flex-1 flex  items-center flex-col gap-16">
                    <h2 className={`${styles.textoSubirIdentificar}`}>Sube o arrastre tu foto</h2>
                    <div className={`${styles.subirIdentificar} flex gap-8`}>
                        <label htmlFor="archivoInput" className={`${styles.seleccionarIdentificar}`}>
                            Selecciona Archivo
                        </label>
                        <input type="file" id="archivoInput" onChange={handleArchivoSeleccionado}
                               style={{display: 'none'}}/>
                        <p>{archivoSeleccionado ? archivoSeleccionado.name : "Sin archivo seleccionado"}</p>
                    </div>
                    <button onClick={handleIdentificarClick}
                            className={`${styles.botonIdentificar} py-2 px-4 rounded`}>Identificar
                    </button>
                </div>
            </div>
        </section>
    )
}