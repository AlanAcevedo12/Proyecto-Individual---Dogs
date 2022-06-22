import React from "react";
import { useDispatch, useSelector } from "react-redux";
import estilos from "./DogDetails.module.css";
import NavBar from "../NavBar/NavBar"
import { deleteCreated, getDogById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import gifCargando from "../../resources/loadingDog.gif";

export default function DogDetails({id}){
    document.title = "Henry Dogs - Details";

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dog);
    
    React.useEffect(() => {
        dispatch(getDogById(id));
    },[dispatch]);

    if(!dog.image) dog.image =  "https://s2.coinmarketcap.com/static/img/coins/200x200/14447.png";
    if(!dog.origin) dog.origin = "No associated origin";
    if(!dog.temperament) dog.temperament = "No associated temperament";
    if(!dog.breed_group) dog.breed_group = "Unknown"
    console.log(dog);

    function deleteDogHandler(){
        const idRaza = id.slice(2);
        dispatch(deleteCreated(idRaza));
    }

    return(
        <div className={estilos.DogDetailsDiv}>
            <NavBar></NavBar>
            <div id={estilos.tituloDiv}><h1>Breed details</h1></div>
           {dog.name ? ( <div id={estilos.contenedor}>
                <h1 id={estilos.nombrePerro}>{dog.name}</h1>
                <img id={estilos.imagen} src={dog.image}/>
                <div id={estilos.contenedorDatos}>
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Breed group: </h2>
                        <h3 class={estilos.textoDato}>{dog.breed_group}</h3>
                    </div>
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Origin: </h2>
                        <h3 class={estilos.textoDato}>{dog.origin}</h3>
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
                    <div class={estilos.datos}>
                        <h2 class={estilos.tituloDato}>Temperaments: </h2>
                        <h3 class={estilos.textoDato}>{dog.temperament}</h3>
                    </div>
                </div>
                    {
                        id.includes("db") ? 
                        (
                            <div id={estilos.contenedorEdicion}>
                                <div class={estilos.botonesEdicion}><Link to="/home" class={estilos.linkDel}>
                                    <h2 id={estilos.delete} onClick={deleteDogHandler}>Delete</h2>
                                </Link></div>
                                <div class={estilos.botonesEdicion}><Link to={`/edit/${id}`} class={estilos.linkEdit}>
                                    <h2 id={estilos.delete}>Edit</h2>
                                </Link></div>
                            </div>
                        ) :
                        ""
                    }
                
            </div>) : (<><h1 id={estilos.cargandoh1}>Loading...</h1><img id={estilos.cargando} src={gifCargando} /></>)}
        </div>
    )
}