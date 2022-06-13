import React from "react";
import estilo from "./DogCard.module.css";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyDog } from "../../redux/actions/actions";

export default function DogCard({dog}){
    const dispatch = useDispatch();
    //console.log(dog);
    if(!dog.hasOwnProperty("image") || dog.image.length === 0) dog.image =  "https://s2.coinmarketcap.com/static/img/coins/200x200/14447.png";
    //
    if(!dog.hasOwnProperty("temperament")) dog.temperament = "No associated temperaments";
    return(
        <div className={estilo.DogCardDiv}>
            <div id={estilo.contenedorImg}>
                <img id={estilo.imagenId} src={dog.image} alt="Fotito Perrito" />
            </div>
            <h1 id={estilo.nombreId}>{dog.name}</h1>
            <span class={estilo.datos}>{dog.breed_group ? dog.breed_group : "Unknown"}</span>
            <div id={estilo.divDatos}>
                <div class={estilo.datosYTitulo}>
                   <span class={estilo.tituloDatos}>Temperament:</span>
                    <span class={estilo.datos}> {!dog.temperament.length > 40 ? dog.temperament : dog.temperament.slice(0, 40)+" ..."}</span> 
                </div>
                
                <br />
                {/* <p class={estilo.datos}>Weight:</p> */}
                <div class={estilo.datosYTitulo}>
                    <span class={estilo.tituloDatos}>Weight:</span>
                    <span class={estilo.datos}> {dog.weight[0]} - {dog.weight[1]} KG</span>
                </div>
                
            </div>
            <Link to={`/detail/${dog.id}`} id={estilo.aDetalles} onClick={() => dispatch(emptyDog())}><p>See more...</p></Link>
        </div>
    )
}

/*
    if(!dog.hasOwnProperty("temperament") && dog.hasOwnProperty("tempers")){
        dog.temperament = []
        dog.tempers.map((t) => dog.temperament.push(t.name));
        dog.temperament = dog.temperament.join(", ");
    }
    */