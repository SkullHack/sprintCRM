import React, { Fragment, useEffect, useState } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import NavBar_client from "../sub/NavBar_client";
import { NavigationbarClientTicketsL2 } from "../../components/sub/Navbar-L2";
import { NavigationbarClientL3 } from "../../components/sub/Navbar-L3";
import "../../components/stylesheets/clientTickets.css";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getClientTickets, getClientTicketsById } from "../../redux/actions/ticketAction";
import {
  MDBIcon,
  MDBCardHeader,
} from "mdbreact";
import ViewPopup from "../tickets/viewTicket";
import { Link } from "react-router-dom";
import AddTicketIcon from "@material-ui/icons/Add";
import {getLocalStorage} from "../../helpers/localStorage";




const ClientTickets = () => {
  let clientDetails = (getLocalStorage("client"));


  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getClientTickets(clientDetails._id));
  }, [dispatch]);

  const { ticket } = useSelector(state => state.ticket);

  const [viewTicketPopup, openViewTicketPopup] = useState(false);

  const [tickets, setTicket] = useState("");

  const [sortType, setSortType] = useState('');

  function handleChange(event){
    setSortType(event.target.value);
}


  return(
    <Fragment>
      <NavBar_client />
      <NavigationbarClientTicketsL2 />
      <NavigationbarClientL3 />
      <ClientSidebar />

      <div className="client-tickets-main">
        <div className="client-tickets-submain">
        <p style={{position:"absolute", marginTop:"0.3%", fontWeight:"bold"}}>Sort By</p>
          <select className="dropdown-clientTickets" onChange={handleChange}> 
        <option  className="clientItem" value="">All</option>
        <option className="clientItem" value="handled">Handled</option>
        <option className="clientItem" value="Open">Open</option>
        <option  className="clientItem"value="Pending">Pending</option>
      </select>
        <Row>
        {ticket.filter(priority => priority.ticketStatus.includes(sortType)).map(tickets => (
          <div className="client-tickets-box client-tickets-box-down client-tickets-cyan" key={tickets._id}>
            <h5 style={{textAlign:"center", cursor:"pointer"}} onClick={() => {
            openViewTicketPopup(true);
            dispatch(getClientTicketsById(tickets._id));
            setTicket(tickets);
          }}>{tickets.ticketTitle}</h5>
            <p>Status: {tickets.ticketStatus}</p>
            <p>Type: {tickets.ticketType}</p>
            <p>Assigned to: {tickets.receiverID.firstName + " " + tickets.receiverID.lastName}</p>
          </div>
           ))}
        </Row>
        <ViewPopup trigger={viewTicketPopup} setTrigger={openViewTicketPopup}>
        
      <form >

      <div className='client-tickets-align'>
        <center>
      <MDBCardHeader className="form-header1 deep-blue-gradient rounded">
                <h3 className="my-3 client-tickets-heading">
                  <MDBIcon icon="lock" /> Ticket Details
                </h3>
              </MDBCardHeader>
              </center>
        <br></br>
        
        <input type="text" value={tickets.ticketTitle} className="client-tickets-title" readOnly="readOnly"/>
        <textarea  name='' value={tickets.ticketDetails} className='client-tickets-details form-control' readOnly="readOnly"/>
      </div>
      <div className='client-ticketsatge-details'>
            <table style={{borderSpacing: "2em"}}>
            <thead>
              <tr>
                <th>Ticket Type</th>
                <th>Ticket Status</th>
                <th>Ticket priority</th>
               
              </tr>

              < tr style={{marginTop:"2em"}}>

                <td><input name='' value ={tickets.ticketType} readOnly="readOnly" className="client-tickets-drop" /></td>
                <td><input name='' value={tickets.ticketStatus} readOnly="readOnly" className="client-tickets-drop"/></td>
                <td><input name='' value={tickets.priority} readOnly="readOnly" className="client-tickets-drop"/></td>
              </tr>
              </thead>
            </table>
          </div>

<div >
</div>
<div></div>
</form>
      <br></br><br></br>
      </ViewPopup>
      <Link to={`/client/ClientTickets/create`}>

      <button  className="btn-addTicket">
          <AddTicketIcon></AddTicketIcon>
        </button>     
         </Link>
        </div>
      </div>

      
    </Fragment>
  );
};

export default ClientTickets;
