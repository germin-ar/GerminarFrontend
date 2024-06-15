import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/guia/guia.module.css";

export default function GuiaPage() {
    return (
        <>
                <section>
                    <div className="flex-1 flex flex-col items-center gap-5">
                        <div className="relative w-full h-96 rounded-b-lg overflow-hidden">
                            {/* Imagen de fondo */}
                            <Image
                                className="absolute inset-0 w-full h-full object-cover"
                                src={"/estado/fondo-albahaca.jpg"}
                                alt={"Alabahca"}
                                layout="fill"
                            />
                            {/* Fondo oscuro para el texto */}
                            <div className="absolute inset-0 bg-black opacity-40 rounded-b-lg" />
                            {/* Contenedor de texto */}
                            <div className="absolute bottom-5 left-5 text-white p-4">
                                <h1 className={`${BalooBhaina2.className} font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}>
                                    Como cultivar Albahaca con éxito
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={"m-10"}>
                    <div className={'mb-32 bg-white rounded-lg shadow-lg p-6'}>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Guía de siembra</h2>
                        <ol className={`${styles.listNumber} list-decimal list-inside pl-5 text-justify flex flex-col gap-8 text-justify`}>
                            <li>Las semillas puedes recogerlas en otoño extrayéndolas de una planta adulta, y
                                guardándolas para la siembra en una bolsa de papel, o bien comprándolas en un centro de
                                horticultura o jardinería.
                            </li>
                            <div className={'flex justify-center'}>
                                <Image src="/resultado/semilla.jpg" alt="Semilla" width="500"
                                       height="500"/>
                            </div>
                            <li>La mejor época para plantarla será a mediados o finales de primavera. Así, nos
                                aseguraremos de que crecimiento sea el adecuado y se mantenga siempre en perfectas
                                condiciones.
                            </li>
                            <li>Preparar el semillero que usarás para sembrar. Una buena opción es utilizar un
                                recipiente de poca profundidad, aproximadamente de entre 5 y 10 cms, el cual deberás
                                llenar de tierra fresca y abonada.
                            </li>
                            <div className={'flex justify-center'}>
                                <Image src="/resultado/semillero.jpg" alt="Semillero" width="500"
                                       height="500"/>
                            </div>
                            <li>Las semillas se plantan a poca profundidad (1 cm) haciendo agujeros con el dedo en la
                                tierra, depositando dos o tres semillas por agujero y cubriendo con tierra
                                cuidadosamente. Una vez finalizado este proceso, debes regar con agua todo el semillero.
                                Este deberá permanecer en una ventana, balcón o terraza para que reciba el sol directo,
                                y se debe regar cada uno o dos días.
                            </li>
                            <li>Las plántulas de albahaca brotan entre 10 y 15 días después de la plantación, y las
                                puedes mantener allí hasta que tengan 6 hojas (unos 8 - 10 cms de altura). El
                                transplante debe hacerse en la mañana, antes de que el semillero reciba el sol de lleno
                                y antes de regar las plantas. Hay que tener mucho cuidado con las plántulas de albahaca
                                para no estropear las raíces. Antes de transplantar, se debe tener una maceta preparada
                                (de unos 20 o 30 cm de altura) con tierra abonada, seca y no muy compactada.
                            </li>
                            <div className={'flex justify-center'}>
                                <Image src="/resultado/brote.jpg" alt="Brote" width="500"
                                       height="500"/>
                            </div>
                            <li>En la maceta, realiza un agujero con la mano o una pala de jardinería, y deposita la
                                plántula, cuidando que las raíces no se doblen. Después, agrega tierra hasta cubrir un
                                poco el tallo, y compacta un poco la tierra apoyando las palmas de las manos cerca del
                                tallo y presionando suavemente.
                            </li>
                            <li>Finalmente se debe regar abundantemente toda la superficie de tierra. El riego de la
                                albahaca deberá ser frecuente pero en reducidas cantidades, es decir, que no quede
                                encharcada. Una vez crezca la planta de albahaca, tendrás hojas frescas desde principios
                                de verano hasta mediados de otoño, y algunas veces incluso más.
                            </li>
                            <div className={'flex justify-center'}>
                                <Image src="/resultado/maceta.jpg" alt="Maceta" width="500"
                                       height="500"/>
                            </div>
                        </ol>
                    </div>
                </section>
        </>

    )
}