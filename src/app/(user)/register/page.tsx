"use client"
import ToastSuccess from '@/components/Toasts/ToastSuccess';
import {confirmCode, loginSchema, registerSchema} from '@/utils/validationSchema';
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BalooBhaina2 } from '../../ui/fonts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {AuthenticationService} from "@/services/AuthenticationService";
import ToastWarning from "@/components/Toasts/ToastWarning";

interface IFormInput {
    email: string;
    user_name: string;
    password: string;
    confirm_password: string;
}


export default function RegisterPage(){

    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastWarning, setShowToastWarning] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState<string | null>("mariano_ariel_97@outlook.com");



    const [userConfirm, setUserConfirm] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(registerSchema),
    });






    const router = useRouter();

    const userService = new AuthenticationService(`${process.env.NEXT_PUBLIC_API_HOST}`);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        const {email, user_name, password} = data;
        const username = user_name;
        const userDataToSend = {email, username, password};
        setUserEmail(data.email);
        console.log(userDataToSend)

        try {
            const response = await userService.signUp(userDataToSend);
            if(response){
                setMessage("¡Registro exitoso!");
                setShowToastSuccess(true);
                setTimeout(() => router.push("/login"), 2000);
            } else {
                console.log(data)
            }
        } catch (e:any) {
            if (e.code === 'UserNotConfirmedException')
            {
                setMessage("Usuario no verificado. Revisa tu email para la verificación.");
                setShowToastWarning(true);
                setTimeout(() => setUserConfirm(true), 2000);
            }else {
                setMessage("¡Error!")
                setShowToastWarning(true);
                console.error(e)
            }


        }

    };

    const [formData, setFormData] = useState({
        email: userEmail,
        confirmation_code: ''
    });

    const handleSubmitConfirm = async (e: any) => {
        e.preventDefault();

        try {
            const response = await userService.confirmSignUp(formData);
            if (response) {
                setMessage("¡Codigo confirmado correctamente!");
                setShowToastSuccess(true);
                setTimeout(() => setUserConfirm(false), 2000);
            } else {
                console.log(formData)
            }
        } catch (e: any) {
            setMessage("¡Error!")
            setShowToastWarning(true);
            console.error(e)
        }

        console.log(formData);

        // Aquí podrías realizar más acciones, como enviar los datos a un servidor
    };

    const handleChangeConfirm = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };





    return (
        <>
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
            </div>

            <section className="flex justify-center items-center m-10 h-96">
                <div
                    className="flex flex-col justify-between items-center bg-[#efe8d6] w-full h-full bg-white rounded-l-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                    <div className='m-5 text-center flex flex-col gap-3'>
                        <h3 className={`${BalooBhaina2.className} text-[#88BC43] font-bold`}>
                            ¡Bienvenido de nuevo!</h3>
                        <p>Ingresá tus credenciales para seguir cultivando de manera inteligente</p>
                    </div>
                    <div>
                        <Image src={'/login-foto.jpeg'}
                               alt='login-foto'
                               width={1158}
                               height={550}/>
                    </div>
                </div>
                {
                    userConfirm && (
                        <>
                            <div
                                className="max-w-[500px] h-full bg-white rounded-r-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <form onSubmit={handleSubmitConfirm}>
                                            <div>
                                                <label htmlFor="email">Email:</label>
                                                <p>{userEmail}</p>
                                            </div>
                                            <div>
                                                <label htmlFor="confirmation_code">Código de confirmación:</label>
                                                <input
                                                    type="text"
                                                    id="confirmation_code"
                                                    name="confirmation_code"
                                                    value={formData.confirmation_code}
                                                    onChange={handleChangeConfirm}
                                                    placeholder="Ingrese el código de confirmación"
                                                    required
                                                />
                                            </div>
                                            <button type="submit">Enviar</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </>
                    )

                }
                {
                    !userConfirm &&
                    <div
                        className="max-w-[500px] h-full bg-white rounded-r-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="user-name"
                                               className="">Usuario</label>
                                        <input {...register('user_name')}
                                               className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                               placeholder="Ingresá un nombre de usuario"/>
                                        {errors.user_name &&
                                            <span className="text-red-800">{errors.user_name.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="email"
                                               className="">Email</label>
                                        <input {...register('email')}
                                               className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                               placeholder="Ingresá un correo"/>
                                        {errors.email && <span className="text-red-800">{errors.email.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="">Contraseña</label>
                                        <input type="password" {...register('password')}
                                               placeholder="••••••••"
                                               className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                        />
                                        {errors.password &&
                                            <span className="text-red-800">{errors.password.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password"
                                               className="block ">Confirmar
                                            contraseña</label>
                                        <input type="password" {...register('confirm_password')}
                                               placeholder="••••••••"
                                               className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                        />
                                        {errors.confirm_password &&
                                            <span className="text-red-800">{errors.confirm_password.message}</span>}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <button type="submit"
                                                className="bg-[#EFE8D6] mt-2 w-fit text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75">
                                            Registrarse
                                        </button>
                                        <span>
                                                ¿Ya tenés una cuenta? <Link href={"/login"}
                                                                            className="hover:underline font-bold">Iniciar sesión</Link>
                                            </span>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                }

            </section>
        </>
    )
}