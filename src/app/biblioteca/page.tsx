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
                                        <svg className="w-3 h-3" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2" d="m1 1 4 4 4-4"/>
                                        </svg>
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
                                        <svg className="w-3 h-3" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2" d="m1 1 4 4 4-4"/>
                                        </svg>
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

                            <h2 className={`${BalooBhaina2.className} uppercase text-green-800 text-3xl`}>Tutoriales</h2>

                            <div className={'flex flex-wrap gap-20'}>
                                <div>
                                    <p className={'text-center text-lg'}>Germinación de semillas de albahaca</p>
                                    <a href="">
                                        <video width="400" height="400" controls>
                                            <source src="/biblioteca/tutorial.mp4" type="video/mp4"/>
                                            Tu navegador no soporta el elemento de video.
                                        </video>
                                    </a>
                                </div>
                                <div>
                                    <p className={'text-center text-lg'}>Germinación de semillas de menta</p>
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