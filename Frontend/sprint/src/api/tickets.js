import axios from "axios";

// //we are setting the config file and response to be posted through axios along with data
// export const AddTickets = async (data) =>{
//     const config = {
//       headers:{
//         'Content-Type' : 'application/json',
//       }
//     }
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/ticket/add" , data ,config
//     );
//     return response;
//   }

export const assignEmployee = async (data)=>{
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };

    const response = await axios.put(
        "http://localhost:5000/tickets/",
        data,
        config
    );

    return response;
};
  