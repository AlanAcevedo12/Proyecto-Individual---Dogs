import { GET_ALL_DOGS, GET_ALL_TEMPERS, GET_DOGS_BY_DB, GET_DOG_BY_NAME, GET_DOG_BY_TEMPER, GET_DOGS_BY_API, ORDER_DOGS, SET_DOG, GET_DOG_BY_ID, EMPTY_DOG, GET_ALL_GROUPS, GET_DOG_BY_GROUP } from "../actions/actionsTypes";


const initialState = {
    dogsLoaded: [],     //Lista de perros cargados que vinieron de la API   NO CAMBIA
    dogs: [],           //Lista de perros que se muestan en home, va cambiando según se necesita. Ej: filtrar, buscar, etc.
    dog: {},
    tempers: [],
    breedGroups: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_DOGS:
            let ordenado = action.payload.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
            return {
                ...state,
                dogsLoaded: ordenado,
                dogs: ordenado
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
            if(action.payload === "All"){
                let ordenado = state.dogsLoaded.sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0;
                });
                return {
                    ...state, 
                    dogs: ordenado
                }
            }
            return {
                ...state,
                dogs: state.dogsLoaded.filter(dog => {
                    if(dog.temperament){
                        return dog.temperament.includes(action.payload);
                    }
                })
            }
        case GET_DOGS_BY_DB:
            return {
                ...state,
                dogs: state.dogsLoaded.filter(dog => {
                    if(typeof dog.id === "string")
                    return dog.id.includes(action.payload)
                })
            }
        case GET_DOGS_BY_API:
            return {
                ...state,
                dogs: state.dogsLoaded.filter(dog => {
                    return typeof dog.id !== "string"
                })
            }
        case ORDER_DOGS:
            if(action.payload === "A-Z"){
                let ordenado = state.dogs.sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0;
                });
                //console.log(ordenado);
                return {
                    ...state,
                    dogs: ordenado.filter(o => "a" === "a")
                }
            }
            if(action.payload === "Z-A"){
                let ordenado = state.dogs.sort((a, b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 0;
                });
                return {
                    ...state,
                    dogs: ordenado.filter(o => "a" === "a")
                }
            }
            if(action.payload === "Weight Asc"){
                let ordenado = state.dogs.sort((a, b) => {
                    a = (parseInt(a.weight[0]) + parseInt(a.weight[1])) / 2;
                    b = (parseInt(b.weight[0]) + parseInt(b.weight[1])) / 2;
                    if(!a)  a=100;
                    if(!b) b=100;
                    if(a > b) return 1;
                    if(a < b) return -1;
                    return 0;
                });
                return {
                    ...state,
                    dogs: ordenado.filter(o => "a" === "a")
                }
            }
            if(action.payload === "Weight Desc"){
                let ordenado = state.dogs.sort((a, b) => {
                    a = (parseInt(a.weight[0]) + parseInt(a.weight[1])) / 2;
                    b = (parseInt(b.weight[0]) + parseInt(b.weight[1])) / 2;
                    if(!a)  a=100;
                    if(!b) b=100;
                    if(a < b) return 1;
                    if(a > b) return -1;
                    return 0;
                });
                return {
                    ...state,
                    dogs: ordenado.filter(o => "a" === "a")
                }
            }
        case SET_DOG:
            return {
                ...state,
                dog: action.payload
            }
        case GET_DOG_BY_ID:
            return {
                ...state,
                dog: action.payload
            }
        case EMPTY_DOG:
            return {
                ...state,
                dog: action.payload
            }
        case GET_ALL_GROUPS:
            return{
                ...state,
                breedGroups: action.payload
            }
        case GET_DOG_BY_GROUP:
            if(action.payload === "All"){
                let ordenado = state.dogsLoaded.sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0;
                });
                return {
                    ...state, 
                    dogs: ordenado
                }
            }
            return {
                ...state,
                dogs: state.dogsLoaded.filter(dog => {
                    if(dog.breed_group){
                        return dog.breed_group.includes(action.payload);
                    }
                })
            }
        default: return state;
    }
}

export default rootReducer;