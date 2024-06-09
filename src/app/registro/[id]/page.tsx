import RegistroPlanta from "@/components/RegistroPlanta/RegistroPlanta";

export default function RegistroPage({params: {id}}: { params: { id: string } }){
    return(
        <>
            <RegistroPlanta params={{ id }} />
        </>
    )
}