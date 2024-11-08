import { MongoClient} from 'mongodb'
import { autorDB, libroDB } from "./types.ts";
import { frommodeltolibro } from "./utilities.ts";
const url = Deno.env.get("MONGO_URL")
if(!url){
  Deno.exit(0)
}
const client = new MongoClient(url);
await client.connect()
const dbName = 'parcial';

const db = client.db(dbName);

const colecionautores = db.collection<autorDB>("autores");
const colecionlibros=db.collection<libroDB>("autores")

const handler=async(req:Request):Promise<Response>=>{
  const url=new URL(req.url)
  const method=req.method
  const path=url.pathname

  if(method==="POST"){
    if(path==="/libro"){
      const libro= await req.json()
      if(!libro.titulo||!libro.autores||!libro.copiasDisponibles){
        return new Response("Bad request",{status:400})
      }
      const libroDB=colecionlibros.find({titulo:libro.titulo}).toArray()

      if(!libroDB){
        return new Response("Book not found",{status:404})
      }

      const plibros=((await libroDB).map((l)=>frommodeltolibro(l,colecionautores))).map(Promise.all)

      return new Response

    } 
  }
  if(method==="GET"){
    if(path==="/libro"){
      if(url.searchParams.get("titulo")){
        const titulo=url.searchParams.get("titulo")
        if(titulo){
          const librosDB=colecionlibros.find({titulo:titulo}).toArray()
          if(!librosDB){
            return new Response("Not Found",{status:404})
          }
          const libros=Promise.all((await librosDB).map((l)=>frommodeltolibro(l,colecionautores)))
          let l=(await libros).map(Promise.all)
        }
      }
      if(url.searchParams.get("id")){
        const id=url.searchParams.get("id")
        if(id){
          
        }
      }
    }
    
  }
  
  

  return new Response("Enpoint not found")

}

Deno.serve({port:3000},handler)