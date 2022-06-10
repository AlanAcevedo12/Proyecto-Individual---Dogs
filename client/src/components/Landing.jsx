import {React} from "react";
import { Link } from "react-router-dom";
import estilos from "./Landing.module.css"
import fondo from "../resources/cachorros2.jpg";

export default function Landing(){
    return(
        <div className={estilos.divLanding}>
            <div id={estilos.contenedor}>
                <h1>LANDING</h1>
                <Link to="/home">
                    <button id={estilos.botonIngreso}>Enter the site</button>
                </Link>
            </div>
            
        </div>
    )
}