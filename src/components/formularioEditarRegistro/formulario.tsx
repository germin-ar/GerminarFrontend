"use client"
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import stylesDescriptionPlants from './descripcion.module.css';

import {FaHeart} from 'react-icons/fa';
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
import Loading from "@/app/resultado/[id]/loading";
import Link from "next/link";


export async function generateStaticParams() {
    return [{id: '1'}]
}

interface FormValues {
    alias: string;
    height: number;
    planting_date: Date;
    id_garden: number | null;
    is_favorite: boolean;
    image_url: string;
}

interface FormValuesEdit {
    alias: string;
    height: number;
    //planting_date: Date;
    id_garden: number | null;
    is_favorite: boolean;
    image_url: string;
}

interface PlantData {
    id: string;
    language: string;
    candidates: Candidate[];
    image: Image;
}

interface Candidate {
    score: number;
    specie: Species;
    plant_data: PlantDataDetail;
}

interface Species {
    scientific_name: string;
    genus_name: string;
    family_name: string;
    common_names: string[];
}

interface PlantDataDetail {
    id: number;
    description: string;
    height: number;
    fertilizer: string;
    watering: string;
    soil: string;
    sun_exposure: string | null;
    insecticide: string;
    temperature_max: number | null;
    temperature_min: number | null;
    tips: string;
    harvest_time: string;
    growth_season: string;
    planting_time: string;
    pruning: string;
}

interface Image {
    uuid: string;
    url: string;
}


interface PlantEdit {
    id: number;
    alias: string;
    creation_date: string | null;
    modification_date: string;
    planting_date: string;
    description: string | null;
    favorite: boolean | null;
    height: number;
    sun_exposure: string | null;
    notes: string | null;
    name_garden: string | null;
    expo: string | null;
    id_garden: number;
    plant_catalog_family_name: string;
    plant_catalog_genus: string;
    plant_catalog_watering_frecuency: string;
    plant_catalog_description: string;
    plant_catalog_common_name: string;
    plant_catalog_scientific_name: string;
    plant_catalog_sun_exposure: string;
    images: {
        url: string;
    }[];
}

interface IdentificarPlanta {
    id: string
    editar: string
}

interface Garden {
    id: number;
    name: string;
}

interface PlantResponse {
    id: number;
}

interface PlantData {
    scientificName: string;
    genusName: string;
    familyName: string;
    score: number;
    commonNames: string[];
}

const BASE_URL = process.env.API_BASE_URL;

export default function Formulario(props: IdentificarPlanta) {
    const {id, editar} = props
    const router = useRouter();

    const [plantData, setPlantData] = useState<PlantData | null>(null);
    const [plantEdit, setPlantEdit] = useState<PlantEdit | null>(null);
    const [datosPlanta, setDatosPlanta] = useState<PlantData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ubicaciones, setUbicaciones] = useState<{ id: number; name: string; }[]>([]);


    const [formValues, setFormValues] = useState<FormValues>({
        alias: "",
        height: 0,
        planting_date: new Date('2024-06-12'),
        id_garden: null,
        is_favorite: true,
        image_url: ""
    });


    //edit
    const [formValuesEdit, setFormValuesEdit] = useState<FormValuesEdit>({
        alias: "",
        height: 0,
        //planting_date: new Date('2024-06-12'),
        id_garden: null,
        is_favorite: false,
        image_url: ""
    });

    const [relleno, setRelleno] = useState(false);

    const handleClick = () => {
        setFormValuesEdit(prevValues => ({
            ...prevValues,
            is_favorite: !prevValues.is_favorite
        }));
        console.log(formValuesEdit.is_favorite)
        setRelleno(!relleno);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        let newValue: string | number | boolean | Date = value;

        // Check if the input type is 'date' and convert the value to a Date object
        if (type === 'date') {
            newValue = new Date(value);
        } else if (type === 'checkbox') {
            newValue = (e.target as HTMLInputElement).checked;
        }
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    };


    const handleInputChangeEdit = (e: any) => {
        const {name, value, type} = e.target;
        let newValueEdit: string | number | boolean = value;
        if (type === 'checkbox') {
            newValueEdit = (e.target as HTMLInputElement).checked;
        }
        if (name === 'hearth') {
            newValueEdit = !formValuesEdit.is_favorite;
        }
        if (name === 'alias') {
            newValueEdit = value;
        }
        if (name === 'height') {
            newValueEdit = value
        }

        setFormValuesEdit((prevValues) => ({
            ...prevValues,
            [name]: newValueEdit
        }));
    };


    const handleUbicacionChange = (index: any) => {
        console.log(index)
        setFormValues((prevValues) => ({
            ...prevValues,
            id_garden: index,
        }));
    };

    const handleUbicacionChangeEdit = (index: any) => {
        console.log(index)
        setFormValuesEdit((prevValues) => ({
            ...prevValues,
            id_garden: index,
        }));

    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        submitForm()
    };


    const submitForm = async () => {
        if (editar === "si") {
            try {
                /*const updatedFormValuesEdit = {
                ...formValuesEdit,
                        image_url: plantEdit?.images[0].url,
                };*/
                const response = await fetch(`${BASE_URL}/plants/${plantEdit?.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'id-user': '1'
                    },
                    body: JSON.stringify(formValuesEdit)
                });
                if (!response.ok) {
                    console.log(formValuesEdit);
                    throw new Error('Failed to update plant');

                }

                console.log(formValuesEdit);
                router.push(`/jardin`);
            } catch (error) {
                console.error('Error updating plant:', error);
            }
        }
        if (editar === "no") {

            try {
                const updatedFormValues = {
                    ...formValues,
                    image_url: plantData?.image.url,
                    id_plant_catalog: plantData?.candidates[0].plant_data.id
                };
                const response = await fetch(`${BASE_URL}/plants`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'id-user': "1"
                    },
                    body: JSON.stringify(updatedFormValues),

                });
                if (response.ok) {
                    const responseData: PlantResponse = await response.json();
                    console.log("Respuesta del servidor:", responseData);
                    router.push(`/jardin/${responseData}`)
                } else {
                    console.log(JSON.stringify(updatedFormValues))
                }
            } catch (err) {
                console.error(`Ocurrió un error al conectar con el servidor: ${err}`);

            }
        }


    };


    useEffect(() => {
        if (editar === "no") {
            fetch(`${BASE_URL}/candidates/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: PlantData) => {
                    setPlantData(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });

        } else if (editar === "si") {
            const fetchPlantData = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/plants/${id}`, {
                        headers: {
                            'id-user': '1'
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch plant data');
                    }
                    const plant = await response.json();
                    setPlantEdit(plant);
                    setRelleno(plant.favorite)
                    console.log(plant)
                } catch (error) {
                    console.error('Error fetching plant data:', error);
                }
            };

            if (id) {
                fetchPlantData();
                setLoading(false);
            }
        }


        fetchUbicaciones();
        console.log(ubicaciones);
    }, [id]);
    const fetchUbicaciones = async () => {
        try {
            const response = await fetch(`${BASE_URL}/gardens`, {
                headers: {
                    'id-user': '1'
                }
            });
            const data: Garden[] = await response.json();
            console.log(data)
            setUbicaciones(data.map(garden => ({id: garden.id, name: garden.name})));
        } catch (error) {
            console.error('Error al obtener las ubicaciones:', error);
        }
    };
    const [gardenName, setGardenName] = useState('');
    const handleInputChangeGardenName = (event: any) => {
        setGardenName(event.target.value);
    };
    const handleSubmitGarden = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/gardens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: '1',
                    name: gardenName,
                }),
            });

            if (response.ok) {
                alert('Jardín creado exitosamente');
                closePopup();
                await fetchUbicaciones()
            } else {
                console.error('Error al crear el jardín');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    }


    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div className="flex items-center justify-center flex-col">
            <h1 className="text-center">Algo ha salido mal. Vuelve a identificar la imagen.</h1>
            <Link href="/" className="bg-[#88BC43] text-white py-2 px-4 rounded">Volver a identificar</Link>
        </div>;
    }
    return (
        <>
            <form className={`${stylesDescriptionPlants.contenedor}`} onSubmit={handleSubmit}>
                <section className="m-10">
                    <div className="flex justify-between flex-col md:flex-row md:gap-3">
                        <h1 className={`${BalooBhaina2.className}  text-[#88BC43]`}>
                            {editar === 'no' ? 'Registrar Planta' : 'Editar Planta'}
                        </h1>
                        <div className="flex-1 flex justify-end items-center gap-3 ">
                            <button
                                className="flex items-center gap-2 font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]">
                                <LuPencilLine className="w-[15px] h-[15px] "/>
                                Guardar
                            </button>

                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.planta} mt-4`}>
                        <div className={`${stylesDescriptionPlants.item1}`}>
                            <div className="h-[500px] overflow-hidden flex items-center justify-center">
                                {plantData &&
                                    <img src={`${plantData?.image.url}`} className="object-cover max-w-full max-h-full"
                                         alt="imagen" width="500"
                                         height="500"/>
                                }{
                                (plantEdit &&
                                    <>
                                        <div className="relative">
                                            <img
                                                src={`${plantEdit.images[0].url}`}
                                                className="object-cover max-w-full max-h-full"
                                                alt="imagen"
                                                width="500"
                                                height="500"
                                            />
                                            <div
                                                className="absolute top-0 right-0 m-4 select-none bg-white rounded p-2">
                                                <FaHeart name="hearth" size={30} color={relleno ? "red" : "gray"}
                                                         onChange={handleInputChangeEdit} onClick={handleClick}/>
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                            </div>
                        </div>
                        <div className={`${stylesDescriptionPlants.item2}`}>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className} `}>Alias:</h3>
                                </div>
                                <div className="flex items-center">
                                    {plantData &&
                                        <>
                                            <input
                                                type="text"
                                                name="alias"
                                                value={formValues.alias}
                                                onChange={handleInputChange}
                                                className=" pl-9 border-b-2 border-gray-300 rounded"
                                            />
                                            <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                                        </>
                                    } {plantEdit && (<>
                                    <input
                                        type="text"
                                        name="alias"
                                        defaultValue={plantEdit.alias}
                                        onChange={handleInputChangeEdit}
                                        className=" pl-9 border-b-2 border-gray-300 rounded"
                                    />
                                    <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                                </>)}

                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <FaRegIdCard className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className}`}>Nombre comunes:</h3>
                                </div>
                                <div className="flex items-center">
                                    {/*<input
                                    type="text"
                                    name="commonName"
                                    value={formValues.commonName}
                                    onChange={handleInputChange}
                                    className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                />
                                <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                    {plantData ?
                                        (<ul className="flex gap-2 pl-9">
                                            {/*<input
                                                type="text"
                                                name="commonName"
                                                value={plantData.candidates[0].specie.common_names.map( (id, index) => {

                                                })}
                                                onChange={handleInputChange}
                                                className="text-[24px] pl-9 border-b-2 border-gray-300 rounded"
                                            />
                                            <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>*/}
                                            {plantData?.candidates[0].specie.common_names.map((name, index) => (

                                                <li key={index}>{name}{index !== plantData?.candidates[0].specie.common_names.length - 1 && ','} </li>

                                            ))}
                                        </ul>) : (<p className=" pl-9"> {plantEdit?.plant_catalog_common_name}</p>)}
                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <RiPlantLine className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className}  `}>Nombre cientifico:</h3>
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
                                    {plantData ? (
                                            <>
                                                <p className=" pl-9">{plantData.candidates[0].specie.scientific_name}</p>
                                            </>) :
                                        (<>
                                            <p className=" pl-9">{plantEdit?.plant_catalog_scientific_name}</p>
                                        </>)}

                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <RiPlantLine className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className}  `}>Género:</h3>
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
                                    {plantData ? (
                                            <>
                                                <p className=" pl-9">{plantData.candidates[0].specie.genus_name}</p>
                                            </>) :
                                        (<>
                                            <p className=" pl-9">{plantEdit?.plant_catalog_genus}</p>
                                        </>)}

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
                                    {plantData ?
                                        (<>
                                            <p className=" pl-9">{plantData.candidates[0].specie.family_name}</p>
                                        </>) : (<><p className=" pl-9">{plantEdit?.plant_catalog_family_name}</p></>)}

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
                                    {plantData ?
                                        (<>
                                            <p className=" pl-9">{plantData.candidates[0].plant_data.sun_exposure}</p>
                                        </>) : (<><p className=" pl-9">{plantEdit?.plant_catalog_sun_exposure}</p></>)}

                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className}`}>Frecuencia
                                        de riego:</h3>
                                </div>

                                <div className="flex items-center">
                                    {plantData ?
                                        (
                                            <>
                                                <p className=" pl-9">{plantData.candidates[0].plant_data.watering}</p>
                                            </>) : (<>
                                            <p className=" pl-9">{plantEdit?.plant_catalog_watering_frecuency}</p>
                                        </>)}

                                </div>
                            </div>
                        </div>
                        <div className={`${stylesDescriptionPlants.item3}`}>
                            <div>
                                <div className="flex gap-2">
                                    <CiRuler className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className}`}>Altura:</h3>
                                </div>
                                {plantData &&
                                    <div className="flex items-center">
                                        <input
                                            step="0.1"
                                            type="number"
                                            name="height"
                                            //value={plantEdit && plantEdit.height ? plantEdit.height : ''}
                                            value={formValues.height}
                                            onChange={handleInputChange}
                                            className=" pl-9 border-b-2 border-gray-300 rounded"
                                        />
                                        <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                                    </div>
                                }{plantEdit &&
                                <div className="flex items-center">
                                    <input
                                        step="0.1"
                                        type="number"
                                        name="height"
                                        defaultValue={plantEdit.height}
                                        onChange={handleInputChangeEdit}
                                        className=" pl-9 border-b-2 border-gray-300 rounded"
                                    />
                                    <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                                </div>
                            }
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <CiCalendar className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className} `}>Fecha de
                                        plantación:</h3>

                                </div>
                                <div className="flex items-center">
                                    {plantData && <>
                                        <input
                                            type="date"
                                            name="planting_date"
                                            value={formValues.planting_date.toISOString().substr(0, 10)}
                                            onChange={handleInputChange}
                                            className="pl-9 border-b-2 border-gray-300 rounded"
                                        />
                                        <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]"/>
                                    </>}
                                    {plantEdit &&
                                        /*<input
                                            type="date"
                                            name="planting_date"
                                            //defaultValue={plantEdit.planting_date?.slice(0, 10)}
                                            defaultValue={plantEdit.planting_date?.slice(0, 10)}
                                            onChange={handleInputChangeEdit}
                                            className="pl-9 border-b-2 border-gray-300 rounded"
                                        />*/
                                        <p className="pl-9">{plantEdit.planting_date.replace("T", " ").replace("Z", "").slice(0, 10)}</p>
                                    }
                                </div>


                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <CiCalendar className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className} `}>Fecha de
                                        la última actualización:</h3>

                                </div>
                                <div className="flex items-center">

                                    <p className="pl-9">{plantEdit?.modification_date.replace("T", " ").replace("Z", "")}</p>

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
                                    {plantData ? (
                                        <>
                                            <p className="pl-9">{plantData.candidates[0].plant_data.description}</p>
                                        </>) : (<>
                                        <p className=" pl-9">{plantEdit?.plant_catalog_description}</p>
                                    </>)}

                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 mt-4 items-center">
                                    <FaLocationDot className={`${stylesDescriptionPlants.iconos}`}/>
                                    <h3 className={`${BalooBhaina2.className}`}>Ubicación</h3>
                                </div>

                                <button
                                    type="button"
                                    onClick={openPopup}
                                    className="  flex items-center gap-2 font-bold my-3 py-2 px-4 rounded text-white bg-[#88BC43] "
                                >
                                    Crear Jardín
                                </button>
                                <div className="flex flex-wrap gap-2">

                                    {plantData && ubicaciones.map((ubicacion, index) => (

                                        <div
                                            key={index}
                                            onClick={() => handleUbicacionChange(ubicacion.id)}
                                            className={`py-2 px-4 rounded border border-gray-300 cursor-pointer select-none ${
                                                formValues.id_garden === ubicacion.id ? 'bg-gray-200' : ''
                                            }`}
                                        >
                                            {ubicacion.id === null ? "sin jardin" : ubicacion.name}
                                        </div>
                                    ))}

                                    {
                                        plantEdit && ubicaciones.map((ubicacion, index) => (

                                            <div
                                                key={index}
                                                data-id={ubicacion.id}
                                                onClick={() => handleUbicacionChangeEdit(ubicacion.id)}
                                                //onChange={handleInputChangeEdit}
                                                className={`py-2 px-4 rounded border border-gray-300 cursor-pointer select-none ${
                                                    formValuesEdit.id_garden === ubicacion.id ? 'bg-gray-200' : ''
                                                }`}
                                            >
                                                {ubicacion.id === null ? "sin jardin" : ubicacion.name}
                                            </div>
                                        ))

                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="m-10 flex flex-col md:flex-row gap-5">
                    {!plantData ? (
                        <div className="flex-1">
                            <div className="flex gap-2 items-center">
                                <FaImages className={`${stylesDescriptionPlants.iconos}`}/>
                                <h3 className={`${BalooBhaina2.className} `}>Imágenes</h3>
                            </div>
                            <div className={`${stylesDescriptionPlants.item1}`}>
                                <div className="h-[500px] overflow-hidden flex items-center justify-center">
                                    <img src={plantEdit?.images[0].url} className="object-cover max-w-full max-h-full"
                                         alt="Albahaca-sana" width="500"
                                         height="500"/>
                                </div>

                            </div>
                            <button className="font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43;]">Subir más
                                imágenes
                            </button>
                        </div>) : (
                        <>
                        </>)
                    }
                    <div className="flex-1 flex gap-2 flex-col">
                        <div className="flex gap-2 items-center">
                            <FaRegNoteSticky className={`${stylesDescriptionPlants.iconos}`}/>
                            <h3 className={`${BalooBhaina2.className}`}>Notas
                                adicionales</h3>

                        </div>
                        <div className={`${stylesDescriptionPlants.efectoHoja} overflow-hidden bg-[#EFE8D6]`}>
                            {plantData ? (<>
                            <textarea
                                name="notes"
                                //value={formValues.notes}
                                //onChange={handleInputChange}
                                className=" pl-9 pr-9 w-full h-full resize-none"
                            />
                            </>) : (<>
                            <textarea
                                name="notes"
                                //value={formValues.notes}
                                //onChange={handleInputChange}
                                className=" pl-9 pr-9 w-full h-full resize-none"
                            />
                            </>)}


                        </div>
                    </div>
                </section>
                <div className="m-10">

                    <button
                        className="flex items-center gap-2 font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43]"
                    >
                        <LuPencilLine className="w-[15px] h-[15px] "/>
                        Guardar
                    </button>
                </div>

            </form>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <form onSubmit={handleSubmitGarden}>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Nuevo Jardín</h2>
                            <input
                                type="text"
                                value={gardenName}
                                onChange={handleInputChangeGardenName}
                                className="mb-4 border border-gray-300 rounded px-2 py-1"
                                placeholder="Nombre del jardín"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
