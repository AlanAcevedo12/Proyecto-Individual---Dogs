import React, { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getAllDogs, getDogByName, getDogByTemper } from "../../redux/actions/actions";
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
        dispatch(getDogByTemper(input.temperament));
        resetPagina(1);
    }

    return(
        <div className="NavBarDiv">
            <h1>Soy el nav</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="busqueda" value={input.busqueda} onChange={manejadorCambiosEstado}/>
                <button type="submit">Buscar</button>
            </form>
            <form onSubmit={(e) => filtrarPorTemperamento(e)}>
                <select name="temperament" onChange={manejadorCambiosEstado} defaultValue="Seleccionar Temperamento">
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
                <button type="submit">Filtrar</button>
            </form>
        </div>
    )
}
