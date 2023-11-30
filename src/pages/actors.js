
import { getActors } from "@/util/API"

export default async function Actors(){
    const actorsList = await getActors();
    return (
        <div>
         <h1>Popular Actors</h1> 
         <div>
          {actorsList.map(actor => {
            return actor.name
          })}
         </div>  
        </div>
    )
}