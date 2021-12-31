import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { isAuthenticated } from "../../helpers/auth";

const Styles = styled.div`
  .navbar {
    background-color: #0467e9;
    padding-left: 10px;
    top: 8em;
    left: 50px;
    right: 0px;
    height: 100px;
    position: fixed;
    border-bottom-left-radius: 70px;
    border-bottom-right-radius: 70px;
    z-index: 1;
  }

  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: white;
    margin-top: -1em;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const NavigationbarL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarContactsL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto">
        {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
          <Nav.Item>
            <Nav.Link href="/createContact">Create Contact</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarProjectsL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto">
        {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
          <Nav.Item>
            <Nav.Link href="/createProject">Create Project</Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link href="/designProject">Design</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarConsultsL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/createConsult">Create Consult</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarStatisticsL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto"></Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarTicketsL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/myTickets">My Tickets</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarEmployeeL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto"></Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarAdminL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/register">Register Employee</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarSprintChatL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto"></Nav>
    </Navbar>
  </Styles>
);

export const NavigationbarClientL3 = () => (
  <Styles>
    <Navbar expand="lg">
      <Nav className="mr-auto"></Nav>
    </Navbar>
  </Styles>
);
