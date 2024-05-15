import Image from "next/image";


export default function Layout({children} : { children: React.ReactNode}){
    return(
        <>
            <header className="flex items-center py-4 justify-center bg-[#EFE8D6]">
                <div>
                    <Image src="/isotipo-fondo-claro.png" alt="isotipo" height="100" width="100"/>
                </div>
                <div>
                    <Image src="/logotipo.png" alt="logo" height="400" width="400"/>
                </div>

            </header>
            {children}
        </>

    )
}