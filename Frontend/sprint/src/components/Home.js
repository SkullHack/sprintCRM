import React from "react";

import { Link } from "react-router-dom";
import "./stylesheets/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="container-fluid">
        <div className="row px-4 vh-100">
          <div className="col-5 my-auto pl-5 mr-5">
            <img
              src="/images/welcomeLogo.png"
              className="img-fluid"
              alt="Logo"
            />
          </div>
          <div className=" col-3 align-self-center">
            <Link to="/login">
              <div className="home-card-employee">
                <div className="display-5">Employee</div>
                <img src="/images/emp2.png" className="img-fluid" alt="Logo" />
              </div>
            </Link>
          </div>

          <div className=" col-3 align-self-center">
            <Link to="/client/ClientLogin">
              <div className="home-card-client">
                <div className="display-5">Client</div>
                <img
                  src="/images/client.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
