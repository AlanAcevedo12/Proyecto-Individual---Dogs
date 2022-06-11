import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllDogs, getAllGroups, getAllTempers} from "../../redux/actions/actions";

import CardContainer from "../CardContainer/CardContainer";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import estilos from "./Home.module.css";
import gifCargando from "../../resources/loadingDog.gif";

export default function Home(){
    document.title = "Henry Dogs - Home";
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const tempers = useSelector((state) => state.tempers);
    const breedGroups = useSelector((state) => state.breedGroups);

    const [paginaActual, setPaginaActual] = useState(1);
    const [cantidad, setCantidad] = useState(8);
    const indiceFinal = paginaActual * cantidad;
    const indicePrimero = indiceFinal - cantidad;
    const dogsItems = dogs.slice(indicePrimero, indiceFinal);

    function paginado(nroPagina){
        setPaginaActual(nroPagina);
    }

    React.useEffect(
        () => {
            dispatch(getAllDogs());
            dispatch(getAllTempers());
            dispatch(getAllGroups())
        }, [dispatch]
    );

    return(<div className={estilos.HomeDiv}>
            <NavBar />
            <SearchBar tempers={tempers} resetPagina={paginado} breedGroups={breedGroups}/>

        {dogs[0] ? (<><CardContainer dogs= {dogsItems} />
            <Paginado
                cantidad={cantidad}
                allDogs={dogs}
                paginado={paginado}
                paginaActual={paginaActual}/></>) : (<><h1 id={estilos.cargandoh1}>Loading...</h1><img id={estilos.cargando} src={gifCargando} /></>)}
        </div>)
}