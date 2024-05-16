"use client"
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import styles from "@/app/home.module.css";
import stylesVideoSection from "@/app/germinar/germinar.module.css";

import Image from "next/image";
import {useState} from "react";
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";

export default function GerminarPage() {
    const [showForm, setShowForm] = useState(false);

    const handleFormButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseFormButtonClick = () => {
        setShowForm(false);
    }



    const [activeSection, setActiveSection] = useState("")
    function handleScrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);

        }
    }


    return (
        <>
            <nav
                className="select-none fixed top-0 left-0 z-50 h-full w-[332px]  flex flex-col items-start justify-center  gap-3 pl-10">
                <div className="font-bold flex flex-col gap-3 justify-center w-[75%]">
                    <button
                        onClick={() => handleScrollToSection("presentacion")}
                        className={`rounded font-bold py-2 px-4 bg-[#EFE8D6] ${activeSection === 'presentacion' ? 'bg-[#275F08] text-white' : ''}`}
                    >
                        Presentación
                    </button>
                    <button
                        onClick={() => handleScrollToSection("identificar")}
                        className={`rounded font-bold py-2 px-4 bg-[#EFE8D6] ${activeSection === 'identificar' ? 'bg-[#275F08] text-white' : ''}`}
                    >
                        Identificar
                    </button>
                    <button
                        onClick={() => handleScrollToSection("herramientas")}
                        className={`rounded font-bold py-2 px-4 bg-[#EFE8D6] ${activeSection === 'herramientas' ? 'bg-[#275F08] text-white' : ''}`}
                    >
                        Herramientas
                    </button>
                    <button
                        onClick={() => handleScrollToSection("propuesta")}
                        className={`rounded font-bold py-2 px-4 bg-[#EFE8D6] ${activeSection === 'propuesta' ? 'bg-[#275F08] text-white' : ''}`}
                    >
                        Nuestra Propuesta
                    </button>
                    <button
                        onClick={() => handleScrollToSection("premium")}
                        className={`rounded font-bold bg-[#EFE8D6] py-2 px-4 ${activeSection === 'premium' ? 'bg-[#275F08] text-white' : ''}`}
                    >
                        Premium
                    </button>
                </div>
            </nav>

            <section id="presentacion" className={`${stylesVideoSection.contenedor} bg-black  relative`}>

                <div
                    className={`${stylesVideoSection.video}  absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ${showForm ? 'opacity-30' : 'opacity-100'}`}>
                    <video autoPlay loop muted className={`${stylesVideoSection.reproductor}`}>
                        <source src="/videolanding/landing.mp4" type="video/mp4"/>
                    </video>
                </div>

                {showForm && (

                    <div className="absolute inset-0 flex items-center justify-center z-10">

                        <section>
                            <button onClick={handleCloseFormButtonClick}
                                    className="font-bold mb-1 bg-[#EFE8D6]  py-2 px-4 rounded">
                                X
                            </button>
                            <div
                                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email"
                                                   className="">Email</label>
                                            <input type="email" name="email" id="email"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="ingrese su correo"/>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="">Contraseña</label>
                                            <input type="password" name="password" id="password"
                                                   placeholder="••••••••"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password"
                                                   className="block ">Confirmar
                                                contraseña</label>
                                            <input type="confirm-password" name="confirm-password"
                                                   id="confirm-password"
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
                                            <div className="ml-3 ">
                                                <label htmlFor="terms"
                                                       className="">Acepto <a
                                                    className=""
                                                    href="#">Terminos y condiciones</a></label>
                                            </div>
                                        </div>
                                        <button type="submit"
                                                className="bg-[#EFE8D6] py-2 px-4 text-black  font-bold rounded">Registrate
                                        </button>
                                        <p className="">
                                            ¿Ya tenes una cuenta? <a href="#"
                                                                     className="hover:underline ">Logueate</a>
                                        </p>
                                        <p>o iniciar sesión con:</p>
                                        <div>

                                            <div className="flex items-center justify-center gap-5">
                                                <p>google</p>
                                                <p>facebook</p>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>


                        </section>
                    </div>
                )}
                {!showForm && (
                    <>
                        <button onClick={handleFormButtonClick}
                                className="absolute bottom-8 right-8 bg-[#EFE8D6] py-2 px-4 text-black  font-bold rounded-lg shadow-md focus:outline-none">
                            Crear una cuenta
                        </button>

                    </>
                )}
            </section>
            <section id="identificar">
                <IdentificarImagen imagen="imagenIdentificar" pagina="/"/>
            </section>
            <main id="herramientas" className="flex justify-center items-center">
                {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                <HerramientasDeCultivo/>
            </main>
            <section id="propuesta"
                     className={`${styles.nuestraPropuesta} flex justify-center items-center flex-col md:flex-row`}>
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
            <section id="premium" className={`${stylesVideoSection.contImg} max-w-[1300px] py-[30px]`}>
                <Image src="/videolanding/recomendacion.jpeg" alt="recomendaciones" width={1500} height='1500'/>
            </section>


        </>
    )
}