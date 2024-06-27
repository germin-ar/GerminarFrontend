"use client"
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import styles from "@/app/home.module.css";
import stylesVideoSection from "@/app/germinar/germinar.module.css";

import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";
import { BalooBhaina2 } from "@/app/ui/fonts";
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import { FaArrowDown, FaBars, FaCrown, FaTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

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
            section.scrollIntoView({ behavior: 'smooth' });
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

    const myRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    return (
        <>


            <div className={`{relative flex h-screen}`}>
                <div
                    className={`fixed left-0 top-0 h-full bg-[#EFE8D6] w-64 ${menuOpen ? '' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                    <div className="absolute bottom-1 right-1">
                        <div>
                            <div>
                                <Image src="/isotipo-fondo-claro.png" alt="isotipo" height="100" width="100" />
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
                        {menuOpen ? <FaTimes className="h-8 w-8" /> : <FaBars className="h-8 w-8" />}
                    </button>
                </div>
            </div>


            <section id="presentacion" className={`${stylesVideoSection.contenedor} bg-black relative`}>

                <div
                    className={`${stylesVideoSection.video} absolute inset-0 rounded-full z-0 transition-opacity duration-500 ${showForm ? 'opacity-30' : 'opacity-100'}`}>
                    <video ref={videoRef} autoPlay={true} loop={false} muted={!audioEnabled} onEnded={handleVideoEnded}
                        className={`${stylesVideoSection.reproductor}`}>
                        <source src="/videolanding/landing.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute top-2 right-2 flex p-2">
                        <button onClick={handleToggleAudio}
                            className="bg-[#EFE8D6] w-fit text-black font-bold p-2 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75 flex items-center gap-2">
                            {audioEnabled ? <FaVolumeUp className="w-8 h-8" /> :
                                <FaVolumeMute className="w-8 h-8" />}

                        </button>
                    </div>
                </div>

                {showForm && (

                    <div className="fixed inset-0 flex items-center justify-center z-10">

                        <section>
                            <div
                                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                                <div className="text-end">
                                    <button onClick={handleCloseFormButtonClick}
                                        className="absolute top-2 right-2 bg-[#EFE8D6] mb-2 w-fit text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75">
                                        ✕
                                    </button>
                                </div>
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email"
                                                className="">Email</label>
                                            <input type="email" name="email" id="email"
                                                className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                                placeholder="Ingresá un correo" />
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                className="">Contraseña</label>
                                            <input type="password" name="password" id="password"
                                                placeholder="••••••••"
                                                className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password"
                                                className="block ">Confirmar
                                                contraseña</label>
                                            <input type="password" name="confirm-password"
                                                id="confirm-password"
                                                placeholder="••••••••"
                                                className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                            />
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox"
                                                    className="w-4 h-4"
                                                />
                                            </div>
                                            <div className="ml-3 ">
                                                <label htmlFor="terms"
                                                    className="">Acepto <a
                                                        className="hover:underline"
                                                        href="#">Términos y condiciones</a></label>
                                            </div>
                                        </div>
                                        <button type="submit"
                                            className="bg-[#EFE8D6] mt-2 w-fit text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75">Registrarse
                                        </button>
                                        <p className="">
                                            ¿Ya tenés una cuenta? <Link href={"/login"}
                                                className="hover:underline ">Logueate</Link>
                                            o inicia sesión con:</p>
                                        <div>

                                            <div className="flex items-center justify-center gap-10">
                                                <Image src="/videolanding/google.png" alt="google" width="40"
                                                    height="40" />
                                                <Image src="/videolanding/facebook.png" alt="facebook" width="40"
                                                    height="40" />
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
                                className="text-[#EFE8D6] text-4xl animate-bounce bg-[#275F08] rounded-full p-1 cursor-pointer"
                                onClick={() => handleScrollToSection('identificar')} />
                        </div>
                    </>
                )}
                {!showForm && (
                    <>

                        <button onClick={handleFormButtonClick}
                            className="absolute bottom-8 right-8 bg-[#EFE8D6] w-fit text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75 shadow-md focus:outline-none">
                            Crear una cuenta
                        </button>

                    </>
                )}
            </section>
            <section id="identificar">
                <IdentificarImagen imagen="imagenIdentificar" pagina="/" />
            </section>
            <main id="herramientas" className="flex justify-center items-center">
                {/*<img src="/trastornos-y-enfermedades-tomate-scaled.webp" alt="tomate" width="1000"/>*/}
                <HerramientasDeCultivo targetRef={myRef} />
            </main>

            <section id="propuesta">
                <div className="flex flex-col md:flex-row items-center px-6 md:p-6 mb-4">
                    <div className="md:w-1/2 md:px-20">
                        <h2 className={`${styles.tituloSecundario} ${BalooBhaina2.className} mb-0 md:mb-4`}>Nuestra propuesta</h2>
                        <p className="leading-relaxed">
                            ¿Soñás con alimentos frescos directamente de tu casa? Nuestra aplicación transforma cada
                            rincón de tu hogar en un jardín próspero. Olvidate de las limitaciones de espacio y la falta
                            de experiencia. Te guiaremos paso a paso para cultivar con éxito en balcones, terrazas y
                            hasta interiores.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:pl-8 mb-4 md:mb-0">
                        <div className="max-w-full">
                            <Image
                                className={`rounded-lg shadow-md w-[500px]`}
                                src="/ecosistema.jpeg"
                                alt="Ecosistema"
                                width="1700"
                                height="1134"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="premium"
                className={`bg-[#EFE8D6] grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6 justify-center px-10`}>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/calendario.jpg" alt="Calendario" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Administrá tus notificaciones</h3>
                            <FaCrown size={60} className="absolute top-0 right-5" />
                            <p className={"w-full"}>
                                Personalizá alertas para cuidar tus plantas. Configurá recordatorios para riego, fertilización, poda y más según tu horario y preferencias.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/seguimiento.jpeg" alt="Progreso" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Llevá un control de tu progreso</h3>
                            <FaCrown size={60} className="absolute top-0 right-5" />
                            <p className={"w-full"}>
                                Registrá tu experiencia de cultivo con nuestra función de seguimiento. Anotá plantaciones, riegos y cosechas con recordatorios automáticos.</p>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/tutoriales.jpeg" alt="Tutorial" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>

                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Buscá y aprendé de tutoriales</h3>
                            <FaUser size={60} className="absolute top-0 right-5" />

                            <p className={"w-full"}>
                                Aprendé con nuestros tutoriales paso a paso. Cuidá tus plantas, resolvé problemas y maximizá tus cosechas de manera fácil y accesible.</p>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse sm:flex-row items-center flex justify-center gap-3 py-10`}>
                    <div>
                        <Image className="rounded-tr-[50px] rounded-bl-[50px] w-64 h-64"
                            src="/ideal.jpeg" alt="Jardín" width="816" height="816" />
                    </div>
                    <div className="flex-1 flex items-center">
                        <div className={"relative flex flex-col gap-5"}>
                            <h3 className={`${BalooBhaina2.className} text-2xl sm:text-3xl w-4/5 md:w-4/5 text-wrap`}>Descubrí la planta ideal para tu jardín</h3>
                            <FaCrown size={60} className="absolute top-0 right-5" />
                            <p className={"w-full"}>
                                Encontrá plantas perfectas para tu espacio con nuestra herramienta de recomendación personalizada.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-center gap-2 py-5 flex-wrap bg-[#EFE8D6] shadow-lg mb-10">
                <p className="font-bold">¿Querés disfrutar de estos beneficios?</p>
                <div className="flex gap-3 items-center">
                    <button onClick={handleFormButtonClick}
                        className="bg-[#88BC43] mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75">
                        Registrarme
                    </button>
                    <p className="font-bold">o</p>
                    <Link href={"/login"}
                        className="bg-[#88BC43] mt-2 w-fit text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </>
    )
}
