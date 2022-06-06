import React, {useState} from "react";

export default function Home({cantidad, allDogs, paginado, paginaActual}){
    //console.log(cantPaginas);
    const numeros = [];
    const [nroPagina, setNroPagina] = useState(1);
    const cantTotal = Math.ceil(allDogs.length / cantidad);

    console.log();

    for(let i = 1; i <=cantTotal; i++){
        numeros.push(i);
    }

    function paginadoHandler(n){
        if(n < 1 || n > cantTotal) return;
        paginado(n);
        setNroPagina(n);
    }

    return(
        <div className="PaginadoDiv">
            <h1>Pagina: {paginaActual}</h1>
            <div>
                <button name="Principio" onClick={() => paginadoHandler(1)}>Principio</button>
                <button name="Prev" onClick={() => paginadoHandler(paginaActual-1)}>Prev</button>
                {
                    numeros?.map(
                        (n) => {
                            if(n > paginaActual + 2 || n < paginaActual - 2){
                                return
                            }else{
                                return(
                                    <button onClick={() => paginadoHandler(n)}>{n}</button>
                                )
                            }
                        }
                    )
                }
                <button name="Next" onClick={() => paginadoHandler(paginaActual+1)}>Next</button>
                <button name="Final" onClick={() => paginadoHandler(cantTotal)}>Final</button>
            </div>
        </div>
    )
}