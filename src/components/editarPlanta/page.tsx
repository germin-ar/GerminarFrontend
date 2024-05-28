import Formulario from "@/components/formularioEditarRegistro/formulario";

export default function EditarPlanta({params: {id}}: { params: { id: string } }) {
   return(
       <Formulario id={id} editar="si"/>
   )

}
