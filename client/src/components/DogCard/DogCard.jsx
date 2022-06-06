import React from "react";
import estilo from "./DogCard.module.css";

export default function DogCard({dog}){
    //console.log(dog);
    if(!dog.hasOwnProperty("image")) dog.image = {url: "https://s2.coinmarketcap.com/static/img/coins/200x200/14447.png"};
    if(!dog.hasOwnProperty("temperament") && dog.hasOwnProperty("tempers")){
        dog.temperament = []
        dog.tempers.map((t) => dog.temperament.push(t.name));
        dog.temperament = dog.temperament.join(", ");
    }
    return(
        <div className={estilo.DogCardDiv}>
            <h1 id={estilo.nombreId}>{dog.name}</h1>
            <img id={estilo.imagenId} src={dog.image.url} alt="Fotito Perrito" />
            <p>{dog.temperament}</p>
            <p>PESO:</p>
            <p>{dog.weight.metric ? dog.weight.metric : dog.weight} KG</p>
        </div>
    )
}