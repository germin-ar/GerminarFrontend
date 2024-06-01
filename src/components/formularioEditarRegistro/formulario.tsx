"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import stylesDescriptionPlants from './descripcion.module.css';

import {LuPencilLine} from "react-icons/lu";
import Image from "next/image";
import {FaImages, FaRegIdCard} from "react-icons/fa";
import {RiPlantLine} from "react-icons/ri";
import {GiPlantRoots} from "react-icons/gi";
import {MdOutlineHealthAndSafety, MdOutlineWaterDrop} from "react-icons/md";
import {IoSunnyOutline} from "react-icons/io5";
import {CiCalendar, CiRuler} from "react-icons/ci";
import {FiAlertCircle} from "react-icons/fi";
import {FaLocationDot, FaRegNoteSticky} from "react-icons/fa6";
import {BalooBhaina2} from "../../app/ui/fonts";

export async function generateStaticParams() {
    return [{id: '1'}]
}
interface FormValues {
    nombre: string;
    tipo: string;
    familia: string;
    estadoSalud: string;
    exposicionSolar: string;
    frecuenciaRiego: string;
    altura: string;
    fechaPlantacion: string;
    descripcion: string;
    ubicacion: string;
    descripcionGeneral: string;
    notas: string;
}
interface IdentificarPlanta{
    id:string
    editar:string
}

export default function Formulario(props:IdentificarPlanta){
    const { id, editar } = props
    const [formValues, setFormValues] = useState<FormValues>({
        nombre: "",
        tipo: "",
        familia: "",
        estadoSalud: "",
        exposicionSolar: "",
        frecuenciaRiego: "",
        altura: "",
        fechaPlantacion: "",
        descripcion: "",
        ubicacion: "",
        descripcionGeneral: "",
        notas: "",
    });

    const initialValues: FormValues = {
        nombre: "Valor pre cargado 1",
        tipo: "Valor pre cargado 2",
        familia: "Valor pre cargado 3",
        estadoSalud: "Valor pre cargado 4",
        exposicionSolar: "Valor pre cargado 5",
        frecuenciaRiego: "Valor pre cargado 6",
        altura: "Valor pre cargado 7",
        fechaPlantacion: "Valor pre cargado 8",
        descripcion: "Valor pre cargado 9",
        ubicacion: "Valor pre cargado 10",
        descripcionGeneral: "Es esbelta y robusta, con tallos de color verde oscuro que se extienden hacia arriba en busca de luz solar. Sus hojas son grandes y frondosas, de un verde vibrante, con una textura ligeramente áspera al tacto. En la parte superior delos tallos, se forman racimos de flores amarillas que eventualmente darán paso a los deliciosos frutos rojos",
        notas: "He notado que algunas hojas inferiores de mi planta de tomate están amarillentas y marchitas.",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    };
    const handleConfirmChanges = () => {
        setShowPopup(false);

        console.log("Datos del formulario a enviar:", formValues);

        submitForm();
    };

    const handleUbicacionChange = (ubicacion: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            ubicacion: ubicacion,
        }));

    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const hasChanges = Object.keys(formValues).some(
            (key) => formValues[key as keyof FormValues] !== initialValues[key as keyof FormValues]
        );

        if (hasChanges) {
            setShowPopup(true);
            console.log(hasChanges)
        } else {

            //alert("No se realizaron cambios. handle submit");
        }
    };
    const router = useRouter()

    const submitForm = async () => {
        /*console.log("Formulario enviado");
        if (editar === "si"){
        router.push(`/jardin`)
        }
        if (editar === "no"){
            router.push(`/jardin/${id}`)
        }*/
        try {
            const response = await fetch('http://localhost:8080/api/v1/garden/addPlant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (response.ok) {
                router.push(editar === "si" ? '/jardin' : `/jardin/${id}`);
            }
        } catch (err) {
            alert(`Ocurrió un error al conectar con el servidor: ${err}`);
        }
    };

    useEffect(() => {
        setFormValues(initialValues);
        const imagenGuardada = localStorage.getItem('imagen');
        if (imagenGuardada) {
            setImagenDataUrl(imagenGuardada);
        }
    }, [id]);

    const [showPopup, setShowPopup] = useState(false);
    const handleButtonClick = () => {
        // Verifica si hay cambios en el formulario
        const hasChanges = Object.keys(formValues).some(
            (key) => formValues[key as keyof FormValues] !== initialValues[key as keyof FormValues]
        );

        if (hasChanges) {
            setShowPopup(true); // Muestra el popup para confirmar los cambios
        } else {
            // Si no hay cambios, muestra un mensaje indicando que no se realizaron cambios
            alert("No se realizaron cambios.");
        }
    };

    const [imagenDataUrl, setImagenDataUrl] = useState<string>('');

    return (
        <form className={`${stylesDescriptionPlants.contenedor}`} onSubmit={handleSubmit}>
            <section className="m-10">
                <div className="flex justify-between flex-col md:flex-row md:gap-3">
                    <div className="flex-1">
                        <h1 className={`${BalooBhaina2.className} text-[50px] text-[#88BC43]`}>Registrar Planta</h1>
                    </div>
                    <div className="flex-1 flex justify-end items-center gap-3 ">
                        <button
                            onClick={handleButtonClick}
                            className="flex items-center gap-2 font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]"
                        >
                            <LuPencilLine className="w-[15px] h-[15px] "/>
                            Guardar
                        </button>

                    </div>
                </div>
                <div className={`${stylesDescriptionPlants.planta} mt-4`}>
                    <div className={`${stylesDescriptionPlants.item1}`}>
                        <div className="h-[500px] overflow-hidden flex items-center justify-center">
                            <img src={imagenDataUrl} className="object-cover max-w-full max-h-full"
                                 alt="imagen" width="500"
                                 height="500"/>
                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.item2}`}>
                        <div>
                            <div className="flex gap-2">
                                <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Nombre:</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formValues.nombre}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <RiPlantLine className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Tipo:</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="tipo"
                                    value={formValues.tipo}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <GiPlantRoots className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Familia:</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="familia"
                                    value={formValues.familia}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <MdOutlineHealthAndSafety className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Estado
                                    de
                                    salud:</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="estadoSalud"
                                    value={formValues.estadoSalud}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <IoSunnyOutline className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Exposición
                                    solar:</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="exposicionSolar"
                                    value={formValues.exposicionSolar}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2">
                                <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Frecuencia
                                    de riego:</p>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="frecuenciaRiego"
                                    value={formValues.frecuenciaRiego}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>
                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.item3}`}>
                        <div>
                            <div className="flex gap-2">
                                <CiRuler className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Altura:</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="altura"
                                    value={formValues.altura}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <CiCalendar className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Fecha de
                                    plantación:</p>

                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="fechaPlantacion"
                                    value={formValues.fechaPlantacion}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>



                        </div>

                    </div>
                    <div className={`${stylesDescriptionPlants.item4}`}>
                        <div>
                            <div className="flex gap-2">
                                <FiAlertCircle className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Descripción
                                    general</p>
                            </div>
                            <div className="flex items-center">
                                <textarea
                                    name="descripcionGeneral"
                                    value={formValues.descripcionGeneral}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 pr-9 w-full min-h-[150px] resize-none border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 mt-4">
                                <FaLocationDot className={`${stylesDescriptionPlants.iconos}`}/>
                                <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Ubicación</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div
                                    onClick={() => handleUbicacionChange("baño")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "baño" ? "bg-gray-200" : ""}`}
                                >
                                    Baño
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("patio trasero")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "patio trasero" ? "bg-gray-200" : ""}`}
                                >
                                    Patio Trasero
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("porche")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "porche" ? "bg-gray-200" : ""}`}
                                >
                                    Porche
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("oficina")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "oficina" ? "bg-gray-200" : ""}`}
                                >
                                    Oficina
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("cocina")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "cocina" ? "bg-gray-200" : ""}`}
                                >
                                    Cocina
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("balcon")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "balcon" ? "bg-gray-200" : ""}`}
                                >
                                    Balcón
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("terraza")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "terraza" ? "bg-gray-200" : ""}`}
                                >
                                    Terraza
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("escritorio")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "escritorio" ? "bg-gray-200" : ""}`}
                                >
                                    Escritorio
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("pasillo")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "pasillo" ? "bg-gray-200" : ""}`}
                                >
                                    Pasillo
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("ventana")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "ventana" ? "bg-gray-200" : ""}`}
                                >
                                    Ventana
                                </div>
                                <div
                                    onClick={() => handleUbicacionChange("otro")}
                                    className={`text-[24px] py-2 px-4 rounded border border-gray-300 cursor-pointer ${formValues.ubicacion === "otro" ? "bg-gray-200" : ""}`}
                                >
                                    Otro
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="m-10 flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                    <div className="flex gap-2">
                        <FaImages className={`${stylesDescriptionPlants.iconos}`}/>
                        <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Imágenes</p>
                    </div>
                    <div className={`${stylesDescriptionPlants.item1}`}>
                        <div className="h-[500px] overflow-hidden flex items-center justify-center">
                            <img src={imagenDataUrl} className="object-cover max-w-full max-h-full"
                                 alt="Albahaca-sana" width="500"
                                 height="500"/>
                        </div>

                    </div>
                    <button className="font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]">Subir más imágenes
                    </button>
                </div>
                <div className="flex-1 flex gap-2 flex-col">
                    <div className="flex gap-2">
                        <FaRegNoteSticky className={`${stylesDescriptionPlants.iconos}`}/>
                        <p className={`${BalooBhaina2.className} font-bold text-[25px] text-[#1F2325]`}>Notas
                            adicionales</p>

                    </div>
                    <div className={`${stylesDescriptionPlants.efectoHoja} overflow-hidden bg-[#EFE8D6]`}>

                        <textarea
                            name="notas"
                            value={formValues.notas}
                            onChange={handleInputChange}
                            className="text-[24px] pl-9 pr-9 w-full h-full resize-none"
                        />

                    </div>
                </div>
            </section>
            <div className="m-10">

                <button
                    onClick={handleButtonClick}
                    className="flex items-center gap-2 font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]"
                >
                    <LuPencilLine className="w-[15px] h-[15px] "/>
                    Guardar
                </button>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Cambios realizados</h2>
                        <ul>
                            {Object.entries(formValues).map(([key, value]) => {
                                if (value !== initialValues[key as keyof FormValues]) {
                                    return (
                                        <li key={key} className="mb-2">
                                            <span className="font-semibold">{key}:</span> {value}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            onClick={handleConfirmChanges}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}