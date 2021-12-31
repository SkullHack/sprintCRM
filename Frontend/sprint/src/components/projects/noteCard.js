import React from "react";
import Card from 'react-bootstrap/Card'
import "../stylesheets/stages.css";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

//The card to retrieve notes
 export const noteCard = ({note, deletenotefunction}) => {
    return(
    <div  className="text-center emp-stages-card-notee" >
        
            {/* <h6 className="card-txt"> */}
            
            {note.notesName}
            {/* <d className="notes-delete"> */}
                <DeleteOutlinedIcon className="notes-delete" onClick={deletenotefunction}></DeleteOutlinedIcon>
                
            {/* </h6> */}
        
    </div>
    )

 };

export default noteCard;