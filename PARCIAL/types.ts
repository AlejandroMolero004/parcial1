import { ObjectId } from "mongodb";

export type libroDB={
    _id?:ObjectId
    título: string,
    autores:ObjectId[], 
    copias:number 
}

export type autorDB={
    _id?:ObjectId,
    nombre:string,
    biografia:string
}

export type libro={
    id:string
    título: string,
    autores:autor[], 
    Copias:number 
}

export type autor={
    id:string,
    nombre:string,
    biografia:string
}