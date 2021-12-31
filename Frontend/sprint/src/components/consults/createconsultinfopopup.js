import React from "react";
import "../stylesheets/consults.css";


function createconsultinfopopup(props) {
     /****************************
   * popup which is ued for create consult information
   ****************************/
  
    return (props.trigger) ? (
        <div>
        {props.children}
        </div>
    ) : "";
}
  
export default createconsultinfopopup;