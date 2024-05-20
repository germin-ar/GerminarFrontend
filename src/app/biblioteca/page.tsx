import stylesBiblioteca from "./biblioteca.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";

export default function BibliotecaPage() {
    return (
        <>
            <main className={`${stylesBiblioteca.contenedor}`}>
                <div className={'flex justify-start gap-20'}>
                    <aside id="default-sidebar"
                           className="text-lg top-0 left-0 z-40 w-1/4 transition-transform -translate-x-full sm:translate-x-0"
                           aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <ul className="space-y-2 font-medium ">
                                <li>
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            aria-controls="dropdown-tutorial"
                                            data-collapse-toggle="dropdown-tutorial">
                                    <span
                                        className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Hágalo usted mismo</span>

                                    </button>
                                    <ul id="dropdown-tutorial" className="hidden py-2 space-y-2">
                                        <li>
                                            <a href="#"
                                               className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Compost</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Macetas</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Dispositivo
                                                de riego</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            aria-controls="dropdown-cultivos"
                                            data-collapse-toggle="dropdown-cultivos">
                                    <span
                                        className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg font-bold">Cultivos</span>

                                    </button>
                                    <ul id="dropdown-cultivos" className="hidden py-2 space-y-2">
                                        <li>
                                            <a href="#"
                                               className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Alimentarios</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Forarjeros</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <section>
                        <div className={'my-10 flex flex-col gap-10'}>

                            <h3 className={`${BalooBhaina2.className}`}>Tutoriales</h3>

                            <div className={'flex flex-wrap gap-20'}>
                                <div>
                                    <p className={'text-center'}>Germinación de semillas de albahaca</p>
                                    <a href="">
                                        <video width="400" height="400" controls>
                                            <source src="/biblioteca/tutorial.mp4" type="video/mp4"/>
                                            Tu navegador no soporta el elemento de video.
                                        </video>
                                    </a>
                                </div>
                                <div>
                                    <p className={'text-center'}>Germinación de semillas de menta</p>
                                    <a href="">
                                        <video width="400" height="400" controls>
                                            <source src="/biblioteca/tutorial.mp4" type="video/mp4"/>
                                            Tu navegador no soporta el elemento de video.
                                        </video>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>

            </main>
        </>

    )
}