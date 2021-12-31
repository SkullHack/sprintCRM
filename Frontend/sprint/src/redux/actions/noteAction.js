import { DELETE_NOTE, GET_NOTES } from "../constants/noteConstants";
import axios from "axios";

export const getNotes = (empid) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/auth/stages/notes/empid?id=${empid}`);
    dispatch({
      type: GET_NOTES,
      payload: response.data.notes,
    });
  } catch (err) {
    console.log("getNotes api error:", err);
  }
};

export const deleteNotes = (noteid) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/auth/stages/notes/noteid?id=${noteid}`
    );
    dispatch({
      type: DELETE_NOTE,
      payload: response.data,
    });
  } catch (err) {
    console.log("deleteNotes api error", err);
  }
};
