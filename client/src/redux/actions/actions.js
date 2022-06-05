import { GET_ALL_DOGS } from "./actionsTypes";

export const getAllDogs = () => dispatch => {
    return fetch("http://localhost:3001/dogs")
        .then(respuesta => respuesta.json())
        .then(json => {return dispatch({type: GET_ALL_DOGS, payload: json})})
};