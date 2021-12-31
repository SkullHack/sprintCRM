import axios from 'axios';

export const addConsult = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post(
      "http://localhost:5000/consults",
      data,
      config
    );
  
    return response;
  };

  //add consult info frontend api added
  export const addConsultInfo = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post(
      "http://localhost:5000/consults/:id/consultInfo",
      data,
      config
    );
  
    return response;
  };

  export const searchConsultancyProjects = async () =>{
    const response = await axios.get('/consults/search/:consultTitle');
  
    return response;
  }

  //edit consultInfo Data
  export const editConsultInfo = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.put(
      "http://localhost:5000/consults/:id/consultInfo/:consultProjestID",
      data,
      config
    );
  
    return response;
  };  

  //delete ConsultInfo 
  export const deleteConsultInfo = async (consultInfo) => {
  
    const response = await axios.delete(
      "http://localhost:5000/api/auth/consults",
      { data: consultInfo }
    );

    return response;
  }; 

  //consult chat api
  export const postConversation = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post(
      "http://localhost:5000/consults/conversations",
      data,
      config
    );
  
    return response;
  };

  export const getclientconsulttitle = async (id) =>{
    const response = await axios.get('/client/ClientConsults/' + id);
  
    return response;
}