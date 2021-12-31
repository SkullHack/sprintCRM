import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import companyReducer from "./reducers/companyReducers";
import clientReducer from "./reducers/clientReducers";
import stageReducer from './reducers/stageReducers';
import noteReducer from './reducers/noteReducers';
import listReducer from './reducers/listReducers';
import {
  projectReducer,
  projectDetailsReducer,
  projectDeleteAndUpdateReducer,
} from "./reducers/projectReducer";
import ticketReducer from "./reducers/ticketReducer";
import employeeReducer from "./reducers/employeeReducers";

import { consultancyProjectsReducers, consultDetailsReducer} from "./reducers/consultancyProjectReducers";
import {consultancyInfoReducer} from "./reducers/consultancyInfoReducer";

const reducer = combineReducers({
  companies: companyReducer,
  clients: clientReducer,
  projects: projectReducer,
  projectDetails: projectDetailsReducer,
  projectDeleteAndUpdate: projectDeleteAndUpdateReducer,
  ticket:ticketReducer,
  employees: employeeReducer,
  
  consultancyProjects: consultancyProjectsReducers,
  consult: consultDetailsReducer,
  ConsultInfos: consultancyInfoReducer,
  stage: stageReducer,
    notes: noteReducer,
    lists: listReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
