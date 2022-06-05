import { GET_ALL_DOGS } from "../actions/actionsTypes";


const initialState = {
    dogs: [],
    dog: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        default: return state;
    }
}

export default rootReducer;