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
      <>
      <h1>Hola</h1>
      </>
    )
}