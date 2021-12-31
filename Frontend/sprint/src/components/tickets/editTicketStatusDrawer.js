import React from "react";
import CloseIcon from"@material-ui/icons/CloseRounded";
import "../stylesheets/Ticket.css";


function editTicketStatus(props) {
  
    return (props.trigger) ? (
        <div className=" popup_edit">
     
            <div className="wrapper popup-inner-edit">
            {/* <div class="wrapper"> */}
                <div className="product-img">
                    <img src="https://i.ibb.co/Ks6RM4V/edited1.jpg" alt="background" height="420" width="430"/>
            {/* </div> */}
                </div>
                <div className="product-info">
      <div className="product-text">
      <button className="close-btn" style={{background:"linear-gradient(to right, rgba(48, 207, 208, 0.5), rgba(51, 8, 103, 0.5))"}} onClick={() => props.setTrigger(false)}>
                    <CloseIcon></CloseIcon>
                </button>
        <h1>Change Status</h1>
        {/* <h2>by studio and friends</h2> */}
        {props.children}
      </div>
      {/* <div class="product-price-btn">
        <p><span>78</span>$</p>
        <button type="button">buy now</button>
      </div> */}
     
    </div>
  
              
                
            </div>
        </div>
    ) : "";
}
  
export default editTicketStatus;