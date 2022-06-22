import React from "react";
import estilos from "./NavBar.module.css";
import {Link} from "react-router-dom";
import patas from "../../resources/patas.png"

export default function NavBar(){
    return(
        <nav id={estilos.navBar}>
            <div className={estilos.opciones}>
                <Link to="/home">
                    <h1 className={estilos.tituloId}>Home</h1>
                </Link>
                <img src={patas} className={estilos.patitas}/>
            </div>
            <div className={estilos.opciones}>
                <Link to="/create">
                    <h1 className={estilos.tituloId}>Create</h1>
                </Link>
            </div>
            <div className={estilos.opciones}>
            <img src={patas} className={estilos.patitas}/>
                <Link to="/about">
                    <h1 className={estilos.tituloId}>About</h1>
                </Link>
            </div>
        </nav>
    )
}
