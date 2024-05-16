import IdentificarPlanta from "@/components/IdentificarPlanta/IdentificarPlanta";

export async function generateStaticParams(){
    return[{enlace: 'diagnosticar'}]
}


export default function IdentificarPage({params: {enlace}}: { params: { enlace: string } }) {
    let enlaceR: string = ""
    if (enlace === "diagnosticar") {
        enlaceR = "resultado"
    } else if (enlace === "dianosticarEstado") {
        enlaceR = "estado"
    }


    return (
        <IdentificarPlanta enlace={`${enlaceR}`}/>
    )
}