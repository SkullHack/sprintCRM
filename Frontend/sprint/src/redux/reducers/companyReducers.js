import { GET_COMPANIES, DELETE_COMPANY } from "../constants/clientConstants";

const INITIAL_STATE = {
    companies: []
};

const companyReducer = (state=INITIAL_STATE,action) => {
    switch (action.type){
        case GET_COMPANIES:
            return{
                companies: [...action.payload]
            };
        case DELETE_COMPANY:
            return{
                companies: state.companies.filter(company => company._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export default companyReducer;