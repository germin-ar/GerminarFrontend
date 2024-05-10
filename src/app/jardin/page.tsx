import stylesJardin from "@/app/jardin/jardin.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import {CiCalendar} from "react-icons/ci";
import {IoAdd} from "react-icons/io5";

export default function JardinPage() {
    const data = [
        { nombre: 'Planta 1', ubicacion: 'Jardín' },
        { nombre: 'Planta 2', ubicacion: 'Terraza' }
    ];


    return (
        <>
        <section className={`${stylesJardin.contenedor}`}>
            <h2 className={`${BalooBhaina2.className} ${stylesJardin.titulo}`}>Mi Jardín</h2>
            <div className="flex justify-center items-center gap-28">
                <div className="flex-1 flex justify-center items-center  gap-5">
                    <div
                        className={`${stylesJardin.botones} flex justify-center items-center text-white font-bold py-2 px-4 rounded gap-2`}>
                        <CiCalendar className={`${stylesJardin.iconos}`}/>
                        <p>Calendario</p>
                    </div>
                    <div
                        className={`${stylesJardin.botones} flex justify-center items-center text-white font-bold py-2 px-4 rounded gap-2`}>
                        <IoAdd className={`${stylesJardin.iconos}`}/>
                        <p>Añadir nueva planta</p>
                    </div>
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
        </section>
            <main className={`${stylesJardin.contenedorPlantas}`}>
                <div className="flex h-screen">
                    <div className="bg-gray-800 w-72 flex-shrink-0">

                    </div>
                    <div className="flex-1 bg-gray-200">

                    </div>
                </div>
            </main>
        </>
    )
}