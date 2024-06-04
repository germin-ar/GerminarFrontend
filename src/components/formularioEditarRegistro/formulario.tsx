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
    alias: string;
    height: string;
    creation_date: string;
    name_garden: string;
    notes: string;
}
interface IdentificarPlanta{
    id:string
    editar:string
}
interface Garden {
    id: number;
    name: string;
}

export default function Formulario(props:IdentificarPlanta){
    const { id, editar } = props
    const [formValues, setFormValues] = useState<FormValues>({
        alias: "",
        height: "",
        creation_date: "",
        name_garden: "",
        notes: "",
    });

    const initialValues: FormValues = {
        alias: "-",
        height: "Valor pre cargado 7",
        creation_date: "Valor pre cargado 8",
        name_garden: "",
        notes: "He notado que algunas hojas inferiores de mi planta de tomate están amarillentas y marchitas.",
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

    const handleUbicacionChange = (ubicacion: string, index:any) => {
        setUbicacionSeleccionada(index);
        console.log(ubicacion, index)
        setFormValues((prevValues) => ({
            ...prevValues,
            name_garden: ubicacion,
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
                console.log("Respuesta del servidor:", response);
                //router.push(editar === "si" ? '/jardin' : `/jardin/${id}`);
            }
        } catch (err) {
            console.error(`Ocurrió un error al conectar con el servidor: ${err}`);

        }
    };
    const [ubicaciones, setUbicaciones] = useState<string[]>([]);
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
    useEffect(() => {
        setFormValues(initialValues);
        const imagenGuardada = localStorage.getItem('imagen');
        if (imagenGuardada) {
            setImagenDataUrl(imagenGuardada);
        }
        fetchUbicaciones();
    }, [id]);
    const fetchUbicaciones = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/gardens', {
                headers: {
                    'id-user': '1'
                }
            });
            const data: Garden[] = await response.json();
            setUbicaciones(data.map(garden => garden.name));
        } catch (error) {
            console.error('Error al obtener las ubicaciones:', error);
        }
    };

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
                        <h1 className={`${BalooBhaina2.className}  text-[#88BC43]`}>Registrar Planta</h1>
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
                            <div className="flex gap-2 items-center">
                                <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className} `}>Alias:</h3>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="alias"
                                    value={formValues.alias}
                                    onChange={handleInputChange}
                                    className=" pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}`}>Nombre comunes:</h3>
                            </div>
                            <div className="flex items-center">
                                <p className=" pl-9">Nombre Comun</p>
                                {/*<input
                                    type="text"
                                    name="commonName"
                                    value={formValues.commonName}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <RiPlantLine className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}  `}>Tipo:</h3>
                            </div>
                            <div className="flex items-center">
                                {/*<input
                                    type="text"
                                    name="tipo"
                                    value={formValues.tipo}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                <p className=" pl-9">Tipo</p>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <GiPlantRoots className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className} `}>Familia:</h3>
                            </div>
                            <div className="flex items-center">
                                {/*<input
                                    type="text"
                                    name="familia"
                                    value={formValues.familia}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                <p className=" pl-9">Familia</p>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <MdOutlineHealthAndSafety className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}`}>Estado
                                    de
                                    salud:</h3>
                            </div>
                            <div className="flex items-center">
                                {/*<input
                                    type="text"
                                    name="estadoSalud"
                                    value={formValues.estadoSalud}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                <p className=" pl-9">Estado de salud</p>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <IoSunnyOutline className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className} `}>Exposición
                                    solar:</h3>
                            </div>
                            <div className="flex items-center">
                                {/*<input
                                    type="text"
                                    name="exposicionSolar"
                                    value={formValues.exposicionSolar}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                <p className=" pl-9">Exposición solar</p>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}`}>Frecuencia
                                    de riego:</h3>
                            </div>

                            <div className="flex items-center">
                                {/*<input
                                    type="text"
                                    name="frecuenciaRiego"
                                    value={formValues.frecuenciaRiego}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                <p className=" pl-9">Frecuencia de riego</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.item3}`}>
                        <div>
                            <div className="flex gap-2">
                                <CiRuler className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}`}>Altura:</h3>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="altura"
                                    value={formValues.height}
                                    onChange={handleInputChange}
                                    className=" pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <CiCalendar className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className} `}>Fecha de
                                    plantación:</h3>

                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    name="fechaPlantacion"
                                    value={formValues.creation_date}
                                    onChange={handleInputChange}
                                    className="pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                            </div>



                        </div>

                    </div>
                    <div className={`${stylesDescriptionPlants.item4}`}>
                        <div>
                            <div className="flex gap-2 items-center">
                                <FiAlertCircle className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}`}>Descripción
                                    general</h3>
                            </div>
                            <div className="flex items-center">
                                {/*<textarea
                                    name="descripcionGeneral"
                                    value={formValues.descripcionGeneral}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 pr-9 w-full min-h-[150px] resize-none border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                <p className=" pl-9">Descripción general</p>
                            </div>

                        </div>
                        <div>
                            <div className="flex gap-2 mt-4 items-center">
                                <FaLocationDot className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className}`}>Ubicación</h3>
                            </div>
                            <button
                                className="flex items-center gap-2 font-bold my-3 py-2 px-4 rounded text-white bg-[#88BC43]">Crear
                                Jardín
                            </button>
                            <div className="flex flex-wrap gap-2">

                                {ubicaciones.map((ubicacion, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleUbicacionChange(ubicacion, index.toString())}
                                        className={`py-2 px-4 rounded border border-gray-300 cursor-pointer select-none ${
                                            formValues.name_garden === ubicacion ? 'bg-gray-200' : ''
                                        }`}
                                    >
                                        {ubicacion}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="m-10 flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                    <div className="flex gap-2 items-center">
                        <FaImages className={`${stylesDescriptionPlants.iconos}`}/>
                        <h3 className={`${BalooBhaina2.className} `}>Imágenes</h3>
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
                    <div className="flex gap-2 items-center">
                        <FaRegNoteSticky className={`${stylesDescriptionPlants.iconos}`}/>
                        <h3 className={`${BalooBhaina2.className}`}>Notas
                            adicionales</h3>

                    </div>
                    <div className={`${stylesDescriptionPlants.efectoHoja} overflow-hidden bg-[#EFE8D6]`}>

                        <textarea
                            name="notas"
                            value={formValues.notes}
                            onChange={handleInputChange}
                            className=" pl-9 pr-9 w-full h-full resize-none"
                        />

                    </div>
                </div>
            </section>
            <div className="m-10">

                <button
                    onClick={handleButtonClick}
                    className="flex items-center gap-2 font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43]"
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