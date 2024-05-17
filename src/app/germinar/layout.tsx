import Image from "next/image";


export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>){
    return(
        <>
            {/*<header className="flex items-center py-4 justify-center bg-[#EFE8D6]">
                <div>
                    <Image src="/isotipo-fondo-claro.png" alt="isotipo" height="100" width="100"/>
                </div>
                <div>
                    <Image src="/logotipo.png" alt="logo" height="400" width="400"/>
                </div>

            </header>*/}
            {/*<header
                className="fixed top-0 left-0 z-50 h-full  flex flex-col items-center justify-between py-10 px-4 ">
                <div className="flex flex-col items-center space-y-4">
                    <div>
                        <Image src="/isotipo-fondo-claro.png" alt="isotipo" height="80" width="80"/>
                    </div>
                    <div>
                        <Image src="/logotipo.png" alt="logo" height="300" width="300"/>
                    </div>
                </div>
            </header>*/}
            {children}
        </>

    )
}