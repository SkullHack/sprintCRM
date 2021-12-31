import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import Home from "@material-ui/icons/Home";

const Styles = styled.div`
  .navbar {
    background-color: #0467e9;
    padding-left: 70px;
    top: 5em;
    width: 100%;
    position: fixed;
    z-index: 1;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    padding-left: 0;
    padding-top: 0;
  }
  .nav-L2 {
    color: white;
    &:hover {
      color: #262626;
    }
  }
`;

export const NavigationbarProjectsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/projects">
        <h2 className="nav-L2">Project</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarContactsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/contacts">
        <h2 className="nav-L2">Contacts</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarTicketsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/tickets">
        <h2 className="nav-L2">Tickets</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarConsultsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/consults">
        <h2 className="nav-L2">Consults</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarSprintChatL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/sprintChat">
        <h2 className="nav-L2">Sprint Chat</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarStatisticsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/statistics">
        <h2 className="nav-L2">Statistics</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarHomeL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/">
        <h2 className="nav-L2">Home</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarEmployeeL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/employee/dashboard">
        <h2 className="nav-L2">Employee Dashboard</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarClientDashboardL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/client/ClientDashboard">
        <h2 className="nav-L2">Client Dashboard</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarAdminL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/admin/dashboard">
        <h2 className="nav-L2">Admin Dashboard</h2>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarClientProjectsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/client/ClientProjects">
        <h2 className="nav-L2">Client Projects</h2>
      </Nav.Link>
      <Nav.Link href="/client/ClientDashboard">
        <div>
          <Home
            style={{
              color: "white",
              fontSize: "30px",
              position: "absolute",
              right: "41px",
              top: "9px",
            }}
          ></Home>
        </div>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarClientTicketsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/client/ClientTickets">
        <h2 className="nav-L2">Client Tickets</h2>
      </Nav.Link>
      <Nav.Link href="/client/ClientDashboard">
        <div>
          <Home
            style={{
              color: "white",
              fontSize: "30px",
              position: "absolute",
              right: "41px",
              top: "9px",
            }}
          ></Home>
        </div>
      </Nav.Link>
    </Navbar>
  </Styles>
);

export const NavigationbarClientConsultsL2 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav.Link href="/client/ClientConsults">
        <h2 className="nav-L2">Client Consults</h2>
      </Nav.Link>
      <Nav.Link href="/client/ClientDashboard">
        <div>
          <Home
            style={{
              color: "white",
              fontSize: "30px",
              position: "absolute",
              right: "41px",
              top: "9px",
            }}
          ></Home>
        </div>
      </Nav.Link>
    </Navbar>
  </Styles>
);
