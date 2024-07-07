'use client'
import ToastSuccess from '@/components/Toasts/ToastSuccess';
import { loginSchema } from '@/utils/validationSchema';
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BalooBhaina2 } from '../ui/fonts';
import Link from 'next/link';

interface IFormInput {
    email: string;
    password: string;
}

export default function Login() {

    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        setMessage("¡Login exitoso!");
        setShowToastSuccess(true);
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
                            height={550} />
                    </div>
                </div>
                <div
                    className="w-full h-full bg-white rounded-r-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email"
                                    className="">Email</label>
                                <input {...register('email')}
                                    className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                    placeholder="Ingresá tu correo" />
                                {errors.email && <span className="text-red-800">{errors.email.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="">Contraseña</label>
                                <input type="password" {...register('password')}
                                    placeholder="••••••••"
                                    className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                />
                                {errors.password && <span className="text-red-800">{errors.password.message}</span>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <button type="submit"
                                    className="bg-[#EFE8D6] mt-2 w-fit text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75">
                                    Iniciar sesión
                                </button>
                                <span>
                                    ¿No tenés cuenta todavía? <Link href="/germinar"
                                        className="hover:underline font-bold">Registrarse</Link></span>
                            </div>
                            <div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
