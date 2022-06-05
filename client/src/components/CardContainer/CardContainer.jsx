import React from "react";
import DogCard from "../DogCard/DogCard";
import estilo from "./CardContainer.module.css";

export default function CardContainer({dogs}){
    
    return(
        <div className={estilo.CardContainerDiv}>
            <h1 id={estilo.tituloId}>soy un contenedor de perritos</h1>
            {dogs.map(
                (dog) => {
                    return <DogCard dog={dog}/>
                }
            )}
        </div>
    )
}