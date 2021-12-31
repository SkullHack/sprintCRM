import React from "react";
import CloseIcon from"@material-ui/icons/CloseRounded";
import "../stylesheets/consults.css";

function editConsultInfoPopup(props) {
    
     /****************************
   * pop up which is used to edit
   ****************************/
  
    return (props.trigger) ? (
        <div className="emp-consults-popup-edit">
            <div className="emp-consults-popup-inner-edit">
                <button className="emp-consults-close-btn" onClick={() => props.setTrigger(false)}>
                    <CloseIcon></CloseIcon>
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}
  
export default editConsultInfoPopup;