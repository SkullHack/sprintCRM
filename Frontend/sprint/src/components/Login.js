import React, { useState, Fragment, useEffect } from "react";
import GridWrapper from "../helpers/gridWrapper";
import { showErrorMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { loginUser } from "../api/auth";
import { useHistory, Link } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "../helpers/auth";

import "./stylesheets/Login.css";

const Login = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().accessLevel === 1) {
      history.push("./admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().accessLevel === 0) {
      history.push("./employee/dashboard");
    } else {
      history.push("./login");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "12345678",
    errorMsg: false,
    loadingSpinner: false,
  });
  // destructure form data
  const { email, password, errorMsg, loadingSpinner } = formData;

  /****************************
   * Event handlers
   ****************************/
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //form validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All field are Required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else {
      const { email, password } = formData;
      const data = {
        email,
        password,
      };
      setFormData({
        ...formData,
        loadingSpinner: true,
      });

      loginUser(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.employee);
          if (isAuthenticated() && isAuthenticated().accessLevel === 1) {
            console.log("admin");
            history.push("./admin/dashboard");
          } else if (isAuthenticated() && isAuthenticated().accessLevel === 0) {
            console.log("employee");
            history.push("./employee/dashboard");
          } else {
            history.push("./NotFound");
          }
        })
        .catch((err) => {
          console.log("login api controller error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMsg,
          });
        });
    }
  };

  /****************************
   * View
   ****************************/

  const showLoginForm = () => (
    <Fragment>
      <div className="card px-3 py-5 ">
        <div className="card-body">
          <h5 className="card-title text-center pb-3">Employee Login</h5>
          <div className="pt-3"></div>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {/* Submit button */}
            <div className="pt-1"></div>
            <div className="form-group pt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );

  /****************************
   * Render
   ****************************/
  return (
    <div className="login-container">
      <div className="container-fluid">
        <div className="row px-4 vh-100">
          <div className="col-12 col-md-8 my-auto pl-5">
            <img
              src="/images/welcomeLogo.png"
              className="img-fluid"
              alt="Logo"
            />
          </div>
          <div className="col-12 col-md-3 align-self-center">
            {errorMsg && showErrorMsg(errorMsg)}
            {loadingSpinner && (
              <div className="text-center pb-5">{showLoading()}</div>
            )}

            {showLoginForm()}
            <div>
              <Link to="/">
                <div className="text-light">Go Back</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
