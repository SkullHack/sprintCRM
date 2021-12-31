import axios from 'axios';

//to retrieve all conversations related to a given user id
export const getConversations = async (userID) =>{
    const response = await axios.get("/conversations/" + userID);
  
    return response;
}

//to retrive all messages in a given conversation
export const getMessages = async (currentChatID) =>{
    const response = await axios.get("/messages/" + currentChatID);
  
    return response;
}

export const postConversation = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post(
      "http://localhost:5000/conversations",
      data,
      config
    );
  
    return response;
  };

  export const postMessage = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const response = await axios.post(
      "http://localhost:5000/messages",
      data,
      config
    );
  
    return response;
  };

  /************used for chat*************** */
  export const getEmployeeChat = async (userid)=>{
    const response = await axios.get("/employees/" + userid);
  
    return response;
  }

  export const updateMessageStatus = async (data)=>{
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };

    const response = await axios.put(
        "http://localhost:5000/messages",
        data,
        config
    );

    return response;
};