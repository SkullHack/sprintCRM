import axios from "axios";
import { GET_EMPLOYEES } from "../constants/ticketConstant";

export const getEmployees = () => async dispatch =>{
    try{
        const response = await axios.get('tickets/employees');
        dispatch({
            type: GET_EMPLOYEES,
            payload: response.data.employees
        });
    }catch(err){
        console.log('getEmployees api error:', err);
    }
}