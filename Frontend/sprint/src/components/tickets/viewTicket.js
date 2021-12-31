import React from "react";
import CloseIcon from"@material-ui/icons/CloseRounded";
import "../stylesheets/Ticket.css";

function ViewPopup(props) {
 
    return (props.trigger) ? (
        <div className="viewpopup">
            <div className="viewpopup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    <CloseIcon></CloseIcon>
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}
 
export default ViewPopup;   