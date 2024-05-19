import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/estado/estado.module.css";

export default function EstadoPage() {
    return (
        <>
            <main className={`${styles.contenedor}`}>
                <section>
                    <div
                        className={`flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center my-12 gap-12`}>
                        <div className={'flex-1 flex flex-col items-center gap-5'}>
                            <h1 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Diagnóstico
                                de tu planta</h1>
                            <div className={`flex-1 flex items-start flex-col gap-5`}>
                                <div>
                                    <Image className={`sm:w-96 rounded shadow-lg border-2 border-green-800`}
                                           src="/resultado/albahaca-enferma.jpg"
                                           alt="Albahaca-enferma" width="250"
                                           height="250"/>
                                </div>
                                <div className="flex w-full gap-5 justify-between">

                                    <button
                                        className={`${styles.botonCards} bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                        <div>
                                            <Image src="/resultado/mas-icon.png" alt="mas-icon" width="20"
                                                   height="20"/>
                                        </div>
                                        Guardar
                                    </button>

                                    <button
                                        className={`${styles.botonCards} bg-[#88BC43] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2`}>
                                        Detalles
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/*<div className={`${styles.tabla} flex-1  text-2xl`}>*/}
                        {/*    <table className={'vertical-header-table'}>*/}
                        {/*        <tbody>*/}
                        {/*        <tr>*/}
                        {/*            <th className={`${styles.tablaCampos} p-10 border`}>Nombre científico</th>*/}
                        {/*            <td className={`${styles.tablaCampos} p-10 border`}>Ocimum basilicum</td>*/}
                        {/*        </tr>*/}
                        {/*        <tr>*/}
                        {/*            <th className={`${styles.tablaCampos} p-10 border`}>Nombres comunes</th>*/}
                        {/*            <td className={`${styles.tablaCampos} p-10 border`}>Albahaca, Alhábega, Alfábega,*/}
                        {/*                Basílico*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*        <tr>*/}
                        {/*            <th className={`${styles.tablaCampos} p-10 border`}>Género</th>*/}
                        {/*            <td className={`${styles.tablaCampos} p-10 border`}>Ocimum</td>*/}
                        {/*        </tr>*/}
                        {/*        <tr>*/}
                        {/*            <th className={`${styles.tablaCampos} p-10 border`}>Familia</th>*/}
                        {/*            <td className={`${styles.tablaCampos} p-10 border`}>Lamiaceae</td>*/}
                        {/*        </tr>*/}
                        {/*        </tbody>*/}
                        {/*    </table>*/}
                        {/*</div>*/}
                    </div>
                </section>
                <section className={'flex flex-col gap-12 m-10'}>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Estado de
                            salud</h2>
                        <div className={`flex items-center gap-5`}>
                            <div>
                                <Image className={`w-14 sm:w-20`} src="/estado/planta.png" alt="estado" width="100" height="100"/>
                            </div>
                            <div>
                                <p>¡Tu planta necesita ayuda!</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Descripción
                            general</h2>
                        <p>Tu planta ha sido dañada por <span
                            className="font-bold">ORUGAS</span>,
                            que se alimentan profusamente de las hojas.</p>
                        <div className={'flex flex-col gap-1'}>
                            <p className="mt-4"><span className="font-bold">Consejo:</span></p>
                            <div className={'flex items-center gap-5'}>
                                <div>
                                    <Image className={`w-14 sm:w-20`} src="/estado/insecticida.png" alt="insecticida" width="100" height="100"/>
                                </div>
                                <p>Elimina los insectos de la planta, utiliza insecticidas.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[45px] text-[#88BC43] font-bold`}>Datos</h2>
                        <p className="text-justify">
                            Las orugas pueden causar problemas a los aficionados a la jardinería. Si no se controlan,
                            estos
                            insectos pueden defoliar una planta en cuestión de días. Por otro lado, se trata de un
                            verdadero
                            desafío, puesto que las orugas se convierten eventualmente en hermosas mariposas y polillas,
                            importantes para la polinización y el ecosistema general
                            Si las orugas resultan problemáticas, los jardineros pueden eliminarlas manualmente, o bien
                            emplear redes antinsectos para proteger sus valiosas plantas.</p>
                    </div>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Síntomas</h2>
                        <p className="text-justify">Los síntomas de una infestación de orugas incluyen agujeros en las
                            hojas
                            y daños en bordes y
                            flores. Algunas orugas son visibles, pero otras se camuflan y requieren una inspección
                            minuciosa. Los jardineros deben buscar cuidadosamente a lo largo de los tallos y bajo las
                            hojas,
                            y también buscar huevos agrupados. Una vez que las orugas se desarrollan, se convierten en
                            pupas, de donde emergen mariposas o polillas para reiniciar el ciclo.</p>
                    </div>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Solución</h2>
                        <p className="text-justify">
                            A pesar de que las orugas son diferentes entre sí, todas mastican diversas partes de la
                            planta y
                            pueden causar daños significativos si se presentan en grandes cantidades.
                        </p>
                        <p>Para casos graves:</p>
                        <ol className={`${styles.listNumber} list-decimal list-inside pl-5 text-justify`}>
                            <li className="mb-1">Aplicar insecticida. Para una solución orgánica, rocía las
                                plantas
                                con Bacillus thuringiensis (Bt), que afecta específicamente a la etapa larvaria de las
                                polillas y mariposas. Asegúrate de cubrir las plantas, ya que las orugas necesitan
                                ingerir
                                esta bacteria para que sea eficaz. Esto no daña a otros insectos.
                            </li>
                            <li className="mb-1">Rocía un extracto de pimiento picante. Las semillas de la
                                guindilla
                                se pueden cocinar en agua para elaborar un spray picante que desagrada a las orugas.
                                Rocía
                                esta mezcla en las plantas, pero ten en cuenta que también resultará picante para los
                                seres
                                humanos.
                            </li>
                            <li className="mb-1">Introduce insectos beneficiosos. Libera en tu jardín
                                insectos
                                que se
                                alimenten de orugas, tales como las avispas parasitarias.
                            </li>
                        </ol>
                        <p className="">Para casos menos graves:</p>
                        <ol className={`${styles.listNumber} list-decimal list-inside pl-5 text-justify`}>
                            <li className="mb-1">Eliminación manual. Usando guantes, retira las orugas de
                                las
                                plantas
                                y deséchalas en un cubo de agua jabonosa.
                            </li>
                            <li className="mb-1">Espolvorea las plantas con tierra de diatomeas. Este polvo
                                es
                                inofensivo para los humanos, pero irrita a las orugas y dificulta que se desplacen y
                                coman
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h2 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>Prevención</h2>
                        <p className="text-justify">La prevención puede requerir menos esfuerzo que los intentos de
                            erradicar
                            las infestaciones ya consolidadas. Estas son las principales medidas de prevención que
                            aconsejamos tomar:</p>
                        <ol className={`${styles.listNumber} list-decimal list-inside pl-5 text-justify`}>
                            <li className="mb-1">Monitoriza las plantas. Revisa las plantas regularmente
                                para
                                ver si hay huevos de oruga en las hojas. Si no pertenecen a una especie en peligro de
                                extinción, pueden ser aplastadas.
                            </li>
                            <li className="mb-1">Usa redes para insectos. Cubre las plantas con redes anti
                                insectos para evitar que mariposas y polillas pongan huevos en las plantas.
                            </li>
                            <li className="mb-1">Aplica tierra de diatomeas. Aplica tierra de diatomeas a
                                las
                                plantas al principio de la temporada y vuelve a aplicarlo tras las lluvias.
                            </li>
                            <li className="mb-1"> Fomenta la diversidad vegetal. Esto atrae a insectos
                                depredadores, incluyendo a las avispas parásitas
                            </li>
                        </ol>
                    </div>
                </section>
            </main>
        </>
    )
}