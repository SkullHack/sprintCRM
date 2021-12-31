import React, { Fragment } from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { isAuthenticated, logout, clientLogout, isClientAuthenticated } from "../../helpers/auth";
import "../stylesheets/Login.css";

const Styles = styled.div`
  .navbar {
    background-color: #0467e9;
    padding-left: 60px;
    top: 0em;
    height: 100px;
    width: 100%;
    position: fixed;
    z-index: 1;
  }
`;

//Client top navigation bar with logout button authenitcated only when client logs in
export const ClientTopNavigationBar = ({ history }) => {
    const handleClientLogout = evt => {
     clientLogout(() => {
       history.push("/client/ClientLogin");
     })
    }
   
   
     const ShowClientTopNavigationBar = () => (
       <Styles>
         <Navbar expand="lg">
           <img src="/images/logo1.png" height="50" alt="Logo" />
           {isClientAuthenticated() && (
           <Fragment>
             <button
               className="btn btn-link text-decoration-none logout-btn"
                onClick={handleClientLogout}
             >
               logout
             </button>
           </Fragment>
          )}
         </Navbar>
       </Styles>
     );
   
     //render
     return <header id="header">{ShowClientTopNavigationBar()}</header>;
   };
   
   export default withRouter(
     ClientTopNavigationBar);