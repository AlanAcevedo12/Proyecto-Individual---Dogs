import React, {useState} from "react";
import estilos from "./Paginado.module.css";

export default function Home({cantidad, allDogs, paginado, paginaActual}){
    
    const numeros = [];
    const [nroPagina, setNroPagina] = useState(1);
    const cantTotal = Math.ceil(allDogs.length / cantidad);

    for(let i = 1; i <=cantTotal; i++){
        numeros.push(i);
    }

    function paginadoHandler(n){
        if(n < 1 || n > cantTotal) return;
        paginado(n);
        setNroPagina(n);
    }

    return(
        <div className={estilos.PaginadoDiv}>
            {/* <h1>Pagina: {paginaActual}</h1> */}
            <div id={estilos.contenedorBotones}>
                <button className={estilos.botones} name="Principio" onClick={() => paginadoHandler(1)}>&lt;&lt;</button>
                <button className={estilos.botones} name="Prev" onClick={() => paginadoHandler(paginaActual-1)}>&lt;</button>
                {
                    numeros?.map(
                        (n, i) => {
                            if(n > paginaActual + 2 || n < paginaActual - 2){
                                return
                            }else{
                                return(
                                    <button className={paginaActual === n ? estilos.paginaActual : estilos.botones} 
                                    key={i} onClick={() => paginadoHandler(n)}>{n}</button>
                                )
                            }
                        }
                    )
                }
                <button className={estilos.botones} name="Next" onClick={() => paginadoHandler(paginaActual+1)}>&gt;</button>
                <button className={estilos.botones} name="Final" onClick={() => paginadoHandler(cantTotal)}>&gt;&gt;</button>
            </div>
        </div>
    )
}