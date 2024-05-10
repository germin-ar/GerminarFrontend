import stylesEspacio from "@/app/espacio/espacio.module.css";

import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import { MdSunny } from "react-icons/md";
import { TbSunOff } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";


import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";

export default  function EspacioPage(){
    return(
        <>
            <IdentificarImagen imagen="imagenIdentificarEspacio" pagina="/espacio"/>
            <main className={`${stylesEspacio.contenedorEspacio}`}>
                <div className="flex-1">
                    <div>
                        <h2 className={`${stylesEspacio.titulo} ${BalooBhaina2.className}`}>Ingresa tus datos manualmente </h2>
                    </div>
                    <div className={`${stylesEspacio.contenido}`}>
                        <p className={`${stylesEspacio.subTitulo}`}>¿Dónde planeas ubicar tu planta?</p>
                        <div className="flex  flex-wrap gap-3 justify-center items-center pt-10">
                            <div className={`${stylesEspacio.ubicacion}`}>Baño</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Patio trasero</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Porche</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Oficina</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Cocina</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Balcón</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Terraza</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Escritorio</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Pasillo</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Ventana</div>
                            <div className={`${stylesEspacio.ubicacion}`}>Otro..</div>
                        </div>
                    </div>
                </div>
                <div className={`${stylesEspacio.contenido} flex-1`}>
                    <p className={`${stylesEspacio.subTitulo}`}>Selecciona la cantidad de luz que recibirá tu planta</p>
                    <div className="flex items-center flex-wrap justify-center gap-10 pt-10">
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>Sol pleno</p>
                            <MdSunny className={`${stylesEspacio.iconosLuz}`}/>
                            <input type="radio" id="pleno" name="luz"/>


                        </div>
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>Sin luz directa</p>
                            <TbSunOff className={`${stylesEspacio.iconosLuz}`}/>
                            <input type="radio" id="sin" name="luz"/>
                        </div>
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>+ de 4hs de sol</p>
                            <BsCloudSun className={`${stylesEspacio.iconosLuz}`}/>
                            <input type="radio" id="medio" name="luz"/>
                        </div>
                    </div>
                </div>
                <div className={`${stylesEspacio.contenido} flex-1`}>
                    <p className={`${stylesEspacio.subTitulo}`}>Selecciona la temporada del año en la que te
                        encuentras</p>
                    <div className="flex items-center flex-wrap justify-center gap-10 pt-10">
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>Otoño</p>
                            <Image src="/otono.png" alt="otono" width="80" height="80" />
                            <input type="radio" id="otono" name="temporada"/>
                        </div>
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>Verano</p>
                            <Image src="/verano.png" alt="verano" width="80" height="80" />
                            <input type="radio" id="verano" name="temporada"/>
                        </div>
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>Primavera</p>
                            <Image src="/primavera.png" alt="primavera" width="80" height="80" />
                            <input type="radio" id="primavera" name="temporada"/>
                        </div>
                        <div className={`${stylesEspacio.tipoSol}`}>
                            <p>Invierno</p>
                            <Image src="/invierno.png" alt="invierno" width="80" height="80"/>
                            <input type="radio" id="invierno" name="temporada"/>
                        </div>
                    </div>
                </div>
            </main>
            <div className={`${stylesEspacio.botonContenedor}`}>
            <button className={`${stylesEspacio.boton} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Analizar</button>
            </div>
        </>

    )
}