import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_ALL_TEMPERS, GET_DOG_BY_TEMPER } from "./actionsTypes";
import axios from "axios";

const URL = "http://localhost:3001";

export const getAllDogs = () => dispatch => {
    return fetch(`${URL}/dogs`)
        .then(respuesta => respuesta.json())
        .then(json => {return dispatch({type: GET_ALL_DOGS, payload: json})})
};

export const getDogByName = (name) => dispatch => {
    return fetch(`${URL}/dogs?name=${name}`)
        .then(respuesta => respuesta.json())
        .then(json => {return dispatch({type: GET_DOG_BY_NAME, payload: json})})
    };

export const getAllTempers = () => dispatch => {
    return fetch(`${URL}/temperaments`)
    .then(respuesta => respuesta.json())
    .then(json => {return dispatch({type: GET_ALL_TEMPERS, payload: json})})
};

export const getDogByTemper = (temper) => {
    return {
        type: GET_DOG_BY_TEMPER,
        payload: temper
    }
}

// export const getAllDogs =  () => async dispatch => {
//     let json = await axios.get(`${URL}/dogs`)
//     return dispatch({
//         type: GET_ALL_DOGS,
//         payload:json.data
//     });
// };