import React, { useState, Fragment, useEffect } from "react";
import GridWrapper from "../../helpers/gridWrapper";
import { showErrorMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { useHistory, Link } from "react-router-dom";
import {
  setClientAuthentication,
  isClientAuthenticated,
} from "../../helpers/auth";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { ClientLoginUser } from "../../api/auth";

const ClientLogin = () => {
  let history = useHistory();

  useEffect(() => {
    // if (isClientAuthenticated() && isClientAuthenticated().accessLevel === 0) {
    if (isClientAuthenticated()) {
      history.push("./clientDashboard");
    }
  }, [history]);

  //ravee99angela@gmail.com
  const [formData, setFormData] = useState({
    clientEmail: "",
    clientPassword: "",
    errorMsg: false,
    loadingSpinner: false,
  });

  // destructure form data
  const { clientEmail, clientPassword, errorMsg, loadingSpinner } = formData;

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
    if (isEmpty(clientEmail) || isEmpty(clientPassword)) {
      setFormData({
        ...formData,
        errorMsg: "All field are Required",
      });
    } else if (!isEmail(clientEmail)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email new",
      });
    } else {
      const { clientEmail, clientPassword } = formData;

      const data = {
        clientEmail,
        clientPassword,
      };
      setFormData({
        ...formData,
        loadingSpinner: true,
      });

      ClientLoginUser(data)
        .then((response) => {
          setClientAuthentication(response.data.token, response.data.clients);

          if (isClientAuthenticated()) {
            history.push("./clientDashboard");
          }
        })
        .catch((err) => {
          console.log("client login api controller error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMsg,
          });
        });
    }
  };

  const showLoginForm = () => (
    <Fragment>
      <div className="card px-5 py-5">
        <div className="card-body">
          <h5 className="card-title text-center pb-3">Client Login</h5>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="clientEmail"
                value={clientEmail}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="clientPassword"
                value={clientPassword}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {/* Submit button */}
            <div className="form-group pt-3">
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
// return <p>ClientLogin Component</p>;

export default ClientLogin;
