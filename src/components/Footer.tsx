"use client"
export default function Footer(){
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold">¡Síguenos en redes sociales!</h3>
                    <div className="flex mt-2">
                        <a href="#" className="text-gray-400 hover:text-white mr-4"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white mr-4"><i
                            className="fab fa-twitter"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div>
                    <p className="text-sm">&copy; 2024 Nombre de la Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}