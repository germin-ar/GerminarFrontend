"use client"
import stylesJardin from "@/app/jardin/jardin.module.css"
import {BalooBhaina2} from "@/app/ui/fonts";
import {CiCalendar} from "react-icons/ci";
import {IoAdd} from "react-icons/io5";
import {useState} from "react";

export default function JardinPage() {
    const data = [
        {
            categoria: 'Balcon',
            plantas: [
                { nombre: 'Tomate' },
                { nombre: 'Pimiento' },
                { nombre: 'Albahaca' }
            ]
        },
        {
            categoria: 'Jardín',
            plantas: [
                { nombre: 'Rosa' },
                { nombre: 'Lirio' },
                { nombre: 'Girasol' }
            ]
        }
    ];

    const [filtro, setFiltro] = useState('');

    const handleFiltroChange = (e:any) => {
        setFiltro(e.target.value);
    };

    const filteredData = data.filter((categoria) => {
        const categoriaIncluida = categoria.categoria.toLowerCase().includes(filtro.toLowerCase());
        const plantasFiltradas = categoria.plantas.filter((planta) => planta.nombre.toLowerCase().includes(filtro.toLowerCase()));
        return categoriaIncluida || plantasFiltradas.length > 0;
    });



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
                            value={filtro}
                            onChange={handleFiltroChange}
                            className="px-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </section>
            <main className={`${stylesJardin.contenedorPlantas}`}>
                <div className="flex h-screen">
                    <div className="bg-gray-800 w-72 flex-shrink-0">
                        {/* Contenido para la barra lateral, si es necesario */}
                    </div>
                    <div className="flex-1 bg-gray-200 flex gap-5 flex-col pl-10 pt-10">
                        {filteredData.map((categoria, index) => (
                            <div className="flex flex-col flex-wrap gap-5" key={index}>
                                <h3 className={`${stylesJardin.tituloContenedor} ${BalooBhaina2.className}`}>{categoria.categoria}</h3>
                                <ul className={`flex gap-10`}>
                                    {categoria.plantas.map((planta, idx) => (
                                        <li className={`${stylesJardin.plantasJardin}`} key={idx}>{planta.nombre}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}