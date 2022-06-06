import { GET_ALL_DOGS, GET_ALL_TEMPERS, GET_DOG_BY_NAME, GET_DOG_BY_TEMPER } from "../actions/actionsTypes";


const initialState = {
    dogsLoaded: [],     //Lista de perros cargados que vinieron de la API   NO CAMBIA
    dogs: [],           //Lista de perros que se muestan en home, va cambiando según se necesita. Ej: filtrar, buscar, etc.
    dog: {},
    tempers: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_DOGS:
            return {
                ...state,
                dogsLoaded: action.payload,
                dogs: action.payload
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_ALL_TEMPERS:
            //console.log("Obtenidos de la api",action.payload);
            return {
                ...state,
                tempers: action.payload
            }
        case GET_DOG_BY_TEMPER:
            return {
                ...state,
                dogs: state.dogsLoaded.filter(dog => {
                    if(dog.temperament)
                    return dog.temperament.includes(action.payload)
                })
            }
        default: return state;
    }
}

export default rootReducer;