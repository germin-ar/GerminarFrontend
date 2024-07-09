"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import stylesDescriptionPlants from './descripcion.module.css';
import { FaCheck, FaHeart, FaImages } from 'react-icons/fa';
import { LuCalendarDays, LuLeaf, LuPencilLine, LuRuler } from "react-icons/lu";
import { RiIdCardLine, RiPlantLine } from "react-icons/ri";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { FaLocationDot, FaRegNoteSticky } from "react-icons/fa6";
import { BalooBhaina2 } from "../../app/ui/fonts";
import Link from "next/link";
import { PlantService } from "@/services/PlantService";
import { FormValues, FormValuesEdit, PlantCaracts, PlantEdit } from "@/interfaces";
import { CandidatesService } from "@/services/CandidatesService";
import { GardenService } from "@/services/GardenService";
import ToastSuccess from "../Toasts/ToastSuccess";
import ToastWarning from "../Toasts/ToastWarning";
import { PiPlantBold } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Loading from "../Spinner/Spinner";

export async function generateStaticParams() {
    return [{ id: '1' }]
}

interface IdentificarPlanta {
    id: string
    editar: string
}


export default function Formulario(props: IdentificarPlanta) {

    const { id, editar } = props
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
        const { name, value, type } = e.target;
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
        const { name, value, type } = e.target;
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
                router.push(`/jardin/${plantEdit?.id}`);
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
            setUbicaciones(data.map(garden => ({ id: garden.id, name: garden.name })));
        } catch (error) {
            console.error(error);
        }
    };

    const [gardenName, setGardenName] = useState('');
    const handleInputChangeGardenName = (event: any) => {
        setGardenName(event.target.value);
    };

    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastWarning, setShowToastWarning] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmitGarden = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await gardenService.saveGarden(gardenName, 1);
            if (response) {
                closePopup();
                setMessage("Jardín creado exitosamente.");
                setShowToastSuccess(true);
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




    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadImage = async (event: any) => {
        if (event) {
            event.preventDefault();
        }
        if (!selectedFile) {
            setMessage("Seleccioná una imagen primero.");
            setShowToastWarning(true);
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await plantService.uploadPhoto(plantEdit?.id, formData);
            if (response) {
                setMessage("Imagen cargada exitosamente.");
                setShowToastSuccess(true);
                setFileUpload(true);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error(error);
        }
    };


    if (loading) {
        return <Loading />;
    }

    const handleGoBack = () => {
        router.back();
    };

    if (error) {
        return <div className="flex items-center justify-center flex-col">
            <h1 className="text-center">¡Oh no! Algo ha salido mal. Vuelve a intentar.</h1>
            <button onClick={handleGoBack} className="bg-[#88BC43] text-white py-2 px-4 rounded">Reintentar</button>
        </div>;
    }

    return (
        <div className="relative">
            <div className="fixed right-10 z-10">
                {showToastSuccess && (
                    <ToastSuccess
                        message={`${message}`}
                        onClose={() => setShowToastSuccess(false)}
                    />
                )}
                {showToastWarning && (
                    <ToastWarning
                        message={`${message}`}
                        onClose={() => setShowToastWarning(false)}
                    />
                )}
            </div>
            <form className={`${stylesDescriptionPlants.contenedor}`} onSubmit={handleSubmit}>
                <section className="m-10">
                    <div className="flex justify-between flex-col md:flex-row md:gap-3">
                        <h1 className={`${BalooBhaina2.className}  text-[#88BC43]`}>
                            {editar === 'no' ? 'Guardar nueva Planta' : 'Editar Planta'}
                        </h1>
                        <div className="flex-1 flex justify-end items-center gap-3 ">
                            <button
                                className={`bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                <FaCheck />
                                Guardar
                            </button>

                        </div>
                    </div>
                    <div className={`${stylesDescriptionPlants.planta} mt-4`}>
                        <div className={`${stylesDescriptionPlants.item1}`}>
                            <div className="overflow-hidden flex items-center justify-center">
                                {plantData &&
                                    <img src={`${plantData?.image.url}`} className={`${stylesDescriptionPlants.sombraImagen} object-cover max-w-full max-h-full rounded-[5px]`}
                                        alt={`${plantData.candidates[0].name}`} width="400"
                                        height="400" />
                                }{
                                    (plantEdit &&
                                        <>
                                            <div className="relative">
                                                <img
                                                    src={plantEdit && plantEdit.images.length > 0 ? plantEdit.images[plantEdit.images.length - 1].url : ''}
                                                    className={`${stylesDescriptionPlants.sombraImagen} object-cover max-w-full max-h-full rounded-[5px]`} alt={plantEdit.alias}
                                                    width="400"
                                                    height="400"
                                                />
                                                <div
                                                    className="cursor-pointer absolute top-0 right-0 m-4 select-none bg-white rounded p-2 transition transform duration-200 ease-in-out active:scale-75">
                                                    <FaHeart name="hearth" size={30} color={relleno ? "red" : "gray"}
                                                        onChange={handleInputChangeEdit} onClick={handleClick} />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                        <div className={`${stylesDescriptionPlants.item2} flex flex-col gap-3`}>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <RiIdCardLine className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Alias:</p>
                                </div>
                                <div className="flex items-center">
                                    {plantData &&
                                        <>
                                            <input
                                                type="text"
                                                name="alias"
                                                value={formValues.alias}
                                                onChange={handleInputChange}
                                                className="ml-9 rounded-lg px-4 py-1 border border-gray-300 focus:outline-none focus:border-[#639122]"
                                            />
                                            <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]" />
                                        </>
                                    } {plantEdit && (<>
                                        <input
                                            type="text"
                                            name="alias"
                                            defaultValue={plantEdit.alias}
                                            onChange={handleInputChangeEdit}
                                            className="ml-9 rounded-lg px-4 py-1 border border-gray-300 focus:outline-none focus:border-[#639122]"
                                        />
                                        <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]" />
                                    </>)}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <RiIdCardLine className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Nombre comunes:</p>
                                </div>
                                <div className="flex items-center">
                                    {plantData ?
                                        (<ul className="flex gap-2 pl-9">
                                            {plantData?.candidates[0].specie.common_names.map((name, index) => (

                                                <li key={index}>{name}{index !== plantData?.candidates[0].specie.common_names.length - 1 && ','} </li>

                                            ))}
                                        </ul>) : (<p className=" pl-9"> {plantEdit?.plant_catalog_common_name}</p>)}
                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <PiPlantBold className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Nombre cientifico:</p>
                                </div>
                                <div className="flex items-center">
                                    {plantData ? (
                                        <>
                                            <p className="pl-9">{plantData.candidates[0].specie.scientific_name}</p>
                                        </>) :
                                        (<>
                                            <p className="pl-9">{plantEdit?.plant_catalog_scientific_name}</p>
                                        </>)}

                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <RiPlantLine className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Género:</p>
                                </div>
                                <div className="flex items-center">
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
                                    <LuLeaf className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Familia:</p>
                                </div>
                                <div className="flex items-center">
                                    {plantData ?
                                        (<>
                                            <p className=" pl-9">{plantData.candidates[0].specie.family_name}</p>
                                        </>) : (<><p className=" pl-9">{plantEdit?.plant_catalog_family_name}</p></>)}

                                </div>

                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <FiSun className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Exposición
                                        solar:</p>
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
                                    <MdOutlineWaterDrop className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Frecuencia
                                        de riego:</p>
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
                        <div className={`${stylesDescriptionPlants.item3} flex flex-col gap-3`}>
                            <div>
                                <div className="flex gap-2">
                                    <LuRuler className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Altura:</p>
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
                                            className="ml-9 rounded-lg px-4 py-1 border border-gray-300 focus:outline-none focus:border-[#639122]"
                                        />
                                        <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]" />
                                    </div>
                                }{plantEdit &&
                                    <div className="flex items-center">
                                        <input
                                            step="0.1"
                                            type="number"
                                            name="height"
                                            defaultValue={plantEdit.height}
                                            onChange={handleInputChangeEdit}
                                            className="ml-9 rounded-lg px-4 py-1 border border-gray-300 focus:outline-none focus:border-[#639122]"
                                        />
                                        <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]" />
                                    </div>
                                }
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <LuCalendarDays className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Fecha de
                                        plantación:</p>

                                </div>
                                <div className="flex items-center">
                                    {plantData && <>
                                        <input
                                            type="date"
                                            name="planting_date"
                                            value={formValues.planting_date.toISOString().substr(0, 10)}
                                            onChange={handleInputChange}
                                            className="ml-9 rounded-lg px-4 py-1 border border-gray-300 focus:outline-none focus:border-[#639122]"
                                        />
                                        <LuPencilLine className="w-[25px] h-[25px] text-[#88BC43]" />
                                    </>}
                                    {plantEdit &&
                                        <p className="pl-9">{plantEdit.planting_date.replace("T", " ").replace("Z", "").slice(0, 10)}</p>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <LuCalendarDays className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Fecha de
                                        la última actualización:</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="pl-9">{plantEdit?.modification_date.replace("T", " ").replace("Z", "")}</p>
                                </div>
                            </div>

                        </div>
                        <div className={`${stylesDescriptionPlants.item4}`}>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <IoMdInformationCircleOutline className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Descripción
                                        general</p>
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
                                    <FaLocationDot className={`${stylesDescriptionPlants.iconos}`} />
                                    <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Jardín</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={openPopup}
                                    className={`bg-[#88BC43] mt-3 ml-9 w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                                    Crear Jardín
                                </button>
                                <div className="flex flex-wrap gap-2">

                                    {plantData && ubicaciones.map((ubicacion, index) => (

                                        <div
                                            key={index}
                                            onClick={() => handleUbicacionChange(ubicacion.id)}
                                            className={`py-2 px-4 rounded border border-gray-300 cursor-pointer select-none ${formValues.id_garden === ubicacion.id ? 'bg-gray-200' : ''
                                                }`}
                                        >
                                            {ubicacion.id === null ? "Sin jardín" : ubicacion.name}
                                        </div>
                                    ))}

                                    {
                                        plantEdit && ubicaciones.map((ubicacion, index) => (

                                            <div
                                                key={index}
                                                data-id={ubicacion.id}
                                                onClick={() => handleUbicacionChangeEdit(ubicacion.id)}
                                                //onChange={handleInputChangeEdit}
                                                className={`py-2 px-4 rounded border border-gray-300 cursor-pointer select-none ${formValuesEdit.id_garden === ubicacion.id ? 'bg-gray-200' : ''
                                                    }`}
                                            >
                                                {ubicacion.id === null ? "Sin jardín" : ubicacion.name}
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
                                <FaImages className={`${stylesDescriptionPlants.iconos}`} />
                                <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Imágenes</p>
                            </div>
                            <div className={`${stylesDescriptionPlants.item1}`}>
                                <div className="overflow-hidden flex items-center justify-center">
                                    <img src={plantEdit && plantEdit.images.length > 0 ? plantEdit.images[plantEdit.images.length - 1].url : ''} className="object-cover max-w-full max-h-full"
                                        alt={plantEdit?.alias} width="400"
                                        height="400" />
                                </div>

                            </div>
                            <div className="flex gap-2 items-center justify-center flex-wrap">
                                <input type="file" onChange={handleFileChange} className="cursor-pointer" />
                                <button
                                    onClick={handleUploadImage}
                                    className={`bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}
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
                            <FaRegNoteSticky className={`${stylesDescriptionPlants.iconos}`} />
                            <p className={`${BalooBhaina2.className} text-[#1F2325]`}>Notas
                                adicionales</p>

                        </div>
                        <div className={`${stylesDescriptionPlants.efectoHoja} ${stylesDescriptionPlants.sombraImagen} overflow-hidden bg-[#EFE8D6]`}>
                            {plantData ? (<>
                                <textarea
                                    name="notes"
                                    value={formValues.notes}
                                    onChange={handleInputChange}
                                    className="pl-9 pr-9 w-full h-full resize-none focus:border-none"
                                />
                            </>) : (<>
                                <textarea
                                    name="notes"
                                    value={formValuesEdit.notes}
                                    onChange={handleInputChangeEdit}
                                    className="pl-9 pr-9 w-full h-full resize-none focus:border-none"
                                />
                            </>)}


                        </div>
                    </div>
                </section>
                <div className="m-10">
                    <button
                        className={`bg-[#88BC43] w-max flex items-center gap-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#76A832] active:bg-[#639122] active:scale-75`}>
                        <FaCheck />
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
                                    className="bg-gray-400 w-full text-white px-4 py-2 mr-2 rounded transition duration-300 ease-in-out transform hover:bg-gray-600 active:bg-gray-700 active:scale-75">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-400 w-full text-white px-4 py-2 mr-2 rounded transition duration-300 ease-in-out transform hover:bg-blue-600 active:bg-blue-700 active:scale-75">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
