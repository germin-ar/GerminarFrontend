import CaracteristicaPlanta from "@/components/caracteristicaPlanta/caracteristicaPlanta";

export default function DetallePage({params: {nombre}}: { params: { nombre: string } }){
    return(
        <CaracteristicaPlanta planta={nombre} espacio={"no"} sugerencia={"si"}/>
    )
}