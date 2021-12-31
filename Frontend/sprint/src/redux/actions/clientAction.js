import { GET_COMPANIES, GET_CLIENTS, DELETE_CLIENT, DELETE_COMPANY , GET_ALLCLIENTS} from "../constants/clientConstants";
import axios from 'axios';


export const getCompanies = () => async dispatch =>{
    try{
        const response = await axios.get('clients/company');
        dispatch({
            type: GET_COMPANIES,
            payload: response.data.companies
        });
    }catch(err){
        console.log('getCompanies api error:', err);
    }
}

export const getClients = (companyId) => async dispatch =>{
    try{
        const response = await axios.get(`clients?id=${companyId}`);
        dispatch({
            type: GET_CLIENTS,
            payload: response.data.clients
        });
    }catch(err){
        console.log('getClients api error:', err);
    }
}

export const deleteClient = clientId => async dispatch => {
    try{
        const response = await axios.delete(`clients/clientId?id=${clientId}`);
        dispatch({
            type: DELETE_CLIENT,
            payload: response.data,
        });
    }catch(err){
        console.log('deleteClient api error', err);
    }
};

export const deleteCompany = companyId => async dispatch => {
    try{
        const response = await axios.delete(`clients/companyId?id=${companyId}`);
        dispatch({
            type: DELETE_COMPANY,
            payload: response.data,
        });
    }catch(err){
        console.log('deleteCompany api error', err);
    }
};

// client retrieval for consults
export const getAllClients = () => async dispatch =>{
    try{
        const response = await axios.get('clients/clients');
        dispatch({
            type: GET_ALLCLIENTS,
            payload: response.data.clients
        });
    }catch(err){
        console.log('getAllClients api error:', err);
    }
}


