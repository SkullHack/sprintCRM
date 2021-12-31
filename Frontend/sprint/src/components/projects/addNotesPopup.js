import React from "react";
import CloseIcon from"@material-ui/icons/CloseRounded";
import "../stylesheets/stages.css";

//popup for add notes
function addNotesPopup(props) {
  
    return (props.trigger) ? (
        <div className="emp-stages-popup-notes">
            <div className="emp-stages-popup-inner-notes">
                <button className="emp-stages-close-btn" onClick={() =>{ props.setTrigger(false) }}>
                    <CloseIcon></CloseIcon>
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}
  
export default addNotesPopup;