import {React} from "react";
import NavBar from "../NavBar/NavBar";
import estilos from "./About.module.css";

export default function About(){
    const texto1 = "¡Hola! Mi nombre es Alan Acevedo, estudiante de programación web fullstack en soyHenry.";
    const texto2 = " Este sitio web fue creado como proyecto individual durante la cursada. Es una S.P.A. sobre razas de perros."+
    " En la misma se pueden listar todas las razas disponibles en la API original, ordenarlas, filtrarlas y también crear tu propia raza.";
    const texto3 = "Consta de 4 partes principales: El landing, la cual es la pantalla de ingreso al sitio; el Home, en "+ 
    "el cual se listan los perros y se realiza el"+ 
    "filtrado/ordenamiento; la sección de creación de razas, en la cual se ingresan los datos para crear tu propia raza"+
    " incluyendo altura, peso, origen, expectatia de vida, etc;"+
    " y por último, la sección con los detalles de la raza que deseemos ver.";
    const texto4 = "Para su realización se utilizaron las siguientes tecnologías: ";

    return(
        <div className={estilos.createDiv}>
            <NavBar />
            <div id={estilos.contenedorTitulo}>
                <h1>About</h1>
            </div>
            <div id={estilos.contenedorTexto}>
                <p id={estilos.texto}>{texto1}</p>
                <p id={estilos.texto}>{texto2}</p>
                <p id={estilos.texto}>{texto3}</p>
                <p id={estilos.texto}>{texto4}</p>
                <ul id={estilos.lista}>
                    <li>Frontend: React, Redux, Css modules.</li>
                    <li>Backend: Express, sequelize.</li>
                    <li>Base de datos: Postgres.</li>
                </ul>
            </div>
        </div>
    )
}