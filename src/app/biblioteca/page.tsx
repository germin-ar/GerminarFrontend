import stylesBiblioteca from "./biblioteca.module.css";
import {BalooBhaina2} from "@/app/ui/fonts";

export default function BibliotecaPage() {
    return (
        <>
            <div className={'flex justify-start gap-32'}>
                <aside id="default-sidebar"
                       className="text-lg top-0 left-0 z-40 w-80180 transition-transform -translate-x-full sm:translate-x-0"
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
                    <div className={'my-10 flex flex-col gap-5'}>

                        <h3 className={`${BalooBhaina2.className}`}>Los tutoriales más visitados</h3>

                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-y-10'}>
                            <div className={"flex flex-col gap-1"}>
                                <p title={"Germinar tomates en 5 días en casa | Sembrar, plantar y cultivar tomates"}
                                   className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                    Germinar tomates en 5 días en casa | Sembrar, plantar y cultivar tomates</p>
                                <div>
                                    <iframe width="420" height="235"
                                            src="https://www.youtube.com/embed/hLmOfHPRtfQ?si=QCAPwC4A4UnwHePk"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <p title={"Como SEMBRAR LECHUGAS como un EXPERTO: Lechugas perfectas desde el SEMILLERO"}
                                       className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                        Como SEMBRAR LECHUGAS como un EXPERTO: Lechugas perfectas desde el SEMILLERO
                                    </p>
                                </div>
                                <div>
                                    <iframe
                                        width="420"
                                        height="235"
                                        src="https://www.youtube.com/embed/vuYW_OYvMQM?si=gzBM6N_026w6NVbK"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            <div className={"flex flex-col gap-1"}>
                                <p title={"GERMINAR PEPINOS en 48 HORAS"}
                                   className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                    GERMINAR PEPINOS en 48 HORAS
                                </p>
                                <div>
                                    <iframe width="420" height="235"
                                            src="https://www.youtube.com/embed/kgVvbAjyKOk?si=3Dz7jnvSEmD2Drgu"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                </div>
                            </div>

                            <div className={"flex flex-col gap-1"}>
                                <p title={"RÚCULA en MACETA"}
                                   className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                    RÚCULA en MACETA</p>
                                <div>
                                    <iframe width="420" height="235"
                                            src="https://www.youtube.com/embed/KvbzErzd4Do?si=APY-0qQ-ouMW5gV3"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                </div>
                            </div>

                            <div className={"flex flex-col gap-1"}>
                                <p title={"Semillero de PUERROS"}
                                   className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                    Semillero de PUERROS</p>
                                <div>
                                    <iframe width="420" height="235"
                                            src="https://www.youtube.com/embed/A-c80tWCBGI?si=GoUz7JpWyHg1DKkZ"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                </div>
                            </div>

                            <div className={"flex flex-col gap-1"}>
                                <p title={"Semillero de PIMIENTOS"}
                                   className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                    Semillero de PIMIENTOS</p>
                                <div>
                                    <iframe width="420" height="235"
                                            src="https://www.youtube.com/embed/p0LlR55eu14?si=WHtYMejGYzlu4NUI"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                </div>
                            </div>

                            <div className={"flex flex-col gap-1"}>
                                <p title={"Cómo GERMINAR semillas de MANAZANA"}
                                   className={`${stylesBiblioteca.widthText} ${stylesBiblioteca.truncateHeight} text-[20px] px-1 rounded text-[#1F2325] font-bold cursor-pointer text-wrap truncate line-clamp-2`}>
                                    Cómo GERMINAR semillas de MANAZANA</p>
                                <div>
                                    <iframe width="420" height="235"
                                            src="https://www.youtube.com/embed/5eScM-CldXE?si=sdx72HskERjYbUoJ"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}