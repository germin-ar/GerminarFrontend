import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import styles from "@/app/home.module.css";
import stylesVideoSection from "@/app/germinar/germinar.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";

export default function GerminarPage() {
    return (
        <>
            <section className={`${stylesVideoSection.contenedor} p-10`}>
                <div className={`${stylesVideoSection.video}  w-full`}>
                    <video controls className="w-full rounded-[10px]">
                        <source src="/videolanding/landing.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className={`${stylesVideoSection.video1}`}>
                    <section>
                        <div
                            className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div
                                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Crear una cuenta
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="email" name="email" id="email"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="ingrese su correo" />
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   />
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar
                                                contraseña</label>
                                            <input type="confirm-password" name="confirm-password" id="confirm-password"
                                                   placeholder="••••••••"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   />
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox"
                                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                       />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms"
                                                       className="font-light text-gray-500 dark:text-gray-300">Acepto <a
                                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                    href="#">Terminos y condiciones</a></label>
                                            </div>
                                        </div>
                                        <button type="submit"
                                                className="w-full text-black bg-sky-300
                                                hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                                                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                                                dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrate
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            ¿Ya tenes una cuenta? <a href="#"
                                                                     className="font-medium text-primary-600 hover:underline dark:text-primary-500">Logueate</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <IdentificarImagen imagen="imagenIdentificar" pagina="/"/>
            <main className="flex justify-center items-center">
                {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                <section className={`${styles.fondoCards} flex justify-center items-center flex-col gap-5`}>
                    <p className={`${styles.tituloSecundario} tituloSecundario`}>Herramientas de cultivo
                        inteligentes</p>

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg`}>¿Cómo
                                    identifico mi planta?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <Link href="/diagnosticar"
                                      className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Identificar
                                </Link>
                            </div>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg`}>¿Qué
                                    puedo plantar hoy?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <Link href="/descubrir"
                                      className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Descubrir
                                </Link>
                            </div>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg `}>¿Qué
                                    puedo plantar en
                                    este espacio?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <Link href="/espacio"
                                      className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Analizar
                                </Link>
                            </div>
                        </div>
                        <div className={`${styles.cards} bg-white p-4 rounded-md shadow-md`}>
                            <div className="flex-1 flex justify-center items-center">
                                <p className={`${BalooBhaina2.className} ${styles.tituloCards} text-center text-lg  `}>¿Qué
                                    le sucede a mi
                                    planta?</p>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <Link href={`/dianosticarEstado`}
                                      className={`${styles.botonCards} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>
                                    Diagnosticar
                                </Link>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            <section className={`${styles.nuestraPropuesta} flex justify-center items-center flex-col md:flex-row`}>
                <div className="md:w-1/2">
                    <div
                        className={`${styles.contenidoPropuesta} flex flex-col items-center md:items-start text-center md:text-left`}>
                        <h2 className={`${styles.tituloSecundario} text-2xl font-semibold mb-4`}>Nuestra propuesta</h2>
                        <p>¿Sueñas con alimentos frescos directamente de tu casa? Nuestra aplicación transforma cada
                            rincón de tu hogar en un jardín próspero. Olvídate de las limitaciones de espacio y la falta
                            de experiencia. Te guiaremos paso a paso para cultivar con éxito en balcones, terrazas y
                            hasta interiores.</p>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className={`${styles.imagenPropuesta} flex justify-center md:justify-end`}>
                        <Image src="/ecosistema.jpg" alt="Ecosistema" width="500" height="300"/>
                    </div>
                </div>
            </section>
            <section className={`${stylesVideoSection.contImg} max-w-[1300px] py-[30px]`}>
                <Image src="/videolanding/recomendacion.jpeg" alt="recomendaciones" width={1500} height='1500'/>
            </section>


        </>
    )
}