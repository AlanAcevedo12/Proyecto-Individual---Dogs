import React from "react";
import estilos from "./NavBar.module.css";
import {Link} from "react-router-dom";
import patas from "../../resources/patas.png"

export default function NavBar(){
    return(
        <nav id={estilos.navBar}>
            <div class={estilos.opciones}>
                <Link to="/home">
                    <h1 class={estilos.tituloId}>Home</h1>
                </Link>
                <img src={patas}/>
            </div>
            <div class={estilos.opciones}>
                <Link to="/create">
                    <h1 class={estilos.tituloId}>Create</h1>
                </Link>
            </div>
            <div class={estilos.opciones}>
            <img src={patas}/>
                <Link to="/about">
                    <h1 class={estilos.tituloId}>About</h1>
                </Link>
            </div>
        </nav>
    )
}
