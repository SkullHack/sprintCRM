import React from "react";
import CloseIcon from"@material-ui/icons/CloseRounded";
import "../stylesheets/Ticket.css";

function EmployeePopup(props) {
 
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() =>{ props.setTrigger(false)}}>
                    <CloseIcon></CloseIcon>
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}
 
export default EmployeePopup;   