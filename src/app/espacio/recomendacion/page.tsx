import Image from "next/image";
import stlyesRecomendacion from "@/app/espacio/recomendacion/recomendacion.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import {FaRegCheckCircle} from "react-icons/fa";
import Link from "next/link";

export default function RecomendacionPage() {
    return (
        <section className={`${stlyesRecomendacion.contenedor}`}>
            <section className={"m-10"}>
                <div>
                    <div className="flex items-center pt-10 pl-5 gap-3">
                        <FaRegCheckCircle className={`${stlyesRecomendacion.check}`}/>
                        <p className={`${BalooBhaina2.className}`}>Aquí
                            tienes algunas opciones para tu <span className={"text-green-800"}>Patio trasero</span></p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-10">
                        <div className="pt-10">
                            <h3 className={`${BalooBhaina2.className} text-center`}>Albahaca</h3>
                            <Link href="/espacio/recomendacion/planta">
                                <Image className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800`}
                                       src="/recomendacion/albahaca.png"
                                       alt="Albahaca" width="250"
                                       height="250"/>
                            </Link>
                        </div>
                        <div className="pt-10">
                            <h3 className={`${BalooBhaina2.className} text-center`}>Lechuga</h3>
                            <Link href="/espacio/recomendacion/planta">
                                <Image className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800`}
                                       src="/recomendacion/lechuga.png"
                                       alt="Lechuga" width="250"
                                       height="250"/>
                            </Link>
                        </div>
                        <div className="pt-10">
                            <h3 className={`${BalooBhaina2.className} text-center`}>Morrón</h3>
                            <div>
                                <Image className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800`}
                                       src="/recomendacion/morrón.png"
                                       alt="Morrón" width="250"
                                       height="250"/>
                            </div>
                        </div>
                        <div className="pt-10">
                            <h3 className={`${BalooBhaina2.className} text-center`}>Tomate</h3>
                            <Link href="/espacio/recomendacion/planta">
                                <Image className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800`}
                                       src="/recomendacion/tomate.png"
                                       alt="Tomate" width="250"
                                       height="250"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}