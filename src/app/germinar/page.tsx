"use client"
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import styles from "@/app/home.module.css";
import stylesVideoSection from "@/app/germinar/germinar.module.css";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";
import {BalooBhaina2} from "@/app/ui/fonts";
import {FaVolumeUp, FaVolumeMute} from 'react-icons/fa';

import {FaArrowDown, FaBars, FaCrown, FaTimes} from "react-icons/fa";
import {FaUser} from "react-icons/fa";
import {Simulate} from "react-dom/test-utils";

export default function GerminarPage() {
    const [showForm, setShowForm] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const handleFormButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseFormButtonClick = () => {
        setShowForm(false);
        // Reiniciar el video si ha terminado
        if (videoEnded && videoRef.current) {
            videoRef.current.currentTime = 0; // Reiniciar el tiempo del video
            videoRef.current.play(); // Reproducir el video
            setVideoEnded(false); // Restablecer el estado de video terminado
        }
    };


    const [activeSection, setActiveSection] = useState("")
    const [showNavbar, setShowNavbar] = useState(false);
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
                    }
                    console.log(currentSection)
                }
            });


        }


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({behavior: 'smooth'});
            setActiveSection(sectionId);
        }
    }

    const handleVideoEnded = () => {
        setVideoEnded(true);
        handleFormButtonClick();
    };

    const [audioEnabled, setAudioEnabled] = useState(false);
    const handleToggleAudio = () => {
        setAudioEnabled(!audioEnabled);
    };
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>


            <div className={`{relative flex h-screen}`}>
                <div
                    className={`fixed left-0 top-0 h-full bg-[#EFE8D6] w-64 ${menuOpen ? '' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                    <div className="absolute bottom-1 right-1">
                        <div>
                            <div>
                                <Image src="/isotipo-fondo-claro.png" alt="isotipo" height="100" width="100"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-full">


                        <ul className=" flex flex-col gap-3 ">

                            <li>
                                <button
                                    onClick={() => handleScrollToSection("presentacion")}
                                    className={`rounded font-bold py-2 px-4   ${activeSection === 'presentacion' ? ' bg-[#275F08] text-white' : ''}`}
                                >
                                    Presentación
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollToSection("identificar")}
                                    className={`rounded font-bold py-2 px-4  ${activeSection === 'identificar' ? ' bg-[#275F08] text-white' : ''}`}
                                >Identificación
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollToSection("herramientas")}
                                    className={`rounded font-bold py-2 px-4   ${activeSection === 'herramientas' ? ' bg-[#275F08] text-white' : ''}`}
                                >
                                    Herramientas
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollToSection("propuesta")}
                                    className={`rounded font-bold py-2 px-4    ${activeSection === 'propuesta' ? 'bg-[#275F08] text-white' : ''}`}
                                >
                                    Nuestra Propuesta
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollToSection("premium")}
                                    className={`rounded font-bold   py-2 px-4 ${activeSection === 'premium' ? ' bg-[#275F08] text-white' : ''}`}
                                >
                                    Premium
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="flex-grow">
                    <div className="relative z-40"></div>
                    <button onClick={handleToggleMenu}
                            className="fixed top-4 left-4 z-50 block text-white focus:outline-none bg-[#275F08] rounded-full p-2">
                        {menuOpen ? <FaTimes className="h-8 w-8"/> : <FaBars className="h-8 w-8"/>}
                    </button>
                </div>
            </div>


            <section id="presentacion" className={`${stylesVideoSection.contenedor} bg-black  relative`}>

                <div
                    className={`${stylesVideoSection.video} absolute inset-0 rounded-full z-0 transition-opacity duration-500 ${showForm ? 'opacity-30' : 'opacity-100'}`}>
                    <video ref={videoRef} autoPlay={true} loop={false} muted={!audioEnabled} onEnded={handleVideoEnded}
                           className={`${stylesVideoSection.reproductor}`}>
                        <source src="/videolanding/landing.mp4" type="video/mp4"/>
                    </video>
                    <div className="absolute top-2 right-2 flex p-2">
                        <button onClick={handleToggleAudio}
                                className="rounded font-bold p-2 text-black bg-[#EFE8D6] flex items-center gap-2">
                            {audioEnabled ? <FaVolumeUp className="w-8 h-8"/> :
                                <FaVolumeMute className="w-8 h-8"/>}

                        </button>
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
                                    <h2 className={`${BalooBhaina2.className} ${styles.tituloCardsRecomendacion}`}>Busca
                                        y
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
