import Image from "next/image";
import stlyesRecomendacion from "@/app/espacio/recomendacion/recomendacion.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import {FaRegCheckCircle} from "react-icons/fa";
import Link from "next/link";
import {IoIosPartlySunny, IoIosSunny} from "react-icons/io";
import {FaTemperatureArrowDown, FaTemperatureArrowUp} from "react-icons/fa6";
import React from "react";
import {IoWater} from "react-icons/io5";

export default function RecomendacionPage() {

    const stylesRecomendacion = {
        sunny: 'relative group',
        partlySunny: 'relative group',
        temperatureArrowUp: 'relative group',
        temperatureArrowDown: 'relative group',
        water: 'relative group',
        tooltip: 'absolute mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    };

    return (
        <section className={`${stlyesRecomendacion.contenedor}`}>
            <section className={"m-10"}>

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
                        <div className="flex justify-around gap-10">
                            <div className={stylesRecomendacion.sunny}>
                                <IoIosSunny size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Luz directa</div>
                            </div>
                            <div className={stylesRecomendacion.temperatureArrowUp}>
                                <FaTemperatureArrowUp size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Temperatura alta</div>
                            </div>
                            <div className={stylesRecomendacion.water}>
                                <IoWater size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                            </div>
                        </div>
                    </div>


                    <div className="pt-10">
                        <h3 className={`${BalooBhaina2.className} text-center`}>Lechuga</h3>
                        <Link href="/espacio/recomendacion/planta">
                            <Image className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800`}
                                   src="/recomendacion/lechuga.png"
                                   alt="Lechuga" width="250"
                                   height="250"/>
                        </Link>
                        <div className={'flex justify-around gap-10'}>
                            <div className={stylesRecomendacion.partlySunny}>
                                <IoIosPartlySunny size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Luz parcial</div>
                            </div>
                            <div className={stylesRecomendacion.temperatureArrowDown}>
                                <FaTemperatureArrowDown size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Temperatura baja</div>
                            </div>
                            <div className={stylesRecomendacion.water}>
                                <div className={'flex gap-0'}>
                                    <IoWater size={45} className={"cursor-pointer"}/>
                                    <IoWater size={45} className={"cursor-pointer"}/>
                                </div>
                                <div className={stylesRecomendacion.tooltip}>Riego moderado</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10">
                        <h3 className={`${BalooBhaina2.className} text-center`}>Morrón</h3>
                        <div>
                            <Image className={`sm:w-96 sm:h-60 rounded shadow-lg border-2 border-green-800`}
                                   src="/recomendacion/morrón.png"
                                   alt="Morrón" width="250"
                                   height="250"/>
                        </div>
                        <div className={'flex justify-around gap-10'}>
                            <div className={stylesRecomendacion.partlySunny}>
                                <IoIosPartlySunny size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Luz parcial</div>
                            </div>
                            <div className={stylesRecomendacion.temperatureArrowUp}>
                                <FaTemperatureArrowUp size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Temperatura alta</div>
                            </div>
                            <div className={stylesRecomendacion.water}>
                                <IoWater size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                            </div>
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
                        <div className={'flex justify-around gap-10'}>
                            <div className={stylesRecomendacion.sunny}>
                                <IoIosSunny size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Luz directa</div>
                            </div>
                            <div className={stylesRecomendacion.temperatureArrowDown}>
                                <FaTemperatureArrowDown size={45} className={"cursor-pointer"}/>
                                <div className={stylesRecomendacion.tooltip}>Temperatura baja</div>
                            </div>
                            <div className={stylesRecomendacion.water}>
                                <div className={'flex gap-0'}>
                                    <IoWater size={45} className={"cursor-pointer"}/>
                                    <IoWater size={45} className={"cursor-pointer"}/>
                                    <IoWater size={45} className={"cursor-pointer"}/>
                                </div>
                                <div className={stylesRecomendacion.tooltip}>Riego alto</div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </section>
    )
}