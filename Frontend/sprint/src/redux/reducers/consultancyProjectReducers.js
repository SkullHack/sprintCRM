import { GET_CONSULTANCYPROJECTS, GET_CONSULT_DEATILS, GET_RELATEDCONSULTS,GET_RELATEDCLIENTCONSULTS,GET_ALLCONSULTANCYPROJECTS} from "../constants/consultConstants";
import { DELETE_CONSULTANT } from "../constants/consultConstants";

const INITIAL_STATE = {
    consultancyProjects: []
};

export const consultancyProjectsReducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case GET_RELATEDCONSULTS:
            return{
                consultancyProjects: [...action.payload]
            };
        case GET_CONSULTANCYPROJECTS:
            return{
                consultancyProjects: [...action.payload]
            };
        case DELETE_CONSULTANT:
             return{
                consultancyProjects: state.consultancyProjects.filter(consultancyProjects => consultancyProjects._id !== action.payload._id)
             };
            
            
        default:
            return state;
    }
};

//get consult details based on ID
export const consultDetailsReducer = (
    state = {
        //array name
        consult: [],
    },
    action
) => {
    switch(action.type){
        //consultConsstrants used
        case GET_CONSULT_DEATILS:
            return {
                consult: action.payload,
            };
        case GET_RELATEDCLIENTCONSULTS:
            return {
                consult: [...action.payload],
            };
        case GET_ALLCONSULTANCYPROJECTS:
            return {
                consult: [...action.payload],
            };
        case GET_RELATEDCONSULTS:
            return {
                consult: [...action.payload],
            };
        default:
                return state;
    }
};

