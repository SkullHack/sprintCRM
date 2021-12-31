import React from "react";
import "../stylesheets/conversation.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser}){
 

    //to store the user details of other user
    //in a particular chat
    const [user, setUser] = useState("");

    useEffect(() => {
        const otherUserId = conversation.members.find((m) => m !== currentUser._id);

        const res1 = axios.get("/employees/" + otherUserId);
        const res2 = axios.get("/clients/company/" + otherUserId);
        const res3 = axios.get("/clients/" + otherUserId);
            
            axios.all([res1, res2, res3]).then(axios.spread((...responses) => {
              const responseOne = responses[0]
              const responseTwo = responses[1]
              const responseThree = responses[2]
              setUser(responseOne.data || responseThree.data.clients ||responseTwo.data);
            })).catch(errors => {
              // react on errors.
            })
      }, [currentUser, conversation]);

     
    return(
      
        <div className="conversation">
            {/* these are the conversation included in main */}
            <img className="conversationImg" 
            src={user.clientProfilePic ? user.clientProfilePic : "https://i.ibb.co/02zYzSV/pexels-stefan-stefancik-91227.jpg"  } 
            alt="custom-image"/>
            <div className="con_badge" style={{display: "inlineBlock"}}>
            <span className="conversationName"> {user.clientFirstName || user.companyName || user.firstName  }</span>
            </div>
        </div>
    )
}