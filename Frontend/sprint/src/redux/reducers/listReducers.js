import { GET_LISTS } from "../constants/noteConstants";

const INITIAL_STATE = {
    lists: []
};

const listReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_LISTS:
            return{
                lists: [...action.payload]
            };
        default:

            return state;

    }

};



export default listReducer;