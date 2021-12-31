import React, { useState, useEffect, Fragment } from "react";
import isEmpty from "validator/lib/isEmpty";
import { addConsult } from "../../api/consult";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import "../stylesheets/consults.css";
import AddPersonIcon from "@material-ui/icons/PersonAdd";
import SuperVisorIcon from "@material-ui/icons/SupervisorAccount";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllClients } from "../../redux/actions/clientAction";
import { getEmployees } from "../../redux/actions/consultAction";
import { postConversation } from "../../api/consult";
import { getLocalStorage } from "../../helpers/localStorage";
import Gridwrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";
import { getConversations } from "../../api/sprintchat";
import equals from "validator/lib/equals";
import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarConsultsL2 } from "../sub/Navbar-L2";
import { NavigationbarConsultsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";

const CreateConsult = () => {
  let userDetails = getLocalStorage("employee");

  //const for setconsultdata and consult
  const [consultData, setConsultData] = useState({
    consultTitle: "",
    startDate: "",
    endDate: "",
    clientName: "",
    employeeName: "",
    errorMsg: false,
    successMsg: false,
    loadingSpinner: false,
  });

  const {
    consultTitle,
    startDate,
    endDate,
    clientName,
    employeeName,
    errorMsg,
    successMsg,
    loadingSpinner,
  } = consultData;

  /****************************
   * Consult handle change
   ****************************/

  const handleChange = (evt) => {
    setConsultData({
      ...consultData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
      successMsg: "",
    });
  };

  let conversations = null;
  // const [convoExist, setConvoExist] = useState(false);
  let convoExist = false;

  /****************************
   * Consult handle submit
   ****************************/
  const handleSubmit = (evt) => {
    evt.preventDefault();

    /****************************
     * Consult form validation
     ****************************/

    if (
      isEmpty(consultTitle) ||
      isEmpty(startDate) ||
      isEmpty(endDate) ||
      isEmpty(clientName) ||
      isEmpty(employeeName)
    ) {
      setConsultData({
        ...consultData,
        errorMsg: " ALL FIELDS ARE REQUIRED ",
        successMsg: false,
      });
    } else {
      const {
        consultTitle,
        startDate,
        endDate,
        clientName,
        employeeName,
        errorMsg,
        successMsg,
      } = consultData;

      const data = {
        consultTitle,
        startDate,
        endDate,
        clientName,
        employeeName,
      };
      setConsultData({
        ...consultData,
        loadingSpinner: true,
        successMsg: "CONSULT ADDED SUCESSFULLY",
      });

      addConsult(data)
        .then((response) => {
          console.log(response);
          setConsultData({
            consultTitle: "",
            startDate: "",
            endDate: "",
            clientName: "",
            employeeName: "",
            loadingSpinner: false,
            successMsg: response.data.successMsg,
            errorMsg: false,
          });

          getConversations(userDetails._id)
            .then((response) => {
              conversations = response.data;
              for (let i = 0; i < conversations.length; i++) {
                for (let j = 0; j < 2; j++) {
                  if (
                    equals(conversations[i].members[j], consultData.clientName)
                  ) {
                    convoExist = true;
                  }
                }
              }
              if (convoExist === false) {
                postConversation({
                  senderId: consultData.employeeName,
                  receiverId: consultData.clientName,
                })
                  .then((response) => {})
                  .catch((err) => {});
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("Consolte creation error ", err);
          setConsultData({
            ...consultData,
            loadingSpinner: false,
            errorMsg: err.response.data.errorMsg,
          });
        });
    }
  };

  /****************************
   * Clients data retreval
   ****************************/
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const { clients } = useSelector((state) => state.clients);

  const { employees } = useSelector((state) => state.employees);

  /****************************
   * create form created
   ****************************/
  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarConsultsL2 />
      <NavigationbarConsultsL3 />
      <Sidebar />
      <Gridwrapper>
        <ContentWrapper className="bgtry">
          {/* <div className="bgtry"> */}

          <h4 className="text-center">CREATE NEW CONSULT</h4>
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}

          {loadingSpinner && (
            <div className="text-center pb-4 mt-2">{showLoading()}</div>
          )}
          <div className="main-dics">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <div className="input-group">
                  {/* <div className=" input-group-text"><AssignmentIcon></AssignmentIcon></div> */}
                  <input
                    name="consultTitle"
                    className=" form-control"
                    value={consultTitle}
                    placeholder="CONSULT TITLE"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label className="form-label">START DATE</label>
                    <input
                      name="startDate"
                      className="form-control"
                      value={startDate}
                      type="date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">END DATE</label>
                    <input
                      name="endDate"
                      className="form-control"
                      value={endDate}
                      type="date"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-text">
                    <AddPersonIcon></AddPersonIcon>
                  </div>
                  <select
                    className="form-select"
                    name="clientName"
                    aria-label="Default select example"
                    value={clientName}
                    onChange={handleChange}
                  >
                    <option value="">SELECT-CLIENT</option>
                    {clients &&
                      clients.map((client) => (
                        <option key={client._id} value={client._id}>
                          {client.clientUsername}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-text">
                    <SuperVisorIcon></SuperVisorIcon>
                  </div>
                  <select
                    className="form-select"
                    name="employeeName"
                    aria-label="Default select example"
                    value={employeeName}
                    onChange={handleChange}
                  >
                    <option value="">SELECT-EMPLOYEE</option>
                    {employees &&
                      employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstName + " " + employee.lastName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
                  {" "}
                  CREATE CONSULT
                </button>
              </div>
            </form>
          </div>
          {/* </div> */}
        </ContentWrapper>
      </Gridwrapper>
    </Fragment>
  );
};

export default CreateConsult;
