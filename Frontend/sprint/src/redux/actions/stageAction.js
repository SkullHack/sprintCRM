import { GET_STAGES, DELETE_STAGE, GET_ASSIGNED_STAGE } from "../constants/stageConstants";
import axios from "axios";

export const getStages = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/auth/stages");
    dispatch({
      type: GET_STAGES,
      payload: response.data.stage,
    });
  } catch (err) {
    console.log("getStages api error:", err);
  }
};

export const getSpecificStages = (stageId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/auth/stages?id=${stageId}`);
    dispatch({
      type: GET_STAGES,
      payload: response.data.stage,
    });
  } catch (err) {
    console.log("getClients api error:", err);
  }
};

export const deleteStage = (stageId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/auth/stages/stageId?id=${stageId}`
    );
    dispatch({
      type: DELETE_STAGE,
      payload: response.data,
    });
  } catch (err) {
    console.log("deleteStages api error", err);
  }
};

export const getAssignedStages = (projectId) => async dispatch =>{
  try{
      const response = await axios.get(`/api/auth/stages/findproject/projectId?id=${projectId}`);
      dispatch({
          type: GET_ASSIGNED_STAGE,
          payload: response.data.stage,
      });
  }catch(err){
      console.log('getEmployeeTickets api error:', err);
  }
}
