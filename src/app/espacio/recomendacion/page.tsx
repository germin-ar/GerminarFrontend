import Image from "next/image";
import stlyesRecomendacion from "@/app/espacio/recomendacion/recomendacion.module.css";
import { BalooBhaina2 } from "@/app/ui/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { IoIosPartlySunny, IoIosSunny } from "react-icons/io";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import React from "react";
import { IoWater } from "react-icons/io5";

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

                <div className="flex items-start pt-10 pl-5 gap-3">
                    <FaRegCheckCircle size={20} color="#275F08" className="sm:w-8 sm:h-8" />
                    <p className={`${BalooBhaina2.className} sm:text-2xl text-gray-900`}>Aquí
                        tienes algunas opciones ideales para tu <span className={"text-green-800"}>Patio trasero</span></p>
                </div>

                <div className="flex flex-wrap justify-center items-center">
                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/albahaca.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.sunny}>
                                <IoIosSunny size={30} className="text-3xl transition transform hover:scale-110 cursor-pointer" />
                                    <div className={stylesRecomendacion.tooltip}>Luz directa</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowUp}>
                                    <FaTemperatureArrowUp size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura alta</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <IoWater size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Albahaca</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/lechuga.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.partlySunny}>
                                    <IoIosPartlySunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz parcial</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowDown}>
                                    <FaTemperatureArrowDown size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura baja</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <div className={'flex gap-0 text-3xl transition transform hover:scale-110 cursor-pointer'}>
                                        <IoWater size={30} />
                                        <IoWater size={30} />
                                    </div>
                                    <div className={stylesRecomendacion.tooltip}>Riego moderado</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Lechuga</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitari</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/morrón.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.partlySunny}>
                                    <IoIosPartlySunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz parcial</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowUp}>
                                    <FaTemperatureArrowUp size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura alta</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <IoWater size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Morrón</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitaria</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/carlos.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.partlySunny}>
                                    <IoIosSunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz directa</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowDown}>
                                    <FaTemperatureArrowDown size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura baja</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <div className={'flex gap-0 text-3xl transition transform hover:scale-110 cursor-pointer'}>
                                        <IoWater size={30} />
                                        <IoWater size={30} />
                                        <IoWater size={30} />
                                    </div>
                                    <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Tomate</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexita</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/albahaca.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.sunny}>
                                    <IoIosSunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz directa</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowUp}>
                                    <FaTemperatureArrowUp size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura alta</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <IoWater size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Albahaca</h2>
                                <p className="leading-relaxed text-base">Fingerstache street</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/lechuga.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.partlySunny}>
                                    <IoIosPartlySunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz parcial</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowDown}>
                                    <FaTemperatureArrowDown size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura baja</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <div className={'flex gap-0 text-3xl transition transform hover:scale-110 cursor-pointer'}>
                                        <IoWater size={30} />
                                        <IoWater size={30} />
                                    </div>
                                    <div className={stylesRecomendacion.tooltip}>Riego moderado</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Lechuga</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexi</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/morrón.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.partlySunny}>
                                    <IoIosPartlySunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz parcial</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowUp}>
                                    <FaTemperatureArrowUp size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura alta</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <IoWater size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Morrón</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/espacio/recomendacion/planta"} className="xl:w-1/4 md:w-1/2 p-4">
                        <div className="bg-gray-100 rounded-lg hover:shadow-lg border w-full cursor-pointer">
                            <Image className="h-60 rounded w-full object-cover object-center mb-2"
                                src="/recomendacion/carlos.png"
                                alt="Albahaca" width="250"
                                height="250" />
                            <div className="flex justify-around mb-2 text-gray-800">
                                <div className={stylesRecomendacion.partlySunny}>
                                    <IoIosSunny size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Luz directa</div>
                                </div>
                                <div className={stylesRecomendacion.temperatureArrowDown}>
                                    <FaTemperatureArrowDown size={30} className={"text-3xl transition transform hover:scale-110 cursor-pointer"} />
                                    <div className={stylesRecomendacion.tooltip}>Temperatura baja</div>
                                </div>
                                <div className={stylesRecomendacion.water}>
                                    <div className={'flex gap-0 text-3xl transition transform hover:scale-110 cursor-pointer'}>
                                        <IoWater size={30} />
                                        <IoWater size={30} />
                                        <IoWater size={30} />
                                    </div>
                                    <div className={stylesRecomendacion.tooltip}>Riego escaso</div>
                                </div>
                            </div>
                            <div className="px-5 pb-3">
                                <h2 className="text-lg text-[#275F08] font-bold title-font">Tomate</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitari ulbche.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section >
        </section >
    )
}