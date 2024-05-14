import stylesHeader from "@/components/Header/header.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import Image from "next/image";
import styles from "@/app/home.module.css";

export default function EstadoPage(){
    return(
        <>
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
        </>
    )
}