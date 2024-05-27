import CaracteristicaPlanta from "@/components/caracteristicaPlanta/caracteristicaPlanta";

export default function ResultadoPage({params: {id}}: { params: { id: string } }) {

    return (
       <CaracteristicaPlanta planta={id} espacio="no"/>

    )
}