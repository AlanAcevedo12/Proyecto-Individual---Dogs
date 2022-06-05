import {React} from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div className="LandingDiv">
            <h1>LANDING</h1>
            <Link to="/home">
                <button>Ingresar al sitio</button>
            </Link>
        </div>
    )
}