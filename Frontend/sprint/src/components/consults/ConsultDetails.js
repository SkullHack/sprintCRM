import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getConsultDetails,
  deleteConsult,
} from "../../redux/actions/consultAction";
import ContentWrapperTwoPartsLeft from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsLeft";
import ContentWrapperTwoPartsRight from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsRight";
import ContentWrapperBlank from "../../helpers/twoSideBySideWrapper/contentWrapperBlank";
import GridWrapperL from "../../helpers/twoSideBySideWrapper/gridWrapperL";
import GridWrapperR from "../../helpers/twoSideBySideWrapper/gridWrapperR";
import isEmpty from "validator/lib/isEmpty";
import {
  addConsultInfo,
  editConsultInfo,
  deleteConsultInfo,
} from "../../api/consult";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import Createconsultinfopopup from "./createconsultinfopopup";
import "../stylesheets/consults.css";
import { getConsultInfo } from "../../redux/actions/consultAction";
import { Container, Row } from "react-bootstrap";
import EditConsultInfoPopup from "./editConsultInfoPopup";
import Swal from "sweetalert2";
import Gridwrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";

import {
  getConversations,
  getMessages,
  postMessage,
} from "../../api/sprintchat";
import equals from "validator/lib/equals";
import Message from "../conversations/Message";
import { getLocalStorage } from "../../helpers/localStorage";
import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarConsultsL2 } from "../sub/Navbar-L2";
import { NavigationbarConsultsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

const ConsultDetails = ({ match }) => {
  const dispatch = useDispatch();

  const [isDeleted, setIsdeleted] = useState(false);
  const history = useHistory();

  //variable for deleting a consult Info
  var validationText = "";
  var tempConsultDate = new Date();
  var tempCurrentDate = new Date();

  //retrieval of project details

  const { consult } = useSelector((state) => state.consult);
  useEffect(() => {
    dispatch(getConsultDetails(match.params.id));
  }, [dispatch, match.params.id]);

  /****************************
   * history used for navigation
   ****************************/

  const { ConsultInfos } = useSelector((state) => state.ConsultInfos);

  {
    useEffect(() => {
      dispatch(getConsultInfo(match.params.id));
    }, [dispatch, match.params.id]);
  }

  //add consult info addition
  const [constInfoData, setconsultInfoData] = useState({
    consultName: "",
    consultDate: "",
    consultDescription: "",
    consultProjestID: consult._id,
    errorMsg: false,
    successMsg: false,
    loadingSpinner: false,
  });

  const {
    consultName,
    consultDate,
    consultDescription,
    consultProjestID,
    errorMsg,
    successMsg,
    loadingSpinner,
  } = constInfoData;

  /****************************
   * Consult Info handle change
   ****************************/
  const handleChange = (evt) => {
    setconsultInfoData({
      ...constInfoData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
      successMsg: "",
      consultProjestID: consult._id,
    });
  };

  /****************************
   * Consult Info handle submit
   ****************************/
  const handleSubmit = (evt) => {
    evt.preventDefault();

    /****************************
     * Consult info form validation
     ****************************/

    if (
      isEmpty(consultName) ||
      isEmpty(consultDate) ||
      isEmpty(consultDescription)
    ) {
      setconsultInfoData({
        ...constInfoData,
        errorMsg: " ALL FIELDS ARE REQUIRED ",
      });
    } else {
      const { consultName, consultDate, consultDescription, consultProjestID } =
        constInfoData;

      const data = {
        consultName,
        consultDate,
        consultDescription,
        consultProjestID,
      };
      setconsultInfoData({
        ...constInfoData,
        loadingSpinner: true,
        successMsg: "CONSULT INFO ADDED SUCESSFULLY",
      });

      addConsultInfo(data)
        .then((response) => {
          console.log(response);
          setconsultInfoData({
            consultName: "",
            consultDate: "",
            consultDescription: "",
            consultProjestID: consult._id,
            loadingSpinner: false,
            successMsg: response.data.successMsg,
            errorMsg: false,
          });
        })
        .catch((err) => {
          console.log("Consolte creation error ", err);
          setconsultInfoData({
            ...constInfoData,
            loadingSpinner: false,
            errorMsg: err.response.data.errorMsg,
          });
        });
    }
  };

  /****************************
   * for popup management
   ****************************/
  const [buttonPopup, openPopup] = useState(false);
  const [editPopup, openeditPopup] = useState(false);

  const [consultErrorMessage, setConsultErrorMessage] = useState("");
  const [consultSuccessMessage, setConsultSuccessMessage] = useState("");

  /****************************
   * EDIT CONSULT INFO
   ****************************/

  const handleConsultChange = (evt) => {
    setConsultErrorMessage("");
    setConsultSuccessMessage("");
    setconsultInfoData({
      ...constInfoData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleConsultSubmit = (evt) => {
    evt.preventDefault();

    if (
      isEmpty(consultName) ||
      isEmpty(consultDate) ||
      isEmpty(consultDescription)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "PLEASE FILL ALL THE FIELDS!",
        customClass: "swal-wide",
      });
    } else {
      editConsultInfo(constInfoData).then((response) => {
        Swal.fire({
          icon: "success",
          text: "EDITED SUCESSFULLY",
          customClass: "swal-wide",
        });
        openeditPopup(false);
      });
      dispatch(getConsultInfo(match.params.id)).catch((err) => {
        setConsultErrorMessage(err.response.data.errorMsg);
      });
    }
  };

  /****************************
   * EDIT CONSULT  SWAL
   ****************************/

  var count = 0;

  const deleteConsultFunction = (consultId) => {
    // window.location.reload();
    if (count > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "EXISTING CONSULT INFORMATION!",
        customClass: "swal-wide-del",
      });
      setIsdeleted(true);
    } else {
      Swal.fire({
        icon: "success",
        text: "DELETED SUCESSFULLY",
        customClass: "swal-wide",
      });
      setIsdeleted(true);
      dispatch(deleteConsult(consultId));
    }
  };

  /****************************
   * DELETE CONSULT INFOR
   ****************************/

  const deleteConsultInfoFunction = (ConsultInfo) => {
    tempConsultDate = new Date(ConsultInfo.consultDate);
    tempCurrentDate = new Date();

    if (tempConsultDate > tempCurrentDate) {
      validationText = "Date not Reached Yet!";
    } else {
      validationText = "You won't be able to revert this!";
    }

    Swal.fire({
      title: "Are you sure?",
      text: validationText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConsultInfo(ConsultInfo)
          .then((response) => {
            Swal.fire("Deleted!", response.data.successMsg, "success");
            dispatch(getConsultInfo(match.params.id));
          })
          .catch((err) => {
            Swal.fire("Cancelled", err.response.data.errorMsg, "error");
          });
      }
    });
  };

  //sprint chat implementation
  //getting details of logged in user
  let userDetails = getLocalStorage("employee");

  const [newMessage, setNewMessage] = useState("");
  const [convo, setConvo] = useState("");
  let message = null;

  const scrollRef = useRef();

  let conversations = null;
  const [messages, setMessages] = useState([]);

  //scroll automatically to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  //function to get related conversation details
  useEffect(() => {
    getConversations(userDetails._id)
      .then((response) => {
        conversations = response.data;
        for (let i = 0; i < conversations.length; i++) {
          for (let j = 0; j < 2; j++) {
            if (equals(conversations[i].members[j], consult.clientName)) {
              setConvo(conversations[i]._id);
              retrieveMessages(convo);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [consult, convo]);

  //function to get messages of conversation found above
  function retrieveMessages(conID) {
    if (conID === null) {
    } else {
      getMessages(conID)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    message = {
      sender: userDetails._id,
      text: newMessage,
      conversationId: convo,
    };
  }, [consult, convo, newMessage]);

  //function to send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    postMessage(message)
      .then((response) => {
        console.log("done");
        setMessages([...messages, response.data]);
        setNewMessage("");
        retrieveMessages(convo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [employeeid, setEmployeeid] = useState(0);

  useEffect(() => {
    if (consult.employeeName) {
      setEmployeeid(consult.employeeName._id);
    }
  }, [consult]);

  const showConsultDashboard = () => {
    // if(userDetails.accessLevel === 1){
    //   console.log(userDetails.accessLevel);
    //   return DefaultConsultView();
    // }else{
    //   return IfEmployeeConsults();
    // }
    if (employeeid != 0) {
      console.log("empid", employeeid);
      console.log(userDetails._id);
      if (userDetails._id === employeeid) {
        return IfEmployeeConsults();
      } else {
        return DefaultConsultView();
      }
    } else {
      console.log("");
    }
  };

  const DefaultConsultView = () => (
    <Fragment>
      <Gridwrapper>
        <ContentWrapper>
          <h5 className="card-h5 card-header">
            {" "}
            {"   "}
            {consult.consultTitle}{" "}
            <button
              onClick={() => {
                openPopup(true);
                setconsultInfoData("");
              }}
              className="btn-add"
            >
              <AddIcon></AddIcon>
            </button>
            {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
              <button
                className=" delete-btn btn btn-outline-danger"
                onClick={() => {
                  {
                    deleteConsultFunction(consult._id);
                  }
                  history.goBack();
                }}
              >
                <DeleteIcon></DeleteIcon>
              </button>
            )}{" "}
          </h5>
          <Createconsultinfopopup trigger={buttonPopup} setTrigger={openPopup}>
            <form onSubmit={handleSubmit} noValidate className="form-pop">
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}
              {loadingSpinner && (
                <div className="text-center pb-4 mt-2">{showLoading()}</div>
              )}
              <h5 className="text-center">ADD CONSULT INFORMATION</h5>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="consultName"
                    value={consultName}
                    placeholder="Consult Name"
                    onChange={handleChange}
                  ></input>
                </div>

                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    name="consultDate"
                    value={consultDate}
                    placeholder="Consult date "
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div></div>
              {/* {
                  useEffect(()=>{
                  dispatch(getConsultInfo(match.params.id));
                }, [dispatch, match.params.id])} */}

              <div className="form-group">
                <textarea
                  className="form-control"
                  name="consultDescription"
                  value={consultDescription}
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="ADD DISCRIPTION"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(getConsultInfo(match.params.id));
                  }}
                >
                  SUBMIT
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => openPopup(false)}
                >
                  CLOSE
                </button>
              </div>
            </form>
          </Createconsultinfopopup>
          <Container className="scrolly">
            <Row>
              {ConsultInfos.map((ConsultInfo) => (
                <div className="card-info-consult" key={ConsultInfo._id}>
                  {/* <div className="top-color"></div> */}
                  <div>
                    <div>
                      <h5  className="emp-consults-info-h4">{ConsultInfo.consultName}</h5>
                    </div>
                    <div className="emp-consults-info">{ConsultInfo.consultDescription}</div>
                    <div className=" text-right">
                      <p
                        style={{ color: "whitesmoke", display: "inline-block" }}
                      >
                        {count++}
                      </p>
                      <button
                        className=" edit-btn "
                        onClick={() => {
                          openeditPopup(true);
                          setconsultInfoData(ConsultInfo);
                        }}
                      >
                        <EditIcon></EditIcon>
                      </button>
                      {isAuthenticated() &&
                        isAuthenticated().accessLevel === 1 && (
                          <button
                            className=" delete-indi "
                            onClick={() => {
                              deleteConsultInfoFunction(ConsultInfo);
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </Container>

          <EditConsultInfoPopup
            trigger={editPopup}
            setTrigger={openeditPopup}
            constInfoData={constInfoData}
          >
            <div className="edit-form-card">
              <div className=" edit-h1-name text-center">
                <h5 className="edit-h1-name-xtx">EDIT CONSULT INFORMATION</h5>
              </div>
              {consultErrorMessage && showErrorMsg(consultErrorMessage)}
              {consultSuccessMessage && showSuccessMsg(consultSuccessMessage)}
              <br></br>
              <form onSubmit={handleConsultSubmit}>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control-edit form_input"
                      onChange={handleConsultChange}
                      name="consultName"
                      value={consultName}
                    ></input>
                  </div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control-edit form_input"
                      name="consultDate"
                      onChange={handleConsultChange}
                      value={consultDate}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control-edit form_input descr-form"
                    name="consultDescription"
                    onChange={handleConsultChange}
                    value={consultDescription}
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div className="update-btn  text-right">
                  <button
                    type="submit"
                    className=" update-btn-sd  btn btn-primary"
                  >
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </EditConsultInfoPopup>
        </ContentWrapper>
      </Gridwrapper>
    </Fragment>
  );

  const IfEmployeeConsults = () => (
    <Fragment>
      <ContentWrapperBlank>
        <GridWrapperL>
          <ContentWrapperTwoPartsLeft>
            <h3 className="card-h5 card-header" >
              {" "}
              {"   "}
              {consult.consultTitle}{" "}
              <button
                onClick={() => {
                  openPopup(true);
                  setconsultInfoData("");
                }}
                className="btn-add"
              >
                <AddIcon></AddIcon>
              </button>
              {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
                <button
                  className=" delete-btn btn btn-outline-danger"
                  onClick={() => {
                    {
                      deleteConsultFunction(consult._id);
                    }
                    history.goBack();
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                </button>
              )}{" "}
            </h3>
            <Createconsultinfopopup
              trigger={buttonPopup}
              setTrigger={openPopup}
            >
              <form onSubmit={handleSubmit} noValidate className="form-pop">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
                {loadingSpinner && (
                  <div className="text-center pb-4 mt-2">{showLoading()}</div>
                )}
                <h5 className="text-center">ADD CONSULT INFORMATION</h5>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      name="consultName"
                      value={consultName}
                      placeholder="Consult Name"
                      onChange={handleChange}
                    ></input>
                  </div>

                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      name="consultDate"
                      value={consultDate}
                      placeholder="Consult date "
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div></div>
                {/* {
                  useEffect(()=>{
                  dispatch(getConsultInfo(match.params.id));
                }, [dispatch, match.params.id])} */}

                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="consultDescription"
                    value={consultDescription}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="ADD DISCRIPTION"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(getConsultInfo(match.params.id));
                    }}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => openPopup(false)}
                  >
                    CLOSE
                  </button>
                </div>
              </form>
            </Createconsultinfopopup>
            <Container className="scrolly">
              <Row>
                {ConsultInfos.map((ConsultInfo) => (
                  <div className="card-info-consult" key={ConsultInfo._id}>
                    {/* <div className="top-color"></div> */}
                    {/* <div> */}
                      <div>
                        <h5 className="emp-consults-info-h4">{ConsultInfo.consultName}</h5>
                      </div>
                      <div className="emp-consults-info">{ConsultInfo.consultDescription}</div>
                      <div className=" text-right">
                        <p
                          style={{
                            color: "whitesmoke",
                            display: "inline-block",
                          }}
                        >
                          {count++}
                        </p>
                        <button
                          className=" edit-btn "
                          onClick={() => {
                            openeditPopup(true);
                            setconsultInfoData(ConsultInfo);
                          }}
                        >
                          <EditIcon></EditIcon>
                        </button>
                        {isAuthenticated() &&
                          isAuthenticated().accessLevel === 1 && (
                            <button
                              className=" delete-indi "
                              onClick={() => {
                                deleteConsultInfoFunction(ConsultInfo);
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
                            </button>
                          )}
                      {/* </div> */}
                    </div>
                  </div>
                ))}
              </Row>
            </Container>

            <EditConsultInfoPopup
              trigger={editPopup}
              setTrigger={openeditPopup}
              constInfoData={constInfoData}
            >
              <div className="edit-form-card">
                <div className=" edit-h1-name text-center">
                  <h5 className="edit-h1-name-xtx">EDIT CONSULT INFORMATION</h5>
                </div>
                {consultErrorMessage && showErrorMsg(consultErrorMessage)}
                {consultSuccessMessage && showSuccessMsg(consultSuccessMessage)}
                <br></br>
                <form onSubmit={handleConsultSubmit}>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control-edit form_input"
                        onChange={handleConsultChange}
                        name="consultName"
                        value={consultName}
                      ></input>
                    </div>
                    <div className="col">
                      <input
                        type="date"
                        className="form-control-edit form_input"
                        name="consultDate"
                        onChange={handleConsultChange}
                        value={consultDate}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-edit form_input descr-form"
                      name="consultDescription"
                      onChange={handleConsultChange}
                      value={consultDescription}
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="update-btn  text-right">
                    <button
                      type="submit"
                      className=" update-btn-sd  btn btn-primary"
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </EditConsultInfoPopup>
          </ContentWrapperTwoPartsLeft>
        </GridWrapperL>

        <GridWrapperR>
          <ContentWrapperTwoPartsRight>
            <div className="consultschatBox">
              <div className="consultschatBoxTop">
                {/* These are messages inside ./conversations/Message */}

                {messages.map((mes) => (
                  <div key={mes._id} ref={scrollRef}>
                    <Message
                      key={mes._id}
                      message={mes}
                      own={mes.sender === userDetails._id}
                    />
                  </div>
                ))}
              </div>

              <div className="consultschatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something.."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button
                  className="chatSubmitButton"
                  onClick={handleSendMessage}
                >
                  {" "}
                  Send
                </button>
              </div>
            </div>
          </ContentWrapperTwoPartsRight>
        </GridWrapperR>
      </ContentWrapperBlank>
    </Fragment>
  );

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarConsultsL2 />
      <NavigationbarConsultsL3 />
      <Sidebar />
      {showConsultDashboard()}
    </Fragment>
  );
};

export default ConsultDetails;
