import EditarPlanta from "@/components/editarPlanta/page";

export default function EditarPage({params: {id}}: { params: { id: string } }){
    return(
    <EditarPlanta params={{ id }} />
    )
}