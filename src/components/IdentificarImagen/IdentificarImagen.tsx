import styles from "@/components/IdentificarImagen/identificarImagen.module.css";
import Image from "next/image";
import Link from "next/link";

interface IdentificarImagenProps{
    imagen: string;
    pagina: string;
}

export default function IdentificarImagen(props:IdentificarImagenProps){
    const { imagen, pagina } = props;

    return (
        <section className={`${styles[imagen]}`}>
            <div className={`${styles.contenidoIdentificar} flex flex-col items-center justify-center`}>
                <div className={`${styles.logoIdentificar} flex-1 flex items-center justify-center `}>
                    <Image className={`${styles.marca} `} src={`/logo.png`} alt="usuario prueba" width="150"
                           height="150"/>
                    <h2 className={`${styles.textoIdentificar}`}>Identifica tu planta y su estado de salud ¡Es
                        gratis!</h2>
                </div>
                <div className="flex-1 flex  items-center flex-col gap-16">
                    <h2 className={`${styles.textoSubirIdentificar}`}>Sube o arraste tu foto</h2>
                    <div className={`${styles.subirIdentificar} flex gap-8`}>
                        <p className={`${styles.seleccionarIdentificar}`}>Selecciona Archivo</p>
                        <p>Sin archivo seleccionado</p>
                    </div>
                    <Link href={`/${pagina}`} className={`${styles.botonIdentificar} py-2 px-4 rounded`}>Identificar</Link>
                </div>
            </div>
        </section>
    )
}