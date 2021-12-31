import axios from "axios";

export const registerUser = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    data,
    config
  );

  return response;
};

export const loginUser = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    data,
    config
  );

  return response;
};


export const ClientLoginUser = async (data) => {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
 
  const response = await axios.post(
    "http://localhost:5000/api/auth/login/client",
    data,
    config
  );
    console.log(response, "routes");
  return response;
};

//we are setting the config file and response to be posted through axios along with data
export const addTickets = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    "http://localhost:5000/api/auth/tickets/add",
    data,
    config
  );
  return response;
};

//addstages
export const addstage = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //adding stages
  const response = await axios.post(
    "http://localhost:5000/api/auth/addstage",
    data,
    config
  );

  return response;
};

//adding notes
export const note1 = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/notes",
    data,
    config
  );

  return response;
};

//adding list
export const lists = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/lists",
    data,
    config
  );

  return response;
};

//adding cards
export const cards = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/auth/cards",
    data,
    config
  );

  return response;
};

//editing stages
export const editStages = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(data, "DATA");
  const response = await axios.put(
    "http://localhost:5000/api/auth/stages/update",
    data,
    config
  );

  return response;
};  





export const getProjectManagers = async (data) => {
  const response = await axios.get("api/auth/employee/projectManager", data);

  return response;
};
