import { GET_EMPLOYEES } from "../constants/consultConstants";
import { GET_CONSULTANCYPROJECTS } from "../constants/consultConstants";
import { GET_CONSULT_DEATILS,GET_RELATEDCONSULTSINFO } from "../constants/consultConstants";
import { GET_CONSULT_INFO, DELETE_CONSULTANT, GET_RELATEDCONSULTS, GET_RELATEDCLIENTCONSULTS,GET_ALLCONSULTANCYPROJECTS} from "../constants/consultConstants";

import axios from "axios";

export const getEmployees = () => async dispatch =>{
    try{
        const response = await axios.get('consults/employee');
        dispatch({
            type: GET_EMPLOYEES,
            payload: response.data.employees
        });
    }catch(err){
        console.log('getEmployees api error:', err);
    }
}

export const getConsultancyProjects = () => async dispatch =>{
    try{
        const response = await axios.get('consults/projects');
        dispatch({
            type: GET_CONSULTANCYPROJECTS,
            payload: response.data.consultancyProjects
        });
    }catch(err){
        console.log('getConsultancyProjects api error:', err);
    }
}

export const getSpecificConsultations = (employeeId) => async dispatch =>{
    try{
        const response = await axios.get(`consults/projects/${employeeId}`);
        dispatch({
            type: GET_RELATEDCONSULTS,
            payload: response.data.consult
        });
    }catch(err){
        console.log('getRelatedConsultancyProjects api error:', err);
    }
}

export const getConsultDetails = (id) => async (dispatch) =>{
    try{
        const { data } = await axios.get(`${id}`);
        dispatch({
            type: GET_CONSULT_DEATILS,
            payload: data.consult,
        });
    }catch (err) {
        console.log("getConsultDetails:", err);
    }
}

export const getConsultInfo = (consultprojectId) => async dispatch =>{
    try{
        const response = await axios.get(`${consultprojectId}/consultInfo/${consultprojectId}`);
        //6117a4c3bf1b1636e4d5eee0
        //
        dispatch({
            type: GET_CONSULT_INFO,
            payload: response.data.ConsultInfos
        });
    }catch(err){
        console.log('getConsultInfo api error', err);
    }
}

export const deleteConsult = (consultId) => async dispatch=>{
    try{
        const response = await axios.delete(`${consultId}/consultid?id=${consultId}`);
        dispatch({
            type: DELETE_CONSULTANT,
            payload: response.data,
        
        });
    }catch(err){
        console.log('deleteConsult api error', err);
    }
};

//client consult view
export const getRelatedclientConsults = (id) => async (dispatch) =>{
    try{
        const response = await axios.get(`consults/projects/clientid?id=${id}`);
        dispatch({
            type: GET_RELATEDCLIENTCONSULTS,
            payload: response.data.consult,
        });
        // console.log("res" + response.data.consult);
    }catch (err) {
        console.log("getRelatedclientConsults:", err);
    }
}

export const getclientConsultInfo = (consultprojectId) => async dispatch =>{
    try{
        const response = await axios.get(`consults/projects/${consultprojectId}`);
        
        dispatch({
            type: GET_RELATEDCONSULTSINFO,
            payload: response.data.ConsultInfos
        });
    }catch(err){
        console.log('getclientConsultInfo api error', err);
    }
}

//for admin
export const getAllConsultancyProjects = () => async dispatch =>{
    try{
        const response = await axios.get('consults/projects');
        dispatch({
            type: GET_ALLCONSULTANCYPROJECTS,
            payload: response.data.consult
        });
    }catch(err){
        console.log('getAllConsultancyProjects api error:', err);
    }
}
