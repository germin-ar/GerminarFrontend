"use client"
import stylesEspacio from "@/app/espacio/espacio.module.css";
import styles from "@/app/home.module.css";
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import { MdSunny } from "react-icons/md";
import { TbSunOff } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import { BalooBhaina2 } from "@/app/ui/fonts";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EspacioPage() {

    const [resultado, setResultado] = useState<String | null>(null);
    const router = useRouter();
    const handleResultadoRecibido = (resultado: any) => {
        console.log("Resultado recibido en el padre:", resultado);
        setResultado(resultado);
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Opcional: desplazamiento suave
        });
    };


    const [luz, setLuz] = useState('sol-pleno');
    const [temporada, setTemporada] = useState('otoño');



    const handleLuzChange = (event: any) => {
        setLuz(event.target.value);
    };

    const handleTemporadaChange = (event: any) => {
        setTemporada(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (resultado === null) {
            alert("Cargar uno foto antes de continuar");
            return;
        }
        console.log('Datos a enviar:', { luz, temporada, resultado });
        router.push(`/espacio/recomendacion?luz=${luz}&temporada=${temporada}&espacio=${resultado}`);

    };

    const capturarTexto = (texto: string) => {
        setResultado(texto);
    };

    return (
        <>
            <IdentificarImagen
                imagen="imagenIdentificarEspacio"
                pagina="espacio/recomendacion"
                onResultadoRecibido={handleResultadoRecibido}
            />
            <section className={`${stylesEspacio.contenedorEspacio}`}>
                <form onSubmit={handleSubmit}>
                    <section>
                        <div className="flex-1">
                            <div>
                                <h2 className={`${BalooBhaina2.className} text-[#88BC43] text-center`}>
                                    Ingresá tus datos manualmente
                                </h2>
                            </div>
                            <div className={`${stylesEspacio.contenido}`}>
                                <p>¿Dónde planeás ubicar tu planta?</p>
                                <div className={`${stylesEspacio.ubicacionResp} flex flex-wrap gap-5 justify-center items-center pt-10 font-bold`}>
                                    {resultado ?
                                        <label htmlFor="baño"
                                            className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-4 has-[:checked]:border-green-800 rounded-xl`}>
                                            <div className={`${stylesEspacio.ubicacion}`}>
                                                <h4>{resultado}</h4>
                                                <input className="peer/baño sr-only" type="radio" id="baño" name="ubicacion" />
                                            </div>
                                        </label>
                                        :
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleScrollToTop}
                                                className={`${styles.botonCards} bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                                Identifica tu espacio
                                            </button>
                                            <div
                                                className={`${stylesEspacio.ubicacionResp} flex flex-wrap gap-3 justify-center items-center pt-10 font-bold`}>
                                                <label
                                                    htmlFor="comedor"
                                                    onClick={() => capturarTexto('comedor')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Comedor</h4>
                                                        <input className="peer/baño sr-only" type="radio" id="comedor"
                                                            name="comedor" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="dormitorio"
                                                    onClick={() => capturarTexto('dormitorio')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Dormitorio</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="dormitorio"
                                                            name="dormitorio" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="habitación"
                                                    onClick={() => capturarTexto('habitación')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Habitación</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="habitación"
                                                            name="habitación" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="sala"
                                                    onClick={() => capturarTexto('sala')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Sala</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="sala"
                                                            name="sala" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="baño"
                                                    onClick={() => capturarTexto('baño')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>baño</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="baño"
                                                            name="baño" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="jardín"
                                                    onClick={() => capturarTexto('jardín')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>jardín</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="jardín"
                                                            name="jardín" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="cocina"
                                                    onClick={() => capturarTexto('cocina')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Cocina</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="cocina"
                                                            name="cocina" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="balcon"
                                                    onClick={() => capturarTexto('balcon')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Balcón</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="balcon"
                                                            name="balcon" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="terraza"
                                                    onClick={() => capturarTexto('terraza')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Terraza</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="terraza"
                                                            name="terraza" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="living"
                                                    onClick={() => capturarTexto('living')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Living</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="living"
                                                            name="living" />
                                                    </div>
                                                </label>
                                                <label
                                                    htmlFor="cuarto"
                                                    onClick={() => capturarTexto('cuarto')}
                                                    className={`${stylesEspacio.botonUbicacion} cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl`}>
                                                    <div className={`${stylesEspacio.ubicacion}`}>
                                                        <h4>Cuarto</h4>
                                                        <input className="peer/baño sr-only" type="radio"
                                                            id="cuarto"
                                                            name="cuarto" />
                                                    </div>
                                                </label>
                                            </div>
                                        </>

                                    }

                                </div>
                            </div>
                        </div>
                        <div className={`${stylesEspacio.contenido} flex-1`}>
                            <p>Seleccioná la cantidad de luz que recibirá tu planta</p>
                            <div className="flex items-center flex-wrap justify-center gap-10 pt-10">
                                <label htmlFor="pleno" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>Sol pleno</p>
                                        <MdSunny className={`${stylesEspacio.iconosLuz}`} />
                                        <input type="radio" id="pleno" name="luz" value="sol-pleno" checked={luz === 'sol-pleno'} onChange={handleLuzChange} />
                                    </div>
                                </label>
                                <label htmlFor="sin" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>Sin luz directa</p>
                                        <TbSunOff className={`${stylesEspacio.iconosLuz}`} />
                                        <input type="radio" id="sin" name="luz" value="sin-luz" checked={luz === 'sin-luz'} onChange={handleLuzChange} />
                                    </div>
                                </label>
                                <label htmlFor="medio" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>+ de 4hs de sol</p>
                                        <BsCloudSun className={`${stylesEspacio.iconosLuz}`} />
                                        <input type="radio" id="medio" name="luz" value="mas-4hs-sol" checked={luz === 'mas-4hs-sol'} onChange={handleLuzChange} />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className={`${stylesEspacio.contenido} flex-1`}>
                            <p>Seleccioná la temporada del año en la que te encontrás</p>
                            <div className="flex items-center flex-wrap justify-center gap-10 pt-10">
                                <label htmlFor="otoño" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>Otoño</p>
                                        <Image src="/otono.png" alt="Otono" width="80" height="80" />
                                        <input type="radio" id="otoño" name="temporada" value="otoño" checked={temporada === 'otoño'} onChange={handleTemporadaChange} />
                                    </div>
                                </label>
                                <label htmlFor="verano" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>Verano</p>
                                        <Image src="/verano.png" alt="Verano" width="80" height="80" />
                                        <input type="radio" id="verano" name="temporada" value="verano" checked={temporada === 'verano'} onChange={handleTemporadaChange} />
                                    </div>
                                </label>
                                <label htmlFor="primavera" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>Primavera</p>
                                        <Image src="/primavera.png" alt="Primavera" width="80" height="80" />
                                        <input type="radio" id="primavera" name="temporada" value="primavera" checked={temporada === 'primavera'} onChange={handleTemporadaChange} />
                                    </div>
                                </label>
                                <label htmlFor="invierno" className={"cursor-pointer"}>
                                    <div className={`${stylesEspacio.tipoSol}`}>
                                        <p>Invierno</p>
                                        <Image src="/invierno.png" alt="Invierno" width="80" height="80" />
                                        <input type="radio" id="invierno" name="temporada" value="invierno" checked={temporada === 'invierno'} onChange={handleTemporadaChange} />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </section>
                    <div className={`${stylesEspacio.botonContenedor}`}>
                        <button type="submit" className={`${styles.botonCards} bg-[#88BC43] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            Analizar
                        </button>
                    </div>
                </form>
            </section>
        </>

    )
}