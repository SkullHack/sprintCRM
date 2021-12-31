import { GET_TICKETS, GET_EMPLOYEETICKET, GET_CLIENTTICKET, GET_CLIENTTICKETBYID } from '../constants/ticketConstant';
import axios from 'axios';

export const getTickets = () => async dispatch =>{
    try{
        const response = await axios.get('/tickets');
        dispatch({
            type: GET_TICKETS,
            payload: response.data.ticket
        });

    }catch(err){

        console.log('getTickets api error:', err);

    }

}

export const getSpecificTickets = (ticketId) => async dispatch =>{
    try{
        const response = await axios.get(`tickets?id=${ticketId}`);
        dispatch({
            type: GET_TICKETS,
            payload: response.data.ticket
        });
    }catch(err){
        console.log('getTickets api error:', err);
    }
}

export const getEmployeeTickets = (employeeId) => async dispatch =>{
    try{
        const response = await axios.get(`tickets/employeeId?id=${employeeId}`);
        dispatch({
            type: GET_EMPLOYEETICKET,
            payload: response.data.ticket
        });
    }catch(err){
        console.log('getEmployeeTickets api error:', err);
    }
}

export const getClientTickets = (clientId) => async dispatch =>{
    try{
        const response = await axios.get(`tickets/clientId?id=${clientId}`);
        dispatch({
            type: GET_CLIENTTICKET,
            payload: response.data.ticket
        });
    }catch(err){
        console.log('getClientTickets api error:', err);
    }
}

export const getClientTicketsById = (ticketid) => async dispatch =>{
    try{
        const response = await axios.get(`tickets?id=${ticketid}`);
        dispatch({
            type: GET_CLIENTTICKETBYID,
            payload: response.data.ticket
        });
    }catch(err){
    }
}

