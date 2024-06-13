import {ImSpinner} from "react-icons/im";

export default function Loading(){
    return(
        <div className="md:h-[453px] flex flex-col items-center justify-center gap-10">
            <ImSpinner className={"spinner h-20 w-40 mx-auto text-green-600 animate-spin"}/>
            <h2 className={"text-gray-700"}>Cargando...</h2>
        </div>
)
}