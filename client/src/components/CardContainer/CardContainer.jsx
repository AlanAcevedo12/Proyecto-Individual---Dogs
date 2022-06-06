import React, {useState} from "react";
import DogCard from "../DogCard/DogCard";
import estilo from "./CardContainer.module.css";


export default function CardContainer({dogs}){

    return(
        <div className={estilo.CardContainerDiv}>
            <h1 id={estilo.tituloId}>soy un contenedor de perritos</h1>
            {Array.isArray(dogs) ? dogs.map(
                (dog, i) => {
                    return <DogCard key={i} dog={dog}/>
                }
            ) : <DogCard dog={dogs}/>}

        </div>
    )
}