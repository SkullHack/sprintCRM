import { GET_EMPLOYEES } from "../constants/ticketConstant";
//import { GET_EMPLOYEES } from "../constants/consultConstants";

const INITIAL_STATE = {
    employees: []
};

const employeeReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_EMPLOYEES:
            return{
                employees: [...action.payload]
            };
        default:
            return state;
    }
};

export default employeeReducer;