import { DELETE_STAGE, GET_STAGES, GET_ASSIGNED_STAGE } from "../constants/stageConstants";

const INITIAL_STATE = {
    stage: []
};

const stageReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_STAGES:
            return{
                stage: [...action.payload]
            };

            case DELETE_STAGE:
                return{
                    stage: state.stage.filter(stages => stages._id !== action.payload._id)
                };

            case GET_ASSIGNED_STAGE:
                    return{
                        stage: [...action.payload]
                };
        default:

            return state;

    }

};



export default stageReducer;