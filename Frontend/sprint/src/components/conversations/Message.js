import React from "react";
import "../stylesheets/message.css";
import { format } from "timeago.js";

export default function Message({message, own}){

    return(
        <div className={own ? "message own" : "message"}>
            {/* these are the messages included in main */}
            <div className="messageTop">
            <img className="messageImg" 
            src="https://i.ibb.co/28gtPJ2/pexels-photo-6894059.jpg" 
            alt="custom-image"/>
            <p className="messageText">
                {message.text}
            </p>
            </div>
            <div className="messageBottom">
                {/*displaying time in chat format instead of how stored in database */}
                {format(message.createdAt)}
            </div>
        </div>
    );
}