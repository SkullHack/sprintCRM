import React from "react";
import CloseIcon from"@material-ui/icons/CloseRounded";
import "../stylesheets/stages.css";

//Popup for add stages
function addProjectPopup(props) {
  
    return (props.trigger) ? (
        <div className="popupadd">
            {/* <div className="popup-inneradd"> */}
            <br></br>
                <button className="close-btn1add" onClick={() =>{ props.setTrigger(false) ; window.location.reload(false)}}>
                    <CloseIcon></CloseIcon>
                </button>
                {props.children}
            </div>
        // </div>
    ) : "";
}
  
export default addProjectPopup;