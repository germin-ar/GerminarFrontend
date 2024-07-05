"use client"
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import stylesDescriptionPlants from './descripcion.module.css';

import {FaHeart, FaImages, FaRegIdCard} from 'react-icons/fa';
import {LuPencilLine} from "react-icons/lu";
import Image from "next/image";
import {RiPlantLine} from "react-icons/ri";
import {GiPlantRoots} from "react-icons/gi";
import {MdOutlineHealthAndSafety, MdOutlineWaterDrop} from "react-icons/md";
import {IoSunnyOutline} from "react-icons/io5";
import {CiCalendar, CiRuler} from "react-icons/ci";
import {FiAlertCircle} from "react-icons/fi";
import {FaLocationDot, FaRegNoteSticky} from "react-icons/fa6";
import {BalooBhaina2} from "../../app/ui/fonts";
import Loading from "@/components/Spinner/Spinner";
import Link from "next/link";
import { PlantService } from "@/services/PlantService";
import { FormValues, FormValuesEdit, PlantCaracts, PlantData, PlantEdit } from "@/interfaces";
import { CandidatesService } from "@/services/CandidatesService";
import { GardenService } from "@/services/GardenService";

export async function generateStaticParams() {
    return [{id: '1'}]
}

interface IdentificarPlanta {
    id: string
    editar: string
}


export default function Formulario(props: IdentificarPlanta) {
    const {id, editar} = props
    const router = useRouter();

    const [plantData, setPlantData] = useState<PlantCaracts | null>(null);
    const [plantEdit, setPlantEdit] = useState<PlantEdit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ubicaciones, setUbicaciones] = useState<{ id: number | null; name: string | null; }[]>([]);


    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUpload, setFileUpload] = useState(false);

    const [formValues, setFormValues] = useState<FormValues>({
        alias: "",
        height: 0,
        planting_date: new Date(),
        id_garden: null,
        is_favorite: true,
        notes: "",
        image_url: ""
    });


    //edit
    const [formValuesEdit, setFormValuesEdit] = useState<FormValuesEdit>({
        alias: '',
        height: 0,
        id_garden: null,
        is_favorite: false,
        notes: "",
        image_url: ''
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

    const plantService = new PlantService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const candidatesService = new CandidatesService(`${process.env.NEXT_PUBLIC_API_HOST}`);
    const gardenService = new GardenService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    const submitForm = async () => {
        if (editar === "si") {
            try {
                plantService.updatePlant(plantEdit?.id, formValuesEdit)               
                router.push(`/jardin`);
            } catch (error) {
                console.error(error);
            }
        }
        if (editar === "no") {

            try {
                const updatedFormValues = {
                    ...formValues,
                    image_url: plantData?.image.url,
                    id_plant_catalog: plantData?.candidates[0].plant_data.id
                };
                const response = await plantService.savePlant(updatedFormValues);
                if (response) {
                    router.push(`/jardin/${response}`)
                } else {
                    console.log(JSON.stringify(updatedFormValues))
                }
            } catch (error) {
                console.error(error);
            }
        }


    };


    useEffect(() => {
        if (editar === "no") {
            const fetchCandidates = async () => {
                try {
                    const data = await candidatesService.getCandidates(id);
                    setPlantData(data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            };
            fetchCandidates();

        } else if (editar === "si") {
            const fetchPlantData = async () => {
                try {
                    const data = await plantService.getPlant(id);
                    setPlantEdit(data);
                    setRelleno(data.favorite)
                    setFormValuesEdit({
                        alias: data.alias ?? '',
                        height: data.height ?? 0,
                        id_garden: data.id_garden ?? null,
                        is_favorite: data.favorite ?? false,
                        image_url: data.images.length > 0 ? data.images[0].url : '',
                        notes: data.notes ?? ''
                    });
                    setFileUpload(false)
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            };

            if (id) {
                fetchPlantData();
                setLoading(false);
            }
        }
        
        fetchUbicaciones();
        console.log(ubicaciones);
    }, [id, fileUpload]);
   
    const fetchUbicaciones = async () => {
        try {
            const data = await gardenService.getGardens();
            setUbicaciones(data.map(garden => ({id: garden.id, name: garden.name})));
        } catch (error) {
            console.error(error);
        }
    };

    const [gardenName, setGardenName] = useState('');
    const handleInputChangeGardenName = (event: any) => {
        setGardenName(event.target.value);
    };

    const handleSubmitGarden = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await gardenService.saveGarden(gardenName);
            if (response.ok) {
                alert('Jardín creado exitosamente');
                closePopup();
                await fetchUbicaciones()
            }
        } catch (error) {
            console.error(error);
        }
    }




    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };




    const handleFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadImage = async (event:any) => {
        if (event) {
            event.preventDefault();
        }
        if (!selectedFile) {
            alert('No se ha seleccionado ningún archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await plantService.uploadPhoto(plantEdit?.id, formData);
            if (response) {
                setFileUpload(true);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error(error);
        }
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
                                                src={plantEdit && plantEdit.images.length > 0 ? plantEdit.images[plantEdit.images.length - 1].url : ''}
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
                                    <img src={plantEdit && plantEdit.images.length > 0 ? plantEdit.images[plantEdit.images.length - 1].url : ''} className="object-cover max-w-full max-h-full"
                                         alt="Albahaca-sana" width="500"
                                         height="500"/>
                                </div>

                            </div>
                            <div className="flex gap-2 items-center justify-center flex-wrap">
                                <input type="file" onChange={handleFileChange}/>
                                <button
                                    onClick={handleUploadImage}
                                    className="font-bold mt-3 py-2 px-4 rounded text-white bg-[#88BC43]"
                                >
                                    Subir imagen
                                </button>
                            </div>
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
                                value={formValues.notes}
                                onChange={handleInputChange}
                                className=" pl-9 pr-9 w-full h-full resize-none"
                            />
                            </>) : (<>
                            <textarea
                                name="notes"
                                value={formValuesEdit.notes}
                                onChange={handleInputChangeEdit}
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
