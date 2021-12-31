import { GET_CONSULT_INFO,GET_RELATEDCONSULTSINFO } from "../constants/consultConstants";

const INITIAL_STATE = {
    ConsultInfos: []
};

export const consultancyInfoReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case GET_CONSULT_INFO:
            return{
                ConsultInfos: [...action.payload]
            };
        case GET_RELATEDCONSULTSINFO:
                return{
                    ConsultInfos: [...action.payload]
                };
        default:
            return state;
    }
};

 