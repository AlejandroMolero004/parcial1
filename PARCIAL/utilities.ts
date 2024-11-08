import { Collection } from "mongodb";
import { autor, autorDB, libro, libroDB } from "./types.ts";
export const frommodeltolibro=async(model:libroDB,colecionautores:Collection<autorDB>):Promise<libro>=>{
    const autores=await colecionautores.find({_id:{$in:model.autores}}).toArray()

    return {
    id:model._id!.toString(),
    título: model.título,
    autores:autores.map((a)=>frommodeltoautor(a)), 
    Copias:model.copias
    }
}

export const frommodeltoautor=(model:autorDB):autor=>{
    return{
        id:model._id!.toString(),
        nombre:model.nombre,
        biografia:model.biografia
    }
}