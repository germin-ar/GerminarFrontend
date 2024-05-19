import stylesEspacio from "@/app/espacio/espacio.module.css";
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import {MdSunny} from "react-icons/md";
import {TbSunOff} from "react-icons/tb";
import {BsCloudSun} from "react-icons/bs";
import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function EspacioPage() {
    return (
        <>
            <IdentificarImagen imagen="imagenIdentificarEspacio" pagina="espacio/recomendacion"/>
            <main className={`${stylesEspacio.contenedorEspacio}`}>
                <section>
                    <div className="flex-1">
                        <div>
                            <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold text-center`}>Ingresa tus
                                datos manualmente</h2>
                        </div>
                        <div className={`${stylesEspacio.contenido}`}>
                            <p>¿Dónde planeas ubicar tu planta?</p>
                            <div className="flex flex-wrap gap-3 justify-center items-center pt-10 font-bold">
                                <label htmlFor="baño" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Baño</h4>
                                        <input className="peer/baño sr-only" type="radio" id="baño" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="patio-trasero" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Patio trasero</h4>
                                        <input className="sr-only" type="radio" id="patio-trasero" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="porche" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Porche</h4>
                                        <input className="sr-only" type="radio" id="porche" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="oficina" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Oficina</h4>
                                        <input className="sr-only" type="radio" id="oficina" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="cocina" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Cocina</h4>
                                        <input className="sr-only" type="radio" id="cocina" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="balcon" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Balcón</h4>
                                        <input className="sr-only" type="radio" id="balcon" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="terraza" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Terraza</h4>
                                        <input className="sr-only" type="radio" id="terraza" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="escritorio" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Escritorio</h4>
                                        <input className="sr-only" type="radio" id="escritorio" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="pasillo" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Pasillo</h4>
                                        <input className="sr-only" type="radio" id="pasillo" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="ventana" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Ventana</h4>
                                        <input className="sr-only" type="radio" id="ventana" name="ubicacion"/>
                                    </div>
                                </label>
                                <label htmlFor="otro" className={"cursor-pointer has-[:checked]:border-2 has-[:checked]:border-green-800 rounded-xl"}>
                                    <div className={`${stylesEspacio.ubicacion}`}>
                                        <h4>Otro...</h4>
                                        <input className="sr-only" type="radio" id="otro" name="ubicacion"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={`${stylesEspacio.contenido} flex-1`}>
                        <p>Selecciona la cantidad de luz que recibirá tu
                            planta</p>
                        <div className="flex items-center flex-wrap justify-center gap-10 pt-10">
                            <label htmlFor="pleno" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>Sol pleno</p>
                                    <MdSunny className={`${stylesEspacio.iconosLuz}`}/>
                                    <input type="radio" id="pleno" name="luz"/>
                                </div>
                            </label>
                            <label htmlFor="sin" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>Sin luz directa</p>
                                    <TbSunOff className={`${stylesEspacio.iconosLuz}`}/>
                                    <input type="radio" id="sin" name="luz"/>
                                </div>
                            </label>
                            <label htmlFor="medio" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>+ de 4hs de sol</p>
                                    <BsCloudSun className={`${stylesEspacio.iconosLuz}`}/>
                                    <input type="radio" id="medio" name="luz"/>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={`${stylesEspacio.contenido} flex-1`}>
                        <p>Selecciona la temporada del año en la que te encuentras</p>
                        <div className="flex items-center flex-wrap justify-center gap-10 pt-10">
                            <label htmlFor="otoño" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>Otoño</p>
                                    <Image src="/otono.png" alt="Otono" width="80" height="80"/>
                                    <input type="radio" id="otoño" name="temporada"/>
                                </div>
                            </label>
                            <label htmlFor="verano" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>Otoño</p>
                                    <Image src="/verano.png" alt="Verano" width="80" height="80"/>
                                    <input type="radio" id="verano" name="temporada"/>
                                </div>
                            </label>
                            <label htmlFor="primavera" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>Otoño</p>
                                    <Image src="/primavera.png" alt="Primavera" width="80" height="80"/>
                                    <input type="radio" id="primavera" name="temporada"/>
                                </div>
                            </label>
                            <label htmlFor="invierno" className={"cursor-pointer"}>
                                <div className={`${stylesEspacio.tipoSol}`}>
                                    <p>Otoño</p>
                                    <Image src="/invierno.png" alt="Invierno" width="80" height="80"/>
                                    <input type="radio" id="invierno" name="temporada"/>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>
            </main>
            <div className={`${stylesEspacio.botonContenedor}`}>
                <Link href="espacio/recomendacion"
                      className={`bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Analizar</Link>
            </div>
        </>

    )
}