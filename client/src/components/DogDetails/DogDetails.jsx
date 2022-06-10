import React from "react";
import { useDispatch, useSelector } from "react-redux";
import estilos from "./DogDetails.module.css";
import NavBar from "../NavBar/NavBar"
import { getDogById } from "../../redux/actions/actions";
import gifCargando from "../../resources/loadingDog.gif";

export default function DogDetails({id}){
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dog);
    
    React.useEffect(() => {
        dispatch(getDogById(id));
    },[dispatch]);

    if(!dog.hasOwnProperty("image")) dog.image =  "https://s2.coinmarketcap.com/static/img/coins/200x200/14447.png";

    return(
        <div className={estilos.DogDetailsDiv}>
            <NavBar></NavBar>
            <div id={estilos.tituloDiv}><h1>Breed details</h1></div>
           {dog.name ? ( <div id={estilos.contenedor}>
                <h1 id={estilos.nombrePerro}>{dog.name}</h1>
                <img id={estilos.imagen} src={dog.image}/>
                <div id={estilos.contenedorDatos}>
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Temperaments: </h2>
                        <h3 class={estilos.textoDato}>{dog.temperament}</h3>
                    </div>
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Height: </h2>
                        <h3 class={estilos.textoDato}>{dog.height} Cm</h3>
                    </div>
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Weight: </h2>
                        <h3 class={estilos.textoDato}>{dog.weight} Kg</h3>
                    </div>
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Lifespan: </h2>
                        <h3 class={estilos.textoDato}>{dog.life_span}</h3>
                    </div>
                </div>
                
            </div>) : (<><h1 id={estilos.cargandoh1}>Loading...</h1><img id={estilos.cargando} src={gifCargando} /></>)}
        </div>
    )
}