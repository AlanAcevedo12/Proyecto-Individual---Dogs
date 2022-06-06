import React, { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getAllDogs, getDogByApi, getDogByDb, getDogByName, getDogByTemper, orderDogs } from "../../redux/actions/actions";
//import estilo from "./NavBar.module.css";

export default function NavBar({tempers, resetPagina}){
    const [input, setInput] = useState({busqueda:"", temperament:""});
    const dispatch = useDispatch();

    function manejadorCambiosEstado(e){
        setInput({[e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogByName(input.busqueda));
        resetPagina(1);
    }
    
    function filtrarPorTemperamento(e){
        e.preventDefault();
        dispatch(getDogByTemper(e.target.value));
        resetPagina(1);
    }

    function filtroRaza(e){
        if(e.target.value === "Razas Creadas") dispatch(getDogByDb());
        if(e.target.value === "Razas API") dispatch(getDogByApi());
    }

    function orden(e){
        dispatch(orderDogs(e.target.value));
    }

    return(
        <div className="NavBarDiv">
            <h1>Soy el nav</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="busqueda" value={input.busqueda} onChange={manejadorCambiosEstado}/>
                <button type="submit">Buscar</button>
            </form>
            <select name="temperament" onChange={filtrarPorTemperamento} defaultValue="Seleccionar Temperamento">
                    <option key="0">Seleccionar Temperamento</option>
                    {
                        tempers?.map(
                            (temp, i) => {
                                return(
                                    <option key={i}>{temp}</option>
                                )
                            } 
                        )
                    }
            </select>
            <select name="FiltroRaza" onChange={filtroRaza} defaultValue="Todos">
                    <option>Todos</option>
                    <option>Razas API</option>
                    <option>Razas Creadas</option>
            </select>
            <select name="Orden" onChange={orden}>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Peso Asc</option>
                <option>Peso Desc</option>
            </select>
        </div>
    )
}
