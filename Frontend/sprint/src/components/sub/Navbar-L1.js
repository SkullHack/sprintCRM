import React, { Fragment } from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../../helpers/auth";
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

  .logout-btn {
    color: white;
    &:hover {
      color: #262626;
    }
  }
`;

const topNavigationBar = ({ history }) => {
  const handleLogout = (evt) => {
    logout(() => {
      history.push("/login");
    });
  };
  function imageClick() {
    if (isAuthenticated().accessLevel === 1) {
      history.push("./admin/dashboard");
    } else if (isAuthenticated().accessLevel === 0) {
      history.push("./employee/dashboard");
    }
  }
  const ShowTopNavigationBar = () => (
    <Styles>
      <Navbar expand="lg">
        <div className="sprint_logo">
          <img
            src="/images/logo1.png"
            height="50"
            alt="Logo"
            onClick={imageClick}
          />
        </div>

        {isAuthenticated() && (
          <Fragment>
            <button
              className="btn btn-link text-decoration-none logout-btn"
              onClick={handleLogout}
            >
              logout
            </button>
          </Fragment>
        )}
      </Navbar>
    </Styles>
  );

  //render
  return <header id="header">{ShowTopNavigationBar()}</header>;
};

export default withRouter(topNavigationBar);
