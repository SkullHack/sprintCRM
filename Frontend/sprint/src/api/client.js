import axios from "axios";

export const getClients = async (data) => {
  const response = await axios.get("api/auth/clients/clients", data);

  return response;
};

export const getCompanies = async () => {
  const response = await axios.get("/clients/company");
  return response;
};

/*******************used for chat******************** */
export const getClientChat = async (userid) =>{
  const response = await axios.get('/clients/' + userid)

  return response;
}



export const searchCompanies = async () => {
  const response = await axios.get("/clients/search/:companyName");

  return response;
};

export const addCompany = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/clients/company",
    data,
    config
  );

  return response;
};

export const addClient = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/clients",
    data,
    config
  );

  return response;
};


  export const editCompany = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.put(
      "http://localhost:5000/api/auth/clients/company",
      data,
      config
    );
  
    return response;
  };  

  export const editClient = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.put(
      "http://localhost:5000/api/auth/clients",
      data,
      config
    );
  
    return response;
  };  

  export const uploadImagetoCloudinary = async (logo) => {
    const data = new FormData()
    data.append("file", logo)
    data.append("upload_preset", "sprintCRM")
    data.append("cloud_name", "sd08images")

    const response = await fetch("https://api.cloudinary.com/v1_1/sd08images/image/upload",{
      method:"post",
      body:data
    })

    return response;
  };
