"use client"
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import styles from "@/app/home.module.css";
import stylesVideoSection from "@/app/germinar/germinar.module.css";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";
import {BalooBhaina2} from "@/app/ui/fonts";

import {FaArrowDown, FaCrown} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

export default function GerminarPage() {
    const [showForm, setShowForm] = useState(false);

    const handleFormButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseFormButtonClick = () => {
        setShowForm(false);
    }


    const [activeSection, setActiveSection] = useState("")
    const [showNavbar, setShowNavbar] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null); // Añadimos el tipo HTMLVideoElement

    useEffect(() => {

        const handleScroll = () => {
            const presentacionSection = document.getElementById('presentacion');
            if (presentacionSection) {
                const rect = presentacionSection.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setShowNavbar(false);
                } else {
                    setShowNavbar(true);
                }
            }

            // Obtener el video
            const video = videoRef.current;

            // Obtener la sección actual en función del desplazamiento
            let currentSection = '';
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.1 && rect.bottom >= window.innerHeight * 0.1) {
                    currentSection = section.id
                    if (currentSection !== 'presentacion' && video) {
                            setAudioEnabled(false);


                    } else if (video) {
                            setAudioEnabled(true);



                    }

                }
            });


        };


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    }
    const [audioEnabled, setAudioEnabled] = useState(false);
    const handleToggleAudio = () => {
        setAudioEnabled(!audioEnabled);
    };

    return (
        <>
            {showNavbar && (
                <nav
                    className={`${stylesVideoSection.navLateral} select-none fixed top-0 left-0 z-50 h-full w-[332px]  flex flex-col items-start justify-center  gap-3 pl-10 `}>
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
            )}

            <section id="presentacion" className={`${stylesVideoSection.contenedor} bg-black  relative`}>

                <div
                    className={`${stylesVideoSection.video} absolute inset-0 rounded-full z-0 transition-opacity duration-500 ${showForm ? 'opacity-30' : 'opacity-100'}`}>
                    <video ref={videoRef} autoPlay={true} loop muted={!audioEnabled}
                           className={`${stylesVideoSection.reproductor}`}>
                        <source src="/videolanding/landing.mp4" type="video/mp4"/>
                    </video>
                    <div className="absolute top-2 right-2 flex">
                        <button onClick={handleToggleAudio}
                                className="text-white bg-gray-700 rounded-md px-2 py-1 mr-2">
                            {audioEnabled ? 'Desactivar audio' : 'Activar audio'}
                        </button>
                        {/* Aquí puedes agregar más botones si lo necesitas */}
                    </div>
                </div>

                {showForm && (

                    <div className="absolute inset-0 flex items-center justify-center z-10">

                        <section>
                            <div className="text-end">
                                <button onClick={handleCloseFormButtonClick}
                                        className="font-bold mb-1 bg-[#EFE8D6]  py-2 px-4 rounded">
                                    X
                                </button>
                            </div>
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
                                        <p>o inicia sesión con:</p>
                                        <div>

                                            <div className="flex items-center justify-center gap-10">
                                                <Image src="/videolanding/google.png" alt="google" width="40"
                                                       height="40"/>
                                                <Image src="/videolanding/facebook.png" alt="facebook" width="40"
                                                       height="40"/>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>


                        </section>
                    </div>
                )}
                {!showNavbar && (
                    <>
                        <div
                            className="fixed bottom-8 left-1/2 transform -translate-x-3/4 wiggle border-b-2  border-b-[#EFE8D6]">
                            <FaArrowDown
                                className="text-[#EFE8D6] text-4xl animate-bounce bg-[#275F08] rounded-full p-1"
                                onClick={() => handleScrollToSection('identificar')}/>
                        </div>
                    </>
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
            <section id="premium" className={`${styles.contenedorPropuesta}`}>
                <section
                    className={`${styles.contenedorPropuesta} grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center`}>
                    <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10`}>
                        <div className="flex-1 flex items-center justify-center">
                            <Image className={`${styles.imagenes}`} src="/calendario.jpg" alt="Ecosistema" width="200"
                                   height="200"/>
                        </div>
                        <div className="flex-1">
                            <div className={`${styles.cardsPropuesta} `}>
                                <div className="flex items-center justify-center gap-3 w-full flex-wrap flex-col">
                                    <FaCrown className={`${stylesVideoSection.icono}`}/>
                                    <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Administra
                                    tus propias notificaciones</h2>

                                </div>
                                <p>
                                    Personalizar alertas para el cuidado de tus plantas. Configura recordatorios para
                                    riego,
                                    fertilización, poda y otras tareas según tu horario. Personaliza el contenido y el
                                    método de
                                    notificación para una gestión eficiente de tus plantas</p>

                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10 `}>
                        <div className="flex-1 flex items-center justify-center">
                            <Image className={`${styles.imagenes}`} src="/seguimiento.jfif" alt="Ecosistema" width="200"
                                   height="200"/>
                        </div>
                        <div className="flex-1">
                            <div className={`${styles.cardsPropuesta}`}>
                                <div className="flex items-center justify-center gap-3 w-full flex-wrap flex-col">
                                    <FaCrown className={`${stylesVideoSection.icono}`}/>
                                    <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Haz
                                        un
                                        seguimiento de tu
                                        progreso</h2>
                                </div>
                                <p>Lleva un registro detallado de tu experiencia de cultivo con nuestra función de
                                    seguimiento.
                                    Anota cuándo plantas, riegas y cosechas, y recibe recordatorios automáticos para las
                                    tareas
                                    de cuidado de tus plantas. </p>

                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10 `}>
                        <div className="flex-1 flex items-center justify-center">
                            <Image className={`${styles.imagenes}`} src="/tutoriales.png" alt="Ecosistema" width="200"
                                   height="200"/>
                        </div>
                        <div className="flex-1">
                            <div className={`${styles.cardsPropuesta}`}>
                                <div className="flex items-center justify-center gap-3 w-full flex-wrap flex-col">
                                    <FaUser className={`${stylesVideoSection.icono}`}/>
                                <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Busca y
                                    aprende
                                    tutoriales</h2>
                                </div>
                                <p>Domina el arte de la horticultura urbana con nuestros tutoriales paso a paso. Aprende
                                    cómo
                                    cuidar de tus plantas, identificar y solucionar problemas, y maximizar tus cosechas.
                                    Los
                                    tutoriales son fáciles de seguir y adecuados para todos.</p>

                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tamanoRecomendacionCards} flex justify-center  gap-3 py-10 `}>
                        <div className={`flex-1 flex items-center justify-center`}>
                            <Image className={`${styles.imagenes}`} src="/ideal.png" alt="Ecosistema" width="200"
                                   height="200"/>
                        </div>
                        <div className="flex-1">
                            <div className={`${styles.cardsPropuesta}`}>
                                <div className="flex items-center justify-center gap-3 w-full flex-wrap flex-col">
                                    <FaCrown className={`${stylesVideoSection.icono}`}/>
                                <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Descubre
                                    Tu
                                    planta Ideal para
                                    tu jardín</h2>
                                </div>
                                <p>Encuentra las plantas perfectas para tu espacio con nuestra herramienta de
                                    recomendación
                                    personalizada. Simplemente ingresa tus preferencias y te ayudaremos a seleccionar
                                    las
                                    plantas que mejor se adapten a tu situación.</p>

                            </div>

                        </div>

                    </div>

                </section>
                <div className="flex items-center justify-center gap-2 py-5 flex-wrap">
                    <p className="font-bold">¿Queres disfrutar de estos beneficios?</p>
                    <button
                        className="bg-[#88BC43] py-2 px-4 text-white  font-bold rounded">
                        Registrarse
                    </button>
                    <p className="font-bold">o</p>
                    <button
                        className="bg-[#88BC43] py-2 px-4 text-white  font-bold rounded">
                        Iniciar sesión
                    </button>
                </div>
            </section>




        </>
    )
}