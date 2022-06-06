import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllDogs, getAllTempers} from "../../redux/actions/actions";

import CardContainer from "../CardContainer/CardContainer";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";

export default function Home(){
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const tempers = useSelector((state) => state.tempers);

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
        }, [dispatch]
    );

    if(dogs){
        return(
            <div className="HomeDiv">
                <h1>HOME :D</h1>
                <NavBar tempers={tempers} resetPagina={paginado}/>
                <CardContainer dogs= {dogsItems} />
                <Paginado
                    cantidad={cantidad}
                    allDogs={dogs}
                    paginado={paginado}
                    paginaActual={paginaActual} />
            </div>
        )
    }
}