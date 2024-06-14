import IdentificarPlanta from "@/components/IdentificarPlanta/IdentificarPlanta";

export async function generateStaticParams() {
    return [{enlace: 'diagnosticar'}]
}

export default function IdentificarPage({params: {enlace}}: { params: { enlace: string } }) {
    let enlaceR: string = ""
    if (enlace === "identificar") {
        enlaceR = "resultado"
    } else if (enlace === "diagnosticar") {
        enlaceR = "estado"
    }

    return (
        <IdentificarPlanta enlace={`${enlaceR}`}/>
    )
}