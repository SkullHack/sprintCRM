import {
  GET_PROJECTS,
  GET_PROJECT_DETAILS,
  DELETE_PROJECT,
  GET_RELATEDPROJECTS
} from "../constants/projectConstants";

const INITIAL_STATE = {
  projects: [],
};

//get the project
export const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        projects: [...action.payload],
      };
      case GET_RELATEDPROJECTS:
        return{
          projects: [...action.payload]
        };
    default:
      return state;
  }
};

//get the project details
export const projectDetailsReducer = (
  state = {
    project: {},
  },
  action
) => {
  switch (action.type) {
    case GET_PROJECT_DETAILS:
      return {
        project: action.payload,
      };
    default:
      return state;
  }
};

//delete project and update project
export const projectDeleteAndUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT:
      return {
        ...state,
        isDeleted: action.payload,
      };

    default:
      return state;
  }
};
