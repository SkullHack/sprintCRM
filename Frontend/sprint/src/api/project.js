import axios from "axios";

export const createNewProject = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:5000/api/projects/create",
    data,
    config
  );

  return response;
};

export const searchProjects = async () => {
  const response = await axios.get("/projects/search/:projectName");

  return response;
};
