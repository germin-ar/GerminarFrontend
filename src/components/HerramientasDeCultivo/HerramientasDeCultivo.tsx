import styles from "@/app/home.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import Link from "next/link";

interface ButtonScrollProps {
    targetRef: React.RefObject<HTMLDivElement>
}

export default function HerramientasDeCultivo(props: ButtonScrollProps) {
    const { targetRef } = props;
  const handleClick = () => {
      if (targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: 'smooth'});
      }
  }

    return (
        <section className={`${styles.fondoCards} rounded flex justify-center items-center flex-col gap-5 `}>
            <h2 className={`${styles.tituloSecundario} ${BalooBhaina2.className}`}>Herramientas de cultivo
                inteligentes</h2>

            <div className={`flex justify-center items-center flex-wrap gap-5`}>
                <div className={`${styles.cards} shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center">
                        <p className={`${BalooBhaina2.className} text-center`}>¿Cómo
                            identifico mi planta?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <button
                            onClick={handleClick}
                            className={`${styles.botonCards} shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            Identificar
                        </button>
                    </div>
                </div>
                <div className={`${styles.cards} shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center">
                        <p className={`${BalooBhaina2.className} text-center`}>¿Qué
                            puedo plantar hoy?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href="/descubrir"
                              className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            Descubrir
                        </Link>
                    </div>
                </div>
                <div className={`${styles.cards} shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center">
                        <p className={`${BalooBhaina2.className} text-center  `}>¿Qué
                            puedo plantar en
                            este espacio?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href="/espacio"
                              className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            Analizar
                        </Link>
                    </div>
                </div>
                <div className={`${styles.cards} shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white p-4 rounded-md shadow-md`}>
                    <div className="flex-1 flex justify-center items-center ">
                        <p className={`${BalooBhaina2.className} text-center `}>¿Qué
                            le sucede a mi
                            planta?</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full text-center">
                        <Link href={`/diagnosticar`}
                              className={`${styles.botonCards} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                            Diagnosticar
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    )
}