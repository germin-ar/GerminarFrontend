import Image from "next/image";
import stlyesRecomendacion from "@/app/espacio/recomendacion/recomendacion.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import {FaRegCheckCircle} from "react-icons/fa";

export default function RecomendacionPage() {
    return (
        <main className={`${stlyesRecomendacion.contenedor}`}>
            <div>
                <div className="flex items-center pt-10 pl-5">
                    <FaRegCheckCircle className={`${stlyesRecomendacion.check}`}/>
                    <h2 className={`${BalooBhaina2.className} ${stlyesRecomendacion.titulo} `}>Aquí
                        tienes algunas opciones para tu Patio trasero</h2>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-10 mb-10">
                    <div className="pt-10">
                        <p className={`${stlyesRecomendacion.planta} ${BalooBhaina2.className} text-center`}>Albahaca</p>
                        <div className={`${stlyesRecomendacion.imagen}`}>
                            <Image src="/recomendacion/albahaca.png" alt="albahaca" width="500" height="500"/>
                        </div>
                    </div>
                    <div className="pt-10">
                        <p className={`${stlyesRecomendacion.planta} ${BalooBhaina2.className} text-center`}>Lechuga</p>
                        <div className={`${stlyesRecomendacion.imagen}`}>
                            <Image src="/recomendacion/lechuga.png" alt="lechuga" width="500" height="500"/>
                        </div>
                    </div>
                    <div className="pt-10">
                        <p className={`${stlyesRecomendacion.planta} ${BalooBhaina2.className} text-center`}>Morrón</p>
                        <div className={`${stlyesRecomendacion.imagen}`}>
                            <Image src="/recomendacion/morron.png" alt="morron" width="500" height="500"/>
                        </div>
                    </div>
                    <div className="pt-10">
                        <p className={`${stlyesRecomendacion.planta} ${BalooBhaina2.className} text-center`}>Tomate</p>
                        <div className={`${stlyesRecomendacion.imagen}`}>
                            <Image src="/recomendacion/tomate.png" alt="tomate" width="500" height="500"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}