import React, { useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import { getDogById, updateDog } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import estilos from "./Edit.module.css";

export default function Edit({id}){

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dog);

    const [input, setInput] = useState({name: "", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"",
    minLifeSpan:"", maxLifeSpan:"", image:"", origin:""});
    const [errores, setErrores] = useState({name: "", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"",
    minLifeSpan:"", maxLifeSpan:""});
    const [botonBloqueado, setBotonBloqueado] = useState("disabled");
    const [enviado, setEnviado] = useState(false);

    React.useEffect(
        () => {
            if(errores.name || errores.minHeight || errores.maxHeight || errores.minWeight || errores.maxWeight
            || errores.minLifeSpan || errores.maxLifeSpan){
                setBotonBloqueado("disabled");
            }else setBotonBloqueado("");
        }
    )
    
    React.useEffect(() => {
        dispatch(getDogById(id));
    },[dispatch]);

    function onChangeHandler(e){
        if(e.target.name === "minHeight" || e.target.name === "maxHeight") if(e.target.value < 0) return;
        if(e.target.name === "minWeight" || e.target.name === "maxWeight") if(e.target.value < 0) return;
        if(e.target.name === "minLifeSpan" || e.target.name === "maxLifeSpan") if(e.target.value < 0) return;
        setInput( {...input, [e.target.name]:e.target.value});
        setErrores(validar({name: e.target.name, value: e.target.value}, errores, input));
    }

    function onSubmitHandler(e){
        e.preventDefault();
        const dog = {id: ""};
        dog.id = id.slice(2);
        if(input.name) dog.name = input.name;
        if(input.minHeight && input.maxHeight) dog.height = [input.minHeight, input.maxHeight];
        if(input.minWeight && input.maxWeight)dog.weight = [input.minWeight, input.maxWeight];
        if(input.minLifeSpan && input.maxLifeSpan) dog.years = `${input.minLifeSpan} - ${input.maxLifeSpan} years`;
        if(input.image) dog.image = input.image;
        if(input.origin) dog.origin = input.origin;
        console.log(dog)
        dispatch(updateDog(dog));
        setEnviado(true);
    }

    return(
        <div className={estilos.createDiv}>
            <NavBar />
            <div id={estilos.contenedorTitulo}>
                <h1>Update Breed</h1>
            </div>
            {
            !enviado ? 
            (<form onSubmit={onSubmitHandler} class={estilos.formulario}>
                <div class={estilos.inputYLabel}>
                    <label>Breed name:</label>
                    <input class={errores.name ? estilos.inputCreateError : estilos.inputCreate} 
                    type="text" name="name" value={input.name} onChange={onChangeHandler} placeholder="Breed name..."/>
                    {errores.name && (<p class={estilos.indicador}>{errores.name}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Min height:</label>
                    <input type="number" name="minHeight" value={input.minHeight} onChange={onChangeHandler}
                    class={errores.minHeight ? estilos.inputCreateError : estilos.inputCreate} placeholder="Min height..."/>
                    {errores.minHeight && (<p class={estilos.indicador}>{errores.minHeight}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Max height:</label>
                    <input type="number" name="maxHeight" value={input.maxHeight} onChange={onChangeHandler}
                    class={errores.maxHeight ? estilos.inputCreateError : estilos.inputCreate} placeholder="Max height..."/>
                    {errores.maxHeight && (<p class={estilos.indicador}>{errores.maxHeight}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Min weight:</label>
                    <input type="number" name="minWeight" value={input.minWeight} onChange={onChangeHandler}
                    class={errores.minWeight ? estilos.inputCreateError : estilos.inputCreate} placeholder="Min weight..."/>
                    {errores.minWeight && (<p class={estilos.indicador}>{errores.minWeight}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Max weight:</label>
                    <input type="number" name="maxWeight" value={input.maxWeight} onChange={onChangeHandler}
                    class={errores.maxWeight ? estilos.inputCreateError : estilos.inputCreate} placeholder="Max weight..."/>
                    {errores.maxWeight && (<p class={estilos.indicador}>{errores.maxWeight}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Min lifespan:</label>
                    <input type="number" name="minLifeSpan" value={input.minLifeSpan} onChange={onChangeHandler}
                    class={errores.minLifeSpan ? estilos.inputCreateError : estilos.inputCreate} placeholder="Min lifespan..."/>
                    {errores.minLifeSpan && (<p class={estilos.indicador}>{errores.minLifeSpan}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Max lifespan:</label>
                    <input type="number" name="maxLifeSpan" value={input.maxLifeSpan} onChange={onChangeHandler}
                    class={errores.maxLifeSpan ? estilos.inputCreateError : estilos.inputCreate} placeholder="Max lifespan..."/>
                    {errores.maxLifeSpan && (<p class={estilos.indicador}>{errores.maxLifeSpan}</p>)}
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Origin:</label>
                    <input type="text" name="origin" value={input.origin} onChange={onChangeHandler}
                    class={estilos.inputCreate} placeholder="Origin..."/>
                </div>
                <div class={estilos.inputYLabel}>
                    <label>Image:</label>
                    <input type="text" name="image" value={input.image} onChange={onChangeHandler}
                    class={estilos.inputCreate} placeholder="Imgae url..."/>
                </div>
                <button id={botonBloqueado !== "disabled" ? estilos.boton : estilos.botonBloqueado} 
                type="submit" disabled={botonBloqueado}>Update breed</button>
            </form>)
            : (<div id={estilos.contenedorAgregado}><h1 id={estilos.tituloAgregado}>Updated succesfully</h1></div>)
            }
        </div>
    )
}

export function validar(input, errores, globalInput){
    if(errores[input.name]) errores[input.name] = "";
    switch(input.name){
        case "name":
            if(/[0-9]/.test(input.value)) errores.name = "Invalid name - Only A-z";
            if(/[@$?¡\-_]/.test(input.value)) errores.name = "Invalid name - Only A-z";
            break;
        case "minHeight":
            if(input.name === "minHeight"){
                if(parseInt(input.value) >= parseInt(globalInput.maxHeight))  errores.minHeight = "Min height must be less than max";
                else errores.minHeight = "";
                if(globalInput.maxHeight || input.value){
                    if(!globalInput.maxHeight)  errores.maxHeight = "Both heights must be filled"
                    if(!input.value)  errores.minHeight = "Both heights must be filled"
                }else{
                    errores.maxHeight = "";
                    errores.minHeight = "";
                }
            }
        case "maxHeight":
            if(input.name === "maxHeight"){
                if(parseInt(globalInput.minHeight) >= parseInt(input.value))  errores.maxHeight = "Max height must be greater than min";
                else errores.maxHeight = "";
                if(globalInput.minHeight || input.value){
                    if(!globalInput.minHeight)  errores.minHeight = "Both heights must be filled"
                    if(!input.value)  errores.maxHeight = "Both heights must be filled"
                }else{
                    errores.maxHeight = "";
                    errores.minHeight = "";
                }
            }
        case "minWeight":
            if(input.name === "minWeight"){
                if(parseInt(input.value) >= parseInt(globalInput.maxWeight))  errores.minWeight = "Min weight must be less than max";
                else errores.minWeight = ""; 
                if(globalInput.maxWeight || input.value){
                    if(!globalInput.maxWeight)  errores.maxWeight = "Both weights must be filled"
                    if(!input.value)  errores.minWeight = "Both weights must be filled"
                }else{
                    errores.maxWeight = "";
                    errores.minWeight = "";
                }
            }
            
        case "maxWeight":
            if(input.name === "maxWeight"){
                if(parseInt(globalInput.minWeight) >= parseInt(input.value))  errores.maxWeight = "Max weight must be greater than min";
                else errores.maxWeight = "";
                if(globalInput.minWeight || input.value){
                    if(!globalInput.minWeight)  errores.minWeight = "Both weights must be filled"
                    if(!input.value)  errores.maxWeight = "Both weights must be filled"
                }else{
                    errores.maxWeight = "";
                    errores.minWeight = "";
                }
            }
        case "minLifeSpan":
            if(input.name === "minLifeSpan"){
                if(parseInt(input.value) >= parseInt(globalInput.maxLifeSpan))  errores.minLifeSpan = "Min lifespan must be less than max";
                else errores.minLifeSpan = "";
                if(globalInput.maxLifeSpan || input.value){
                    if(!globalInput.maxLifeSpan)  errores.maxLifeSpan = "Both lifespans must be filled"
                    if(!input.value)  errores.minLifeSpan = "Both lifespans must be filled"
                }else{
                    errores.maxLifeSpan = "";
                    errores.minLifeSpan = "";
                }
            }
        case "maxLifeSpan":
            if(input.name === "maxLifeSpan"){
                if(parseInt(globalInput.minLifeSpan) >= parseInt(input.value))  errores.maxLifeSpan = "Max lifespan must be greater than min";
                else errores.maxLifeSpan = "";
                if(globalInput.minLifeSpan || input.value){
                    if(!globalInput.minLifeSpan)  errores.minLifeSpan = "Both lifespans must be filled"
                    if(!input.value)  errores.maxLifeSpan = "Both lifespans must be filled"
                }else{
                    errores.maxLifeSpan = "";
                    errores.minLifeSpan = "";
                }
            }
            if(!/[0-9]/.test(input.value) || /[@$?¡\-_]/.test(input.value)){
                if(errores[input.name] === "minHeight") errores[input.name] = "Invalid height - Only numbers";
                if(errores[input.name] === "maxHeight") errores[input.name] = "Invalid height - Only numbers";
                if(errores[input.name] === "minWeight") errores[input.name] = "Invalid weight - Only numbers";
                if(errores[input.name] === "maxWeight") errores[input.name] = "Invalid weight - Only numbers";
            }
            break;
    }
    return errores;
}