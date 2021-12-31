

import React, { useEffect, useState, Fragment } from "react";
import { getTickets, getSpecificTickets } from "../redux/actions/ticketAction";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./stylesheets/Ticket.css";
import Adduser from "@material-ui/icons/PersonAdd";
import EmployeePopup from "./tickets/selectEmployeePopup";
import ViewPopup from "./tickets/viewTicket";
import Searchicon from "@material-ui/icons/Search";
import { getEmployees } from "../redux/actions/employeeAction";
import { assignEmployee } from "../api/tickets";
import Swal from "sweetalert2";
import { MDBIcon, MDBCardHeader } from "mdbreact";
import Gridwrapper from "../helpers/gridWrapper";
import ContentWrapper from "../helpers/contentWrapper";
import { isAuthenticated } from "../helpers/auth";

import NavigationbarL1 from "./sub/Navbar-L1";
import { NavigationbarTicketsL2 } from "./sub/Navbar-L2";
import { NavigationbarTicketsL3 } from "./sub/Navbar-L3";
import Sidebar from "./sub/Sidebar";

const Tickets = () => {
  const [tickets, setTicket] = useState("");

  const [search, setSearch] = useState("");

  // //for ticket retrieval

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);
  const { ticket } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const { employees } = useSelector((state) => state.employees);

  const filteredEmployees = employees.filter((employee) => {
    return employee.firstName.toLowerCase().includes(search.toLowerCase());
  });

  function getPriorityColor(priority1) {
    const priority = priority1;
    if (priority === "High")
      return { borderTop: "2px solid red", height: "250px" };
    else if (priority === "Medium")
      return { borderTop: "2px solid orange", height: "250px" };
    else return { borderTop: "2px solid green", height: "250px" };
  }

  /****************************
   * for popup management
   ****************************/
  const [buttonPopup, openPopup] = useState(false);

  const [viewTicketPopup, openViewTicketPopup] = useState(false);

  const [assignTicket, setAssignTicket] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const handleTicketChange = (evt) => {
    setIsChecked(!isChecked);
    setAssignTicket({
      ...assignTicket,
      [evt.target.name]: evt.target.value,
    });
  };

  const {
    //  ticketId = ticket._id,
    ticketId,
    receiverID,
  } = assignTicket;

  const assignSubmit = (evt) => {
    evt.preventDefault();

    if (!isChecked) {
      Swal.fire({
        // icon: 'error',
        title: "Oops...",
        text: "PLEASE SELECT AN EMPLOYEE",
      });
    } else {
      assignEmployee(assignTicket)
        .then((response) => {
          setAssignTicket({
            ticketId: "",
            receiverID: "",
          });

          Swal.fire({
            // icon: 'success',
            text: "TICKET ASSIGNED TO EMPLOYEE",
          });
          openPopup(false);

          // assignEmp = true;
          dispatch(getTickets());
          //  setAssignicon("<assigned/>");
        })

        .catch((err) => {});
    }
  };

  const [sortType, setSortType] = useState("");

  function handleChange(event) {
    setSortType(event.target.value);
    console.log("triggered");
    console.log(sortType, "this");
  }

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarTicketsL2 />
      <NavigationbarTicketsL3 />
      <Sidebar />
      <Gridwrapper>
        <ContentWrapper>
          <p
            style={{
              position: "absolute",
              marginTop: "0.3%",
              fontWeight: "bold",
            }}
          >
            Sort By
          </p>
          <select className="ticketdropdown" onChange={handleChange}>
            {console.log(sortType, "select")}
            <option className="ticket-item" value="">
              All
            </option>
            <option className="ticket-item" value="Handled">
              Handled
            </option>
            <option className="ticket-item" value="Open">
              Open
            </option>
            <option className="ticket-item" value="Pending">
              Pending
            </option>
          </select>

          {console.log(sortType, "sort")}

          <Row>
            {ticket
              .filter((priority) => priority.ticketStatus.includes(sortType))
              .map((tickets) => (
                <div
                  className="box box-down cyan"
                  style={getPriorityColor(tickets.priority)}
                  key={tickets._id}
                >
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openViewTicketPopup(true);
                      dispatch(getSpecificTickets(tickets._id));
                      setTicket(tickets);
                    }}
                  >
                    {tickets.ticketTitle}
                  </h5>
                  <p>
                    From:{" "}
                    {tickets.senderID.clientFirstName +
                      " " +
                      tickets.senderID.clientLastName}
                  </p>
                  <p>Type: {tickets.ticketType}</p>
                  {/* <p>Status : {tickets.ticketStatus}</p> */}
                  <p>
                    Assigned to:{" "}
                    {tickets.receiverID.firstName +
                      " " +
                      tickets.receiverID.lastName}
                  </p>
                  <div>
                    {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
                      <Adduser
                        style={{ float: "right", marginBottom:"20px" }}
                        id={tickets._id}
                        onClick={() => {
                          openPopup(true);
                          setAssignTicket(tickets);
                        }}
                      ></Adduser>
                    )}
                  </div>
                </div>
              ))}

            <EmployeePopup
              trigger={buttonPopup}
              setTrigger={openPopup}
              assignTicket={assignTicket}
              id={assignTicket.ticketId}
            >
              <div>
                <input
                  type="text"
                  placeholder="Search employees"
                  className="ticketboxSearch"
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
                <Searchicon />
              </div>
              {/* <p>{assignTicket._id}</p> */}
              {/* <div class="card border-primary mb-3" style="max-width: 18rem;"> */}
              {filteredEmployees?.length > 0 ? (
                <div className="ticket-employee-list">
                  {filteredEmployees.map((employee) => (
                    <div className="ticket-card-style card-header" key={employee._id}>
                      {employee.firstName + " " + employee.lastName + " "}
                      <input
                        type="radio"
                        name="receiverID"
                        id="receiverID"
                        checked={isChecked}
                        value={employee._id}
                        style={{ float: "right", marginTop: "5px" }}
                        onChange={handleTicketChange}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <i>No employees found</i>
                </div>
              )}

              <div>
                <button className="ticket-assign-btn" onClick={assignSubmit}>
                  Assign
                </button>
              </div>

              {/* </div> */}
            </EmployeePopup>

            <ViewPopup
              trigger={viewTicketPopup}
              setTrigger={openViewTicketPopup}
            >
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

                  <h4>{tickets.ticketTitle}</h4>
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
                    <thead >
                      <tr>
                        <th >Ticket Type</th>
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
                </div>
                <div></div>
              </form>
              <br></br>
              <br></br>
            </ViewPopup>
          </Row>
        </ContentWrapper>
      </Gridwrapper>
    </Fragment>
  );
};

export default Tickets;