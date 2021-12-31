import { GET_NOTES, DELETE_NOTE } from "../constants/noteConstants";

const INITIAL_STATE = {
    notes: []
};

const noteReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_NOTES:
            return{
                notes: [...action.payload]
            };
        case DELETE_NOTE:
            return{
                notes: state.notes.filter(note => note._id !== action.payload._id)
            };
        default:

            return state;

    }

};



export default noteReducer;