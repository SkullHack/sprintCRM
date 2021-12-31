import { GET_CLIENTS, DELETE_CLIENT , GET_ALLCLIENTS,  GET_SPECIFIC_CLIENT } from "../constants/clientConstants";

const INITIAL_STATE = {
    clients: []
};

const clientReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_CLIENTS:
            return{
                clients: [...action.payload]
            };
        case DELETE_CLIENT:
            return{
                clients: state.clients.filter(client => client._id !== action.payload._id)
            };
        // client retrieval for consults
        case GET_ALLCLIENTS:
            return{
                clients: [...action.payload]
            };

        default:
            return state;
    }
};

export default clientReducer;