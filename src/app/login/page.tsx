import Image from "next/image";

export default function Login() {

    return (
        <>
            <section className="flex justify-center items-center m-10">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email"
                                    className="">Email</label>
                                <input type="email" name="email" id="email"
                                    className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                    placeholder="Ingresá tu correo" />
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="">Contraseña</label>
                                <input type="password" name="password" id="password"
                                    placeholder="••••••••"
                                    className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-[#639122]"
                                />
                            </div>

                            <button type="submit"
                                className="bg-[#EFE8D6] mt-2 w-fit text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-[#DED1B3] active:bg-[#CCBEA0] active:scale-75">
                                Iniciar sesión
                            </button>
                            <p>
                                ¿No tenés cuenta todavía? <a href="#"
                                    className="hover:underline ">Registrarse</a></p>
                            <div>

                                <div className="flex items-center justify-center gap-10">
                                    <Image src="/videolanding/google.png" alt="google" width="40"
                                        height="40" />
                                    <Image src="/videolanding/facebook.png" alt="facebook" width="40"
                                        height="40" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
