import Image from "next/image";
import stylesHeader from "../../components/Header/header.module.css";
import stylesResultado from "./resultado.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import styles from "@/app/home.module.css";

export default function ResultadoPage() {
    return (
        <>
            <main>
                <section>
                    <div className={'flex justify-center items-center gap-64 my-12'}>


                        <div className={'flex flex-col items-center gap-10'}>
                            <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Albahaca</h1>
                            <div className="flex-1 flex items-start flex-col gap-5">
                                <Image src="/resultado/albahaca-sana.jpg" alt="Albahaca-sana" width="500"
                                       height="500"/>
                                <button
                                    className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                    <div>
                                        <Image src="/resultado/mas-icon.png" alt="mas-icon" width="30"
                                               height="30"/>
                                    </div>
                                    Guardar planta
                                </button>
                            </div>
                        </div>


                        <div className={'table-container text-2xl'}>
                            <table className={'vertical-header-table'}>
                                <tbody>
                                <tr>
                                    <th className={'p-10 border'}>Nombre científico</th>
                                    <td className={'p-10 border'}>Ocimum basilicum</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Nombres comunes</th>
                                    <td className={'p-10 border'}>Albahaca, Alhábega, Alfábega, Basílico</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Género</th>
                                    <td className={'p-10 border'}>Ocimum</td>
                                </tr>
                                <tr>
                                    <th className={'p-10 border'}>Familia</th>
                                    <td className={'p-10 border'}>Lamiaceae</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section>
                    <div className={'m-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Estado
                            de salud</h1>
                        <div className={'flex justify-start items-center gap-10 mt-10'}>
                            <div>
                                <Image src="/resultado/planta-sana-icon.jpg" alt="Albahaca-sana" width="90"
                                       height="90"/>
                            </div>
                            <p className={'text-3xl'}>¡Tu planta parece sana!</p>
                        </div>
                    </div>

                    <div className={'m-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Descripción
                            general</h1>
                        <p className={'text-3xl text-justify'}>
                            La albahaca, conocida científicamente como Ocium Basilicum, es una hierba aromática
                            originaria de la India, Irán y de otras regiones de Asia, de intenso aroma y color. Además
                            de proporcionar belleza al jardín y la terraza, ofrece numerosos beneficios como condimento
                            en la cocina, hierba saludable y protección para otras plantas del jardín y el huerto.</p>
                    </div>

                    <div className={'m-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Características</h1>

                        {/*div grande*/}
                        <div className={'flex flex-wrap'}>
                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tamaño-icon.png" alt="tamaño-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col items-start'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Tamaño</h2>
                                    <ul className={` ${stylesResultado.texto} list-disc list-inside text-2xl`}>
                                        <li>Tallo de 30 a 50 cm de altura</li>
                                        <li>Hojas de 3 a 5 cm de longitud</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/fertilizante-icon.png" alt="fertilizante-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Fertilizante</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Aplicar un fertilizante
                                        equilibrado una vez al mes durante la temporada de crecimiento.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/riego-icon.png" alt="riego-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Riego</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Mantener el suelo ligeramente
                                        húmedo, evitando el encharcamiento.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/tierra-icon.png" alt="tierra-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Tierra</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Requiere un suelo bien drenado y
                                        fértil, preferiblemente con un pH entre 6.0 y 7.5.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/exposolar-icon.png" alt="exposolar-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Exposición
                                        solar</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Luz solar directa por la mañana
                                        y sombra parcial por la tarde.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/insecticida-icon.png" alt="insecticida-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Insecticida</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Controlar plagas con
                                        insecticidas naturales como jabón insecticida o aceite de neem.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temperatura-icon.png" alt="temperatura-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Temperatura
                                        adecuada</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Prefiere temperaturas cálidas
                                        entre 18-25°C, evitando temperaturas extremadamente frías.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/temporada-icon.png" alt="temporada-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Temporada</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Se puede sembrar en primavera
                                        después de que haya pasado el
                                        riesgo de heladas.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/ubicacion-icon.png" alt="ubicacion-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Ubicaciones
                                        posibles</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Ventana, balcón, terraza, patio
                                        trasero, porche.</p>
                                </div>
                            </div>

                            <div className={'mt-16 flex items-center gap-8 w-2/4'}>
                                <div>
                                    <Image src="/resultado/podado-icon.png" alt="podado-icon" width="150"
                                           height="150"/>
                                </div>
                                <div className={'flex flex-col'}>
                                    <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Podado</h2>
                                    <p className={` ${stylesResultado.texto} text-2xl`}>Podar cada 15 días
                                        aproximadamente, para conseguir un mayor crecimiento y que la recolecta sea más
                                        abundante.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'m-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Guía
                            de siembra</h1>
                        <ul className={`list-decimal list-inside text-3xl flex flex-col gap-8 text-justify`}>
                            <li>Las semillas puedes recogerlas en otoño extrayéndolas de una planta adulta, y
                                guardándolas para la siembra en una bolsa de papel, o bien comprándolas en un centro de
                                horticultura o jardinería.
                            </li>
                            <div className={'flex justify-center'}>
                                <Image src="/resultado/semilla.jpg" alt="semilla" width="500"
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
                                <Image src="/resultado/semillero.jpg" alt="semillero" width="500"
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
                                <Image src="/resultado/brote.jpg" alt="brote" width="500"
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
                                <Image src="/resultado/maceta.jpg" alt="maceta" width="500"
                                       height="500"/>
                            </div>
                        </ul>
                        
                    </div>

                    <div className={'m-32'}>
                        <h1 className={`${stylesHeader.titulo} ${BalooBhaina2.className} text-2xl font-semibold mb-4`}>Consejos</h1>
                        <ul className={`list-disc list-inside text-3xl flex flex-col gap-8`}>
                            <li>La albahaca es más aromática cuando se utiliza fresca, así que arranca las hojas justo
                                antes de usarlas para obtener el mejor sabor y aroma.
                            </li>
                            <li>Si la albahaca comienza a florecer, retira las flores para prolongar la producción de
                                hojas y mantener el mejor sabor.
                            </li>
                            <li>Si es necesario lavar las hojas de albahaca, hazlo suavemente y sécalas completamente
                                antes de usarlas para evitar que pierdan su sabor.
                            </li>
                            <li>Si no vas a utilizar toda la albahaca de inmediato, puedes conservar las hojas en un
                                recipiente hermético en la nevera durante unos días o congelarlas para usarlas más
                                tarde.
                            </li>
                        </ul>

                        <div className={'mt-20'}>
                            <button
                                className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                <div>
                                    <Image src="/resultado/mas-icon.png" alt="Albahaca-sana" width="30"
                                           height="30"/>
                                </div>
                                Guardar planta
                            </button>
                        </div>
                    </div>
                </section>


            </main>

        </>

    )
}