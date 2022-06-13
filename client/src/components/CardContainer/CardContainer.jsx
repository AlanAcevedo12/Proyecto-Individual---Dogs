import React, {useState} from "react";
import DogCard from "../DogCard/DogCard";
import estilo from "./CardContainer.module.css";


export default function CardContainer({dogs}){
    return(
        <div className={estilo.CardContainerDiv}>
            <div id={estilo.contenedorTitulo}>
                <h1 id={estilo.tituloId}>Dog breeds</h1>
            </div>
            {Array.isArray(dogs) ? dogs.map(
                (dog, i) => {
                    return <DogCard key={i} dog={dog}/>
                }
            ) : <DogCard dog={dogs}/>}

        </div>
    )
}