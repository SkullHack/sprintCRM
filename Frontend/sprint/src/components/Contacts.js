import React, { useEffect, useState, Fragment } from "react";
import GridWrapper from "../helpers/gridWrapper";
import ContentWrapper from "../helpers/contentWrapper";
import ViewIcon from "@material-ui/icons/EditOutlined";
import "./stylesheets/contacts.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCompanies, getClients } from "../redux/actions/clientAction";
import { Modal, Container, Row, Col } from "react-bootstrap";
import ClientCard from "../components/contacts/clientCard";
import CancelPresentationSharpIcon from "@material-ui/icons/CancelPresentationSharp";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { deleteClient } from "../redux/actions/clientAction";
import { deleteCompany } from "../redux/actions/clientAction";
import { editCompany, editClient } from "../api/client";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

import NavigationbarL1 from "./sub/Navbar-L1";
import { NavigationbarContactsL2 } from "./sub/Navbar-L2";
import { NavigationbarContactsL3 } from "./sub/Navbar-L3";
import Sidebar from "./sub/Sidebar";

import { isAuthenticated } from "../helpers/auth";


const Contacts = () => {
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");

  //for updating Company
  const {
    companyName,
    companyAddress,
    companyRegNumber,
    companyContactNumber,
  } = company;

  const [companyErrorMsg, setCompanyErrorMsg] = useState("");
  const [companySuccessMsg, setCompanySuccessMsg] = useState("");
  const [companyLoading, setCompanyLoading] = useState(false);

  // for updating client
  const [clientData, setClientData] = useState("");

  const {
    clientFirstName,
    clientLastName,
    clientContactNumber,
    clientJob,
    clientAddress,
    clientDOB,
    clientEmail,
    clientUsername,
    clientNIC,
  } = clientData;

  const [clientErrorMsg, setClientErrorMsg] = useState("");
  const [clientSuccessMsg, setClientSuccessMsg] = useState("");
  const [clientLoading, setClientLoading] = useState(false);

  //modal content
  const [updateCompany, setUpdateCompany] = useState(false);
  const [updateClient, setUpdateClient] = useState(false);

  //main modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clientInfo, setClienInfo] = useState(false);

  //sub modal
  const handleShowClientDetails = (client) => {
    setClient(client);
    setClienInfo(true);
  };
  const handleCloseClientDetails = () => {
    setClienInfo(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const { companies } = useSelector((state) => state.companies);
  const { clients } = useSelector((state) => state.clients);

  let count = 1;

  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((company) => {
    return company.companyName.toLowerCase().includes(search.toLowerCase());
  });

  //for reloading the page after updating
  const reload = () => window.location.reload();

  //for updating company

  const handleCompanyChange = (evt) => {
    setCompanyErrorMsg("");
    setCompanySuccessMsg("");
    setCompany({
      ...company,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleCompanySubmit = (evt) => {
    evt.preventDefault();

    //check for empty fields
    if (
      isEmpty(companyName) ||
      isEmpty(companyAddress) ||
      isEmpty(companyRegNumber.toString()) ||
      isEmpty(companyContactNumber.toString())
    ) {
      setCompanyErrorMsg("Please Fill All The Fields");
    } else {
      setCompanyLoading(true);

      editCompany(company)
        .then((response) => {
          setCompanyLoading(false);
          setCompanySuccessMsg(response.data.successMsg);
        })
        .catch((err) => {
          setCompanyLoading(false);
          setCompanyErrorMsg(err.response.data.errorMsg);
        });
    }
  };

  //for updating client

  const handleClientChange = (evt) => {
    setClientErrorMsg("");
    setClientSuccessMsg("");
    setClientData({
      ...clientData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleClientSubmit = (evt) => {
    evt.preventDefault();

    //check for empty fields
    if (
      isEmpty(clientFirstName) ||
      isEmpty(clientLastName) ||
      isEmpty(clientContactNumber.toString()) ||
      isEmpty(clientJob) ||
      isEmpty(clientAddress.toString()) ||
      isEmpty(clientDOB.toString()) ||
      isEmpty(clientEmail) ||
      isEmpty(clientUsername) ||
      isEmpty(clientNIC.toString())
    ) {
      setClientErrorMsg("Please Fill All The Fields");
    } else if (!isEmail(clientEmail)) {
      setClientErrorMsg("Invalid Email");
    } else {
      setClientLoading(true);

      editClient(clientData)
        .then((response) => {
          setClientLoading(false);
          setClientSuccessMsg(response.data.successMsg);
        })
        .catch((err) => {
          setClientLoading(false);
          setClientErrorMsg(err.response.data.errorMsg);
        });
    }
  };

  const updatpassFunction = (client) => {
    setClientData(client);
    setUpdateClient(true);
  };

  // for modal body changing

  const showMainBody = () => (
    <Fragment>
      <Container className="employee-contacts-padd">
        <Row>
          <Col xs={2} className="employee-contacts-left-bord">
            <img
              className="img-thumbnail employee-contacts-img-modal"
              src={company.companyLogo}
              alt="Company Logo"
            />
          </Col>
          <Col xs={7}>
            <label>Company Name : {company.companyName}</label>
            <br></br>
            <label>Company Address : {company.companyAddress}</label>
            <br></br>
            <label>
              Company Registration Number : {company.companyRegNumber}
            </label>
            <br></br>
            <label>
              Company Contact Number : {company.companyContactNumber}
            </label>
            <br></br>
          </Col>
          {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
            <Col>
              <button
                className="employee-contacts-btn employee-contacts-CompanyEditBtn "
                onClick={() => {
                  setUpdateCompany(true);
                }}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </button>
              <button
                className="employee-contacts-btn employee-contacts-CompanyDeleteBtn"
                onClick={() =>
                  dispatch(deleteCompany(company._id), handleClose())
                }
              >
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </button>
            </Col>
          )}
        </Row>
        <Row className="employee-contacts-top-bord">{clientInfo && showClientInfor()}</Row>
        <Row className="employee-contacts-top-bord">
          {clients.map((client) => (
            <ClientCard
              key={company._id}
              client={client}
              passfunction={() => {
                handleShowClientDetails(client);
              }}
              updatepassFunction={() => updatpassFunction(client)}
              deletepassFunction={() => dispatch(deleteClient(client._id))}
            />
          ))}
        </Row>
      </Container>
    </Fragment>
  );

  const showCompanyForm = () => (
    <Fragment>
      <div className="employee-contacts-buttons">
        <span className="employee-contacts-left-align" onClick={() => setUpdateCompany(false)}>
          {" "}
          Back{" "}
        </span>
      </div>

      <div className="employee-contacts-mainformcolumn1">
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
                <div className="form-group col-md-12">
                  <label className="employee-contacts-text-secondary text-secondary">Company Name :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={companyName}
                    onChange={handleCompanyChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-5">
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
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-7">
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

  const showClientForm = () => (
    <Fragment>
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
                      type="text"
                      className="form-control"
                      name="clientFirstName"
                      value={clientFirstName}
                      onChange={handleClientChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group col-md-12">
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
              <div className="employee-contacts-addClientColumn">
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
                      type="date"
                      className="form-control"
                      name="clientDOB"
                      value={clientDOB}
                      onChange={handleClientChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control "
                      name="clientJob"
                      value={clientJob}
                      onChange={handleClientChange}
                      placeholder="Client Job"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="clientNIC"
                      value={clientNIC}
                      onChange={handleClientChange}
                      placeholder="Client NIC"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="clientEmail"
                      value={clientEmail}
                      onChange={handleClientChange}
                      placeholder="Client Email"
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

  const showClientInfor = () => (
    <Fragment>
      <Container className="employee-contacts-padd">
        <Row className="employee-contacts-clientDetailsSpcing">
          <Col xs={2} className="employee-contacts-left-bord">
            <img
              class="img-thumbnail employee-contacts-img-modal"
              src={client.clientProfilePic}
              alt="User Profile Picture"
              onClick={() => {
                handleCloseClientDetails();
              }}
            />
          </Col>
          <Col >
            Client Name : {client.clientFirstName} {client.clientLastName}
            <br></br>
            Client Contact Number : {client.clientContactNumber}
            <br></br>
            Cient Email Address : {client.clientEmail}
            <br></br>
            Client Job : {client.clientJob}
            <br></br>
          </Col>
          <Col >
            Client Date of Birth : {client.clientDOB}
            <br></br>
            Client NIC : {client.clientNIC}
            <br></br>
            Cient User Name : {client.clientUsername}- <br></br>
            Client Address : {client.clientAddress}
            <br></br>
          </Col>
        </Row>
      </Container>
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

          <div className="input-group">
              <input
                type="text"
                placeholder="Search "
                className="form-control searchConsults employee-contacts-boxContainer"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>

          <Modal show={show} size="xl" scrollable={true} onExit={reload}>
            <Modal.Header>
              <Modal.Title>
                Contact details of Company - {company.companyName}
              </Modal.Title>
              <div className="employee-contacts-close-btn">
                <CancelPresentationSharpIcon
                  fontSize="large"
                  onClick={() => {
                    handleClose();
                  }}
                ></CancelPresentationSharpIcon>
              </div>
            </Modal.Header>
            <Modal.Body className="employee-contacts-mode">
              {updateCompany
                ? showCompanyForm()
                : [updateClient ? showClientForm() : showMainBody()]}
            </Modal.Body>
            <Modal.Footer>
              <button className="employee-contacts-btn employee-contacts-bottom-close-btn" onClick={handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>

          <div className="employee-contacts-table-box">
            <table className="employee-contacts-table">
              <thead>
                <tr>
                  <th className="employee-contacts-th">No.</th>
                  <th className="employee-contacts-th">Registration No.</th>
                  <th className="employee-contacts-th">Company Name</th>
                  <th className="employee-contacts-th">Company Address</th>
                  <th className="employee-contacts-th"></th>
                </tr>
              </thead>
              {filteredCompanies?.length > 0 ? (
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr>
                      <td>{count++}</td>
                      <td>{company.companyRegNumber}</td>
                      <td>{company.companyName}</td>
                      <td>{company.companyAddress}</td>
                      <td>
                        <button
                          onClick={() => {
                            setCompany(company);
                            dispatch(getClients(company._id));
                            handleShow();
                          }}
                          class="employee-contacts-btn employee-contacts-btn-view"
                        >
                          <ViewIcon />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div>
                  {" "}
                  <i>No companies found.</i>{" "}
                </div>
              )}
            </table>
          </div>
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );
};

export default Contacts;
