import React, { useState, useEffect, Fragment } from "react";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import {
  addCompany,
  getCompanies,
  addClient,
  uploadImagetoCloudinary,
} from "../../api/client";

import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";

import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarContactsL2 } from "../sub/Navbar-L2";
import { NavigationbarContactsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";

import "../stylesheets/contacts.css";

const CreateContact = () => {
  const [companies, setCompanies] = useState(null);

  const [compLogo, setCompLogo] = useState("");
  const [companyLogoURL, setCompanyLogoURL] = useState("");
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyAddress: "",
    companyRegNumber: "",
    companyContactNumber: "",
  });
  const {
    companyName,
    companyAddress,
    companyRegNumber,
    companyContactNumber,
  } = companyData;

  const [companyErrorMsg, setCompanyErrorMsg] = useState("");
  const [companySuccessMsg, setCompanySuccessMsg] = useState("");
  const [companyLoading, setCompanyLoading] = useState(false);

  const [clientErrorMsg, setClientErrorMsg] = useState("");
  const [clientSuccessMsg, setClientSuccessMsg] = useState("");
  const [clientLoading, setClientLoading] = useState(false);

  const [clientProfile, setClientProfile] = useState("");
  const [clientProfileURL, setClientProfileURL] = useState("");
  const [clientData, setClientData] = useState({
    clientFirstName: "",
    clientLastName: "",
    clientContactNumber: "",
    clientJob: "",
    clientAddress: "",
    clientDOB: "",
    clientEmail: "",
    clientNIC: "",
    clientCompanyName: "",
    clientUsername: "",
    clientPassword: "",
    clientConfirmPassword: "",
  });
  const {
    clientFirstName,
    clientLastName,
    clientContactNumber,
    clientJob,
    clientAddress,
    clientDOB,
    clientEmail,
    clientNIC,
    clientCompanyName,
    clientUsername,
    clientPassword,
    clientConfirmPassword,
  } = clientData;

  const [registerCompanyForm, setRegisterCompanyForm] = useState(true);

  //lifecycle effects
  useEffect(() => {
    loadCompanies();
  }, [companyLoading]);

  const loadCompanies = async () => {
    await getCompanies()
      .then((response) => {
        setCompanies(response.data.companies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handlers

  const handleCompanyChange = (evt) => {
    setCompanyErrorMsg("");
    setCompanySuccessMsg("");
    setCompanyData({
      ...companyData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleCompanySubmit = async (evt) => {
    evt.preventDefault();

    //check for empty fields
    if (
      isEmpty(companyName) ||
      isEmpty(companyAddress) ||
      isEmpty(companyRegNumber) ||
      isEmpty(companyContactNumber)
    ) {
      setCompanyErrorMsg("Please Fill All The Fields");
    } else if (compLogo === null) {
      setCompanyErrorMsg("Please Upload the Company Logo");
    } else {
      await uploadImagetoCloudinary(compLogo)
        .then((res) => res.json())
        .then((data) => {
          setCompanyLogoURL(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function addCompanyCallAPI(formData) {
    if (companyLogoURL !== "") {
      setCompanyLoading(true);
      addCompany(formData)
        .then((response) => {
          setCompanyLoading(false);
          setCompanySuccessMsg(response.data.successMsg);
          setCompanyData({
            companyName: "",
            companyAddress: "",
            companyRegNumber: "",
            companyContactNumber: "",
            companyLogo: null,
          });
        })
        .catch((err) => {
          setCompanyLoading(false);
          setCompanyErrorMsg(err.response.data.errorMsg);
        });
    }
  }

  useEffect(() => {
    let formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyAddress", companyAddress);
    formData.append("companyRegNumber", companyRegNumber);
    formData.append("companyContactNumber", companyContactNumber);
    formData.append("companyLogo", companyLogoURL);

    addCompanyCallAPI(formData);
  }, [companyLogoURL]);

  const handleClientChange = (evt) => {
    setClientErrorMsg("");
    setClientSuccessMsg("");
    setClientData({
      ...clientData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleClientSubmit = async (evt) => {
    evt.preventDefault();

    //check for empty fields
    if (
      isEmpty(clientFirstName) ||
      isEmpty(clientLastName) ||
      isEmpty(clientContactNumber) ||
      isEmpty(clientJob) ||
      isEmpty(clientAddress) ||
      isEmpty(clientDOB) ||
      isEmpty(clientEmail) ||
      isEmpty(clientNIC) ||
      isEmpty(clientUsername) ||
      isEmpty(clientPassword) ||
      isEmpty(clientConfirmPassword)
    ) {
      setClientErrorMsg("Please Fill All The Fields");
    } else if (!equals(clientPassword, clientConfirmPassword)) {
      setClientErrorMsg("Passwords Do not Match");
    } else if (isEmpty(clientCompanyName)) {
      setClientErrorMsg("Select a Valid Company Name");
    } else if (!isEmail(clientEmail)) {
      setClientErrorMsg("Invalid Email");
    } else if (clientProfile === null) {
      setClientErrorMsg("Please Upload A Profile Picture");
    } else {
      await uploadImagetoCloudinary(clientProfile)
        .then((res) => res.json())
        .then((data) => {
          setClientProfileURL(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function addClientCallAPI(formData1) {
    if (clientProfileURL !== "") {
      setClientLoading(true);
      addClient(formData1)
        .then((response) => {
          setClientLoading(false);
          setClientSuccessMsg(response.data.successMsg);
          setClientData({
            clientFirstName: "",
            clientLastName: "",
            clientContactNumber: "",
            clientJob: "",
            clientAddress: "",
            clientDOB: "",
            clientEmail: "",
            clientNIC: "",
            clientUsername: "",
            clientPassword: "",
            clientConfirmPassword: "",
            clientCompanyName: "",
            clientProfilePic: null,
          });
        })
        .catch((err) => {
          setClientLoading(false);
          setClientErrorMsg(err.response.data.errorMsg);
        });
    }
  }

  useEffect(() => {
    let formData1 = new FormData();
    formData1.append("clientFirstName", clientFirstName);
    formData1.append("clientLastName", clientLastName);
    formData1.append("clientContactNumber", clientContactNumber);
    formData1.append("clientJob", clientJob);
    formData1.append("clientAddress", clientAddress);
    formData1.append("clientDOB", clientDOB);
    formData1.append("clientEmail", clientEmail);
    formData1.append("clientNIC", clientNIC);
    formData1.append("clientUsername", clientUsername);
    formData1.append("clientPassword", clientPassword);
    formData1.append("clientCompanyName", clientCompanyName);
    formData1.append("clientProfilePic", clientProfileURL);

    addClientCallAPI(formData1);
  }, [clientProfileURL]);

  const showRegisterCompanyForm = () => (
    <Fragment>
      <div className="employee-contacts-buttons">
        <span className="employee-contacts-left-align employee-contacts-blocked">Register Company</span>
        <span
          className="employee-contacts-right-align"
          onClick={() => setRegisterCompanyForm(false)}
        >
          Add Client
        </span>
      </div>
      <div className="employee-contacts-formcolumn1">
        <form
          className="register-form"
          onSubmit={handleCompanySubmit}
          noValidate
        >
          {companyErrorMsg && showErrorMsg(companyErrorMsg)}
          {companySuccessMsg && showSuccessMsg(companySuccessMsg)}

          {companyLoading ? (
            showLoading()
          ) : (
            <Fragment>
              <div className="form-row">
                <div className="form-group col-md-5">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label className="employee-contacts-text-secondary text-secondary">
                        Company Logo in JPG/JPEG Format :
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setCompLogo(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label className="employee-contacts-text-secondary text-secondary">
                        Company Contact Number :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyContactNumber"
                        value={companyContactNumber}
                        onChange={handleCompanyChange}
                        placeholder="Company Contact Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-7">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label className="employee-contacts-text-secondary text-secondary">Company Name :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={companyName}
                        onChange={handleCompanyChange}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label className="employee-contacts-text-secondary text-secondary">
                        Company Registration Number :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyRegNumber"
                        value={companyRegNumber}
                        onChange={handleCompanyChange}
                        placeholder="Company Registration Number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label className="employee-contacts-text-secondary text-secondary">Company Address :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyAddress"
                    value={companyAddress}
                    onChange={handleCompanyChange}
                    placeholder="Company Address"
                  />
                </div>
              </div>
            </Fragment>
          )}

          <button className="employee-contacts-btn employee-contacts-submitButton">Submit</button>
        </form>
      </div>
    </Fragment>
  );

  const showAddClientForm = () => (
    <Fragment>
      <div className="employee-contacts-buttons">
        <span
          className="employee-contacts-left-align"
          onClick={() => setRegisterCompanyForm(true)}
        >
          Register Company
        </span>
        <span className="employee-contacts-right-align employee-contacts-blocked">Add Client</span>
      </div>
      <div className="employee-contacts-formcolumn2">
        <form
          className="register-form scrolling"
          onSubmit={handleClientSubmit}
          noValidate
        >
          {clientErrorMsg ? showErrorMsg(clientErrorMsg) : <div></div>}

          {clientSuccessMsg ? showSuccessMsg(clientSuccessMsg) : <div></div>}

          {clientLoading ? (
            showLoading()
          ) : (
            <Fragment>
              <div className="employee-contacts-addClientColumn">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setClientProfile(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="clientFirstName"
                      value={clientFirstName}
                      onChange={handleClientChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="clientLastName"
                      value={clientLastName}
                      onChange={handleClientChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <select
                      className="custom-select mr-sm-2"
                      name="clientCompanyName"
                      onChange={handleClientChange}
                    >
                      <option value="">Choose Company...</option>
                      {companies &&
                        companies.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.companyName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="clientAddress"
                      rows="5"
                      value={clientAddress}
                      onChange={handleClientChange}
                      placeholder="ClientAddress"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control "
                      name="clientUsername"
                      value={clientUsername}
                      onChange={handleClientChange}
                      placeholder="UserName"
                    />
                  </div>
                </div>
              </div>
              <div className="employee-contacts-addClientColumn">
                <div className="form-row"></div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="tel"
                      className="form-control "
                      name="clientContactNumber"
                      value={clientContactNumber}
                      onChange={handleClientChange}
                      placeholder="Contact Number"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="clientNIC"
                      value={clientNIC}
                      onChange={handleClientChange}
                      placeholder="Client NIC"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control "
                      name="clientJob"
                      value={clientJob}
                      onChange={handleClientChange}
                      placeholder="Client Job"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      name="clientDOB"
                      value={clientDOB}
                      onChange={handleClientChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="clientEmail"
                    value={clientEmail}
                    onChange={handleClientChange}
                    placeholder="Client Email"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      name="clientPassword"
                      value={clientPassword}
                      onChange={handleClientChange}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      name="clientConfirmPassword"
                      value={clientConfirmPassword}
                      onChange={handleClientChange}
                      placeholder="Re-enter Password"
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <button className="employee-contacts-btn employee-contacts-submitButton">Submit</button>
        </form>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarContactsL2 />
      <NavigationbarContactsL3 />
      <Sidebar />

      <GridWrapper>
        <ContentWrapper>
          {registerCompanyForm
            ? showRegisterCompanyForm()
            : showAddClientForm()}
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );
};

export default CreateContact;
