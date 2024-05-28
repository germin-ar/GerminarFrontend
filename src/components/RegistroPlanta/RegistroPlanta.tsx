import Formulario from "@/components/formularioEditarRegistro/formulario";


export default function RegistroPlanta({params: {id}}: { params: { id: string } }) {

    return (
        <Formulario id={id} editar="no" />
    )

}
