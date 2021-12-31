import { GET_TICKETS, GET_EMPLOYEETICKET, GET_CLIENTTICKET, GET_CLIENTTICKETBYID} from "../constants/ticketConstant";

const INITIAL_STATE = {
    ticket: []
};

const ticketReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_TICKETS:
            return{
                ticket: [...action.payload]
            };
        case GET_EMPLOYEETICKET:
            return{
                ticket: [...action.payload]
            };
        case GET_CLIENTTICKET:
            return{
                ticket: [...action.payload]
            };
        case GET_CLIENTTICKETBYID:
            return{
                ticket: [...action.payload]
            };
        default:
            return state;

    }

};



export default ticketReducer;