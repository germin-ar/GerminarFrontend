import CaracteristicaPlanta from "@/components/caracteristicaPlanta/caracteristicaPlanta";

export default function PlantaPage(/*{params: {id}}: { params: { id: string } }*/) {
    const id = "tomate_enfermo"

    return (
        <section className="max-w-[1300px] m-auto">
            <CaracteristicaPlanta planta={id} espacio="espacio"/>
        </section>

    )
}