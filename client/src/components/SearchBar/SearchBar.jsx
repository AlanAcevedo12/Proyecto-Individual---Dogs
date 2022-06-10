import React, { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs, getDogByApi, getDogByDb, getDogByName, getDogByTemper, orderDogs } from "../../redux/actions/actions";
import estilos from "./SearchBar.module.css";

export default function SearchBar({tempers, resetPagina}){
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
        if(e.target.value === "All Breeds") dispatch(getAllDogs());
        if(e.target.value === "Created Breeds") dispatch(getDogByDb());
        if(e.target.value === "API Breeds") dispatch(getDogByApi());
    }

    function orden(e){
        dispatch(orderDogs(e.target.value));
    }


    return(
        <div className={estilos.SearchBarDiv}>
            <form id={estilos.formBusqueda} onSubmit={(e) => handleSubmit(e)}>
                <button id={estilos.botonRefrescar} onClick={() => window.location.reload() } type="button">Refresh</button>
                <input id={estilos.inputBusqueda} type="text" name="busqueda" value={input.busqueda} 
                placeholder="Breed..." onChange={manejadorCambiosEstado} required/>
                <button id={estilos.botonBusqueda} type="submit">Search</button>
            </form>
            <select class={estilos.selectFiltro} name="temperament" onChange={filtrarPorTemperamento} defaultValue="Seleccionar Temperamento">
                    <option key="0">All</option>
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
            <select class={estilos.selectFiltro} name="FiltroRaza" onChange={filtroRaza} defaultValue="All Breeds">
                    <option>All Breeds</option>
                    <option>API Breeds</option>
                    <option>Created Breeds</option>
            </select>
            <select class={estilos.selectFiltro} name="Orden" onChange={orden}>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Weight Asc</option>
                <option>Weight Desc</option>
            </select>
            {/* <Link to="/create">
                <button name="Crear">Crear Perro</button>
            </Link> */}
        </div>
    )
}
