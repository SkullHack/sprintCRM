import React, { useEffect, useState, Fragment } from "react";
import "../stylesheets/Ticket.css";
import { Row } from "react-bootstrap";
import { getEmployeeTickets } from "../../redux/actions/ticketAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../helpers/localStorage";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditTicketStatus from "./editTicketStatusDrawer";
import Swal from "sweetalert2";
import { assignEmployee } from "../../api/tickets";
import Assignment from "@material-ui/icons/Assignment";
import ViewPopup from "./viewTicket";
import { MDBIcon, MDBCardHeader } from "mdbreact";
import Gridwrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";

import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarTicketsL2 } from "../sub/Navbar-L2";
import { NavigationbarTicketsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";

const MyTickets = () => {
  let userDetails = getLocalStorage("employee");
  console.log(userDetails, "user");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeTickets(userDetails._id));
  }, [dispatch]);

  const { ticket } = useSelector((state) => state.ticket);

  const [editStausPopup, openEditStatusPopup] = useState(false);

  const [assignTicketStatus, setAssignTicketStatus] = useState("");

  const [viewTicketPopup, openViewTicketPopup] = useState(false);

  const [tickets, setTicket] = useState("");

  const handleStatusChange = (evt) => {
    setAssignTicketStatus({
      ...assignTicketStatus,
      [evt.target.name]: evt.target.value,
    });
  };

  const { ticketId = ticket._id, ticketStatus } = assignTicketStatus;

  const assignSubmit = (evt) => {
    evt.preventDefault();

    Swal.fire({
      title: "Set ticket status as Handled?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        assignEmployee(assignTicketStatus)
          .then((response) => {
            Swal.fire("Ticket Status changed!", "success");
            dispatch(getEmployeeTickets(userDetails._id));
          })
          .catch((err) => {
            Swal.fire("Cancelled", "error");
          });
      }
    });
  };

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarTicketsL2 />
      <NavigationbarTicketsL3 />
      <Sidebar />
      <Gridwrapper>
        <ContentWrapper>
          <Row>
            {ticket.map((tickets) => (
              <div className="box box-down cyan" key={tickets._id}>
                {/* <p>{tickets._id}</p> */}
                <h2>{tickets.ticketTitle}</h2>
                <p>
                  From:{" "}
                  {tickets.senderID.clientFirstName +
                    " " +
                    tickets.senderID.clientLastName}
                </p>
                <p>Type: {tickets.ticketType}</p>
                <p>Status: {tickets.ticketStatus}</p>
                <div className="ticketassignIcon" style={{ display: "inline-block" }}>
                  <Assignment
                    onClick={() => {
                      openViewTicketPopup(true);
                      // dispatch(getSpecificTickets(tickets._id));
                      setTicket(tickets);
                    }}
                  />
                  <AssignmentTurnedInIcon
                    onClick={() => {
                      openEditStatusPopup(true);
                      setAssignTicketStatus(tickets);
                    }}
                  />
                </div>
              </div>
            ))}
          </Row>

          <EditTicketStatus
            trigger={editStausPopup}
            setTrigger={openEditStatusPopup}
            assignTicketStatus={assignTicketStatus}
          >
            {/* <h2 className="heading-edit">Change Status:</h2> */}
            <div className="ticket-popup-adjust">
              <select
                className="form-select"
                name="ticketStatus"
                aria-label="Default select example"
                value={ticketStatus}
                onChange={handleStatusChange}
              >
                <option value="Open">Open</option>
                <option value="Handled">Handled</option>
              </select>
              <div className="ticket-product-price-btn">
                <button onClick={assignSubmit}>Change</button>
              </div>
            </div>
          </EditTicketStatus>

          <ViewPopup trigger={viewTicketPopup} setTrigger={openViewTicketPopup}>
            <form>
              <div className="stage-align">
                <center>
                  <MDBCardHeader className="form-header1 deep-blue-gradient rounded">
                    <h3 className="my-3 heading">
                      <MDBIcon icon="lock" /> Ticket Details
                    </h3>
                  </MDBCardHeader>
                </center>
                <br></br>

                <h3>{tickets.ticketTitle}</h3>
                <textarea
                  name=""
                  value={tickets.ticketDetails}
                  className="ticket-details form-control"
                  readOnly="readOnly"
                  style={{cursor:"auto"}}
                />
              </div>
              <div className="ticket-satge-details">
                <table style={{ borderSpacing: "2em" }}>
                  <thead>
                    <tr>
                      <th>Ticket Type</th>
                      <th>Ticket Status</th>
                      <th>Ticket priority</th>
                    </tr>

                    <tr style={{ marginTop: "2em" }}>
                      <td>
                        <input
                          name=""
                          value={tickets.ticketType}
                          readOnly="readOnly"
                          className="drop"
                          style={{cursor:"auto"}}
                        />
                      </td>
                      <td>
                        <input
                          name=""
                          value={tickets.ticketStatus}
                          readOnly="readOnly"
                          className="drop"
                          style={{cursor:"auto"}}
                        />
                      </td>
                      <td>
                        <input
                          name=""
                          value={tickets.priority}
                          readOnly="readOnly"
                          className="drop"
                          style={{cursor:"auto"}}
                        />
                      </td>
                    </tr>
                  </thead>
                </table>
              </div>

              <div>
                {/* <button type="submit" className='submit-btn' >SUBMIT</button> */}
              </div>
              <div></div>
            </form>
            <br></br>
            <br></br>
          </ViewPopup>
        </ContentWrapper>
      </Gridwrapper>
    </Fragment>
  );
};

export default MyTickets;

