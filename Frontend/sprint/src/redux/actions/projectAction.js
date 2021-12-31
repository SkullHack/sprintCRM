import {
  GET_PROJECTS,
  GET_PROJECT_DETAILS,
  DELETE_PROJECT,
  GET_RELATEDPROJECTS
} from "../constants/projectConstants";
import axios from "axios";

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/projects");
    dispatch({
      type: GET_PROJECTS,
      payload: response.data.projects,
    });
  } catch (err) {
    console.log("getProjects action error:", err);
  }
};

export const getProjectDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/projects/${id}`);
    dispatch({
      type: GET_PROJECT_DETAILS,
      payload: data.project,
    });
  } catch (err) {
    console.log("getProjectDetails action error:", err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/projects/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: data.success,
    });
  } catch (err) {
    console.log("deleteProject action error:", err);
  }
};

export const getSpecificProjects = (clientID) => async dispatch =>{
  try{
      const response = await axios.get(`/api/projects/clients/${clientID}`);
      dispatch({
          type: GET_RELATEDPROJECTS,
          payload: response.data.project
      });
  }catch(err){
      console.log('getSpecificProjects api error:', err);
  }
}
