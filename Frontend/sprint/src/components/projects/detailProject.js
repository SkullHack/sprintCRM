import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Popup from "./addProjectPopup";
import { addstage, note1, editStages } from "../../api/auth";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Popupnote from "./addNotesPopup";
import notebg from "../../images/notes.png";
import NoteCard from "./noteCard";
import { Row } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";

//redux
import { getNotes, deleteNotes } from "../../redux/actions/noteAction";
import {
  getProjectDetails,
  deleteProject,
} from "../../redux/actions/projectAction";
import {
  getStages,
  getSpecificStages,
  deleteStage,
  getAssignedStages,
} from "../../redux/actions/stageAction";

//stylesheet
import "../stylesheets/DetailProject.css";
import "../stylesheets/stages.css";

//wrapper
import ContentWrapperBlank from "../../helpers/twoSideBySideWrapper/contentWrapperBlank";
import GridWrapperL from "../../helpers/twoSideBySideWrapper/gridWrapperL";
import GridWrapperR from "../../helpers/twoSideBySideWrapper/gridWrapperR";
import ContentWrapperTwoPartsLeft from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsLeft";
import ContentWrapperTwoPartsRight from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsRight";
import ProjectWrapper from "../../helpers/projectWrapper";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";

//navigation bar
import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarProjectsL2 } from "../sub/Navbar-L2";
import { NavigationbarProjectsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";

import { isAuthenticated } from "../../helpers/auth";
import { getLocalStorage } from "../../helpers/localStorage";
import { Link } from "react-router-dom";

import {
  getConversations,
  getMessages,
  postMessage,
} from "../../api/sprintchat";
import equals from "validator/lib/equals";
import Message from "../conversations/Message";

const item = {
  id: v4(),
  name: "Clean the house",
};

const item2 = {
  id: v4(),
  name: "Wash the car",
};

function DetailProject({ match, history }) {
  const { project } = useSelector((state) => state.projectDetails);

  //checking for the lead
  const [leadID, setLeadID] = useState(0);

  let userDetails = getLocalStorage("employee");

  useEffect(() => {
    if (project.lead) {
      setLeadID(project.lead._id);
    }
  }, [project]);

  const { isDeleted } = useSelector((state) => state.projectDeleteAndUpdate);

  //for stages......................................
  const [stages, setStages] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectDetails(match.params.id));

    if (isDeleted) {
      console.log("Project deleted!");
      history.push("/projects");
      history.go(0);
    }

    //dispatch(getStages());
    //To get stages for the specific project
    dispatch(getAssignedStages(match.params.id));
    console.log(match.params.id + "ID");
  }, [dispatch, match.params.id, isDeleted, history]);

  const { stage } = useSelector((state) => state.stage);

  /****************************
   * Event handlers
   ****************************/
  const deleteProjectHandler = (id) => dispatch(deleteProject(id));

  /****************************
   * notes
   ****************************/

  const [notesdata, setnotesdata] = useState({
    notesName: "",
    employeeName: userDetails._id,
    successMsg1: false,
    errorMsg1: false,
  });

  const { notesName,employeeName, successMsg1, errorMsg1 } = notesdata;

  const handlenoteschange = (evt) => {
    setnotesdata({
      ...notesdata,
      [evt.target.name]: evt.target.value,
      successMsg1: "",
      errorMsg1: "",
    });
  };
  const handlenotessubmit = (evt) => {
    evt.preventDefault();

    if (isEmpty(notesName)) {
      setnotesdata({
        ...notesdata,
        errorMsg1: "PLEASE ENTER NOTES",
      });
    } else {
      const { notesName, employeeName, successMsg1, errorMsg1 } = notesdata;

      const ndata = { notesName, employeeName, successMsg1, errorMsg1 };

      setnotesdata({
        ...notesdata,
        successMsg1: "NOTES ADDED SUCESSFULLY",
      });

      note1(ndata)
        .then((response) => {
          //console.log(response);
          setnotesdata({
            notesName: "",
            employeeName: "",
            successMsg1: response.ndata.successMsg1,
            errorMsg1: false,
          });
        })
        
        .catch((err1) => {
          console.log("notes adding error", err1);
          setnotesdata({
            ...notesdata,
            //errorMsg1: err1.response.ndata.errorMsg1,
          });
        });
        dispatch_(getNotes(userDetails._id));
    }
  };

  /****************************
   * notes data retreival
   ****************************/
  const dispatch_ = useDispatch();
  useEffect(() => {
    dispatch_(getNotes(userDetails._id));
  }, [dispatch_]);
  const { notes } = useSelector((state) => state.notes);
  const [note, setNote] = useState("");
  const [showSub, setShowSub] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleCloseSub = () => setShowSub(false);
  const handleShowSub = (note) => {
    setNote(note);
    setShowSub(true);
  };

  /****************************
   * addstages
   ****************************/
  const [formData, setFormData] = useState({
    projectID: match.params.id,
    stageName: "",
    stageDescription: "",
    startDate: "",
    endDate: "",
    createdDate: "",
    status: "",
    subTask: "",
    substartDate: "",
    subendDate: "",
    successMsg: false,
    errorMsg: false,
    loadingSpinner: false,
  });

  const {
    projectID,
    stageName,
    stageDescription,
    startDate,
    endDate,
    createdDate,
    status,
    subTask,
    substartDate,
    subendDate,
    successMsg,
    errorMsg,
    loadingSpinner,
  } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //client-side validation
    if (
      isEmpty(stageName) ||
      isEmpty(stageDescription) ||
      isEmpty(startDate) ||
      isEmpty(endDate) ||
      isEmpty(createdDate) ||
      isEmpty(status)
    ) {
      setFormData({
        ...formData,
        errorMsg: "ALL FIELDS ARE REQUIRED",
      });
    } else {
      const {
        projectID,
        stageName,
        stageDescription,
        startDate,
        endDate,
        createdDate,
        status,
        subTask,
        substartDate,
        subendDate,
        successMsg,
        errorMsg,
        loadingSpinner,
      } = formData;
      const data = {
        projectID,
        stageName,
        stageDescription,
        startDate,
        endDate,
        createdDate,
        status,
        subTask,
        substartDate,
        subendDate,
        successMsg,
        errorMsg,
        loadingSpinner,
      };

      setFormData({
        ...formData,
        successMsg: "STAGE ADDED SUCESSFULLY",
      });

      addstage(data)
        .then((response) => {
          // console.log(response);
          setFormData({
            projectID: match.params.id,
            stageName: "",
            stageDescription: "",
            startDate: "",
            endDate: "",
            createdDate: "",
            status: "",
            subTask: "",
            substartDate: "",
            subendDate: "",
            successMsg: response.data.successMsg,
            errorMsg: false,
            loadingSpinner: false,
          });
        })
        .catch((err) => {
          console.log("addstage error :", err);
          setFormData({
            ...formData,
            loadingSpinner: false,
            errorMsg: err.response.data.errorMsg1,
          });
        });
    }
  };

  /****************************
   * for popup management
   ****************************/
  const [buttonPopup, openPopup] = useState(false);
  const [notesPopup, clickPopup] = useState(false);
  const [stagePopup, stageclickPopup] = useState(false);

  const [text, setText] = useState("");
  const [state, setState] = useState({
    //creating 3 columns
    "TO-DO": {
      title: "To do",
      items: [item, item2], //temporary data valuesa
    },
    "IN-PROGRESS": {
      title: "In Progress",
      items: [],
    },
    READY: {
      title: "Completed",
      items: [],
    },
  });

  //*************************************************** */
  /*Update Stage****************************************
  /************************************************** */
  const [stageErrorMsg, setStageErrorMsg] = useState("");
  const [stageSuccessMsg, setStageSuccessMsg] = useState("");

  const handleStageChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleStageSubmit = (evt) => {
    evt.preventDefault();

    if (
      isEmpty(stageName) ||
      isEmpty(stageDescription) ||
      isEmpty(startDate) ||
      isEmpty(endDate) ||
      isEmpty(createdDate) ||
      isEmpty(status)
    ) {
      setFormData({
        ...formData,
        errorMsg: "ALL FIELDS ARE REQUIRED",
      });
    } else {
      //console.log(stages, "STAGE TEST");
      editStages(formData)
        .then((response) => {
          setFormData({
            ...formData,
            successMsg: "STAGE UPDATED SUCESSFULLY",
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            loadingSpinner: false,
            errorMsg: err.response.data.errorMsg,
          });
        });
    }
  };

  /************************************************************** */
  /*********************DELETE STAGE****************************** */
  /****************************************************************** */

  function deleteS(id) {
    //const stageid = this.id;
    //console.log(id, "ID");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStage(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  /************************************************************** */
  /*********************DELETE NOTES****************************** */
  /****************************************************************** */

  function deletenotesfunction(noteid) {
    //const stageid = this.id;
    Swal.fire({
      title: "ARE YOU SURE ?",
      text: "You won't be able to change your decision!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNotes(noteid));
        Swal.fire(
          "DELETED!",
          "Your message has been removed from the system.",
          "success"
        );
      }
    });
  }

  //on DRAG
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = stage;
    const [recordedItem] = items.splice(result.source.index, 1);
    recordedItem.status = result.destination.droppableId;
    editStages(recordedItem);
    items.splice(result.destination.index, 0, recordedItem);
    setStages(items);
    setStages({ status: result.destination.droppableId });
    //console.log(stage, "STAGE");
    //console.log("STATE");
  };

  const { lists } = useSelector((state) => state.lists);

  var formattedArray = stage.map((item) =>
    Object.keys(item).map((i) => item[i])
  );



  // console.log(
  //   "=================================================================================="
  // );

  const showProjectDashboard = () => {
    if (leadID != 0) {
      if (userDetails._id === leadID) {
        console.log("PM");
        return ifProjectManager();
      } else {
        console.log("Employee");
        return DefaultView();
      }
    } else {
      console.log("");
    }
  };

  var date = new Date();

  //sprint chat implementation

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
            if (equals(conversations[i].members[j], project.clientID._id)) {
              setConvo(conversations[i]._id);
              retrieveMessages(convo);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [project, convo]);

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
      status: "unread",
    };
  }, [project, convo, newMessage]);

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

  /****************************
   * View
   ****************************/

  const DefaultView = () => (
    <Fragment>
      <GridWrapper>
        <ContentWrapper>
          {/* Add stage Popup */}

          <Popup trigger={buttonPopup} setTrigger={openPopup}>
            <form
              className="addstage-form"
              style={{ height: "90%" }}
              onSubmit={handleSubmit}
              noValidate
              onChange={handleChange}
            >
              <center>
                {/* <MDBCardHeader style={{marginTop:"-5%"}}className="form-header deep-blue-gradient rounded">
              <h3 className="my-3">
                <MDBIcon icon="lock" /> Stage Details
              </h3>
            </MDBCardHeader> */}
              </center>
              <div className="col-md">
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
              </div>
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                {/* <label
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  Stage Name
                </label> */}
                <input
                  type="text"
                  name="stageName"
                  value={stageName}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter Stage Name"
                  style={{ width: "94%" }}
                />
              </div>

              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <textarea
                  type="text"
                  name="stageDescription"
                  value={stageDescription}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter Description"
                  style={{ width: "94%" }}
                />
              </div>
              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Start Date </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    End Date{" "}
                  </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Created Date </label>
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                    name="startDate"
                    value={startDate}
                    className=" form-control mx-3"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <input
                    name="endDate"
                    value={endDate}
                    className=" form-control mx-3"
                    type="date"
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <input
                    name="createdDate"
                    value={createdDate}
                    className="form-control mx-3"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <br></br>
              <div
                className="col-auto my-1"
                style={{ marginLeft: "3.5%", marginRight: "3.5%" }}
              >
                <select
                  className="custom-select mr-sm-2"
                  id="inlineFormCustomSelect"
                  name="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value="">Choose Status</option>
                  <option>TO-DO</option>
                </select>
              </div>
              <br></br>
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter sub task"
                  style={{ width: "94%" }}
                  name="subTask"
                  value={subTask}
                />
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div className="col" style={{ marginLeft: "1%" }}>
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask Start Date{" "}
                  </label>
                </div>
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask End Date{" "}
                  </label>
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                    className=" form-control mx-2"
                    name="substartDate"
                    value={substartDate}
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <input
                    className=" form-control mx-2"
                    type="date"
                    onChange={handleChange}
                    name="subendDate"
                    value={subendDate}
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="submit-btn"
                  onChange={handleChange}
                >
                  SUBMIT
                </button>
              </div>
              <div></div>
            </form>
          </Popup>

          {/* Add and retrieval notes popup -FRONTEND */}
          <Popupnote trigger={notesPopup} setTrigger={clickPopup}>
            <div className="text-center">
              <form onSubmit={handlenotessubmit}>
                <div className="col-md">
                  {successMsg1 && showSuccessMsg(successMsg1)}
                  {errorMsg1 && showErrorMsg(errorMsg1)}
                </div>

                <div className="form-group">
                  <img
                    src={notebg}
                    alt="BACKGROUND IMAGE"
                    height={150}
                    width={150}
                  ></img>
                </div>

                <div className="form-group">
                  <textarea
                    name="notesName"
                    value={notesName}
                    onChange={handlenoteschange}
                    placeholder="Add Notes"
                    className="notes-data form-control"
                  />
                  <span>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Add Notes
                    </button>
                  </span>
                </div>

                <Row className="top-bord">
                  {notes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      deletenotefunction={() => deletenotesfunction(note._id)}
                    />
                  ))}
                </Row>
              </form>
            </div>
          </Popupnote>

          <div>
            {/* flip box start  */}
            <div className="flip-box">
              <div className="flip-box-inner">
                <div className="flip-box-front">
                  <div className="textTitle">
                    {project.projectName}{" "}
                    <div className="d-inline textTitleGray">
                      | {project.projectKey}
                    </div>
                  </div>
                  <div>
                    <div className="textNormalGrey d-inline">Category : </div>
                    <div className="d-inline"> {project.projectCategory}</div>
                  </div>
                  <div>
                    <div className="textNormalGrey d-inline">Type : </div>
                    <div className="d-inline"> {project.projectType}</div>
                  </div>
                  <div>
                    <div className="textNormalGrey d-inline">
                      Project Lead :{" "}
                    </div>
                    <div className="d-inline">
                      {project.lead ? project.lead.firstName : "N/A"}{" "}
                      {project.lead ? project.lead.lastName : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flip-box-back">
                  <div>
                    <div className="textNormalGrey d-inline">Company : </div>
                    <div className="d-inline">
                      {project.clientCompanyName
                        ? project.clientCompanyName.companyName
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="textNormalGrey d-inline">Client : </div>
                    <div className="d-inline">
                      {project.clientID
                        ? project.clientID.clientFirstName
                        : "N/A"}{" "}
                      {project.clientID
                        ? project.clientID.clientLastName
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="textNormalGrey d-inline">
                      Client Email :{" "}
                    </div>
                    <div className="d-inline">
                      {project.clientID ? project.clientID.clientEmail : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="textNormalGrey d-inline">Occupation : </div>
                    <div className="d-inline">
                      {project.clientID ? project.clientID.clientJob : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* flip box end  */}

            <div className="row">
              <div className="col-1 mr-4">
                {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
                  <button
                    className="btn btn-danger m-1 "
                    onClick={() => deleteProjectHandler(project._id)}
                  >
                    Delete Project
                  </button>
                )}
              </div>

              <div className="col-1">
                {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
                  <Link
                    to={`/project/edit/${project._id}`}
                    className="btn btn-warning m-1 "
                    type="button"
                  >
                    Update Project
                  </Link>
                )}
              </div>
     
              <div className="" style={{ marginRight: "0.8" }}>
                <button
                  onClick={() => openPopup(true)}
                  style={{
                    background: "linear-gradient(to right, #0467e9, #009ffd)",
                    color: "white",
                  }}
                  className="btn btn m-1"
                >
                  {/* <AddIcon></AddIcon> */} Add Stage
                </button>
                <button
                  onClick={() => clickPopup(true)}
                  style={{
                    background: "linear-gradient(to right, #0467e9, #009ffd)",
                    color: "white",
                  }}
                  className="btn btn m-1"
                >
                  <NoteAdd></NoteAdd>
                </button>
              </div>
            </div>
          </div>

          <div className="PApp">
            {/* Drag and drop cards */}
            <DragDropContext onDragEnd={handleDragEnd}>
              {_.map(state, (data, key) => {
                return (
                  <div key={key} className={"column"}>
                    {/* {console.log(key, "KEY")} */}
                    <ProjectWrapper className="stage-border">
                      <h3 style={{ fontSize: "1rem" }} className="stage-title ">
                        {data.title}
                      </h3>
                    </ProjectWrapper>
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={"droppable-col"}
                            >
                              <hr className="Stage-line" style={{ opacity: 10 }}></hr>

                              {stage.map((stages, index) => {
                                //console.log("map");
                                if (stages.status === key)
                                  return (
                                    <Draggable
                                      key={stages._id}
                                      index={index}
                                      draggableId={stages._id}
                                      className="drag"
                                    >
                                      {(provided, snapshot) => {
                                        //console.log(snapshot);
                                        return (
                                          <div
                                            className={`item ${
                                              snapshot.isDragging && "dragging"
                                            }`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <button
                                              className="stageDetails"
                                              style={{
                                                padding: "0",
                                                border: "none",
                                                background: "none",
                                              }}
                                              onClick={() => {
                                                setFormData(stages);
                                                dispatch(
                                                  getSpecificStages(stages._id)
                                                );
                                                stageclickPopup(true);
                                              }}
                                            >
                                                   <p style={{ fontSize:"1.1rem",fontWeight:"bold",float: "left" }}>
                                                  {" "}
                                                  {stages.stageName}
                                                </p>
                                              </button>
                                              <br></br>
                                              <p
                                                style={{
                                                  marginTop:"-4%",
                                                  float: "left",
                                                  color: "#747982",
                                                }}
                                              >
                                              {" "}
                                              {stages.stageDescription}
                                            </p>
                                            <button
                                              className="Stage-btn-delete"
                                              onClick={() => {
                                                deleteS(stages._id);
                                                handleClose();
                                              }}
                                            >
                                              <DeleteOutlinedIcon className="stage-delete" />
                                            </button>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                              })}
                              {provided.placeholder}
                            </div>
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}
            </DragDropContext>
          </div>

        

          {/* Stage retrival popup -frontend */}
          <Popup trigger={stagePopup} setTrigger={stageclickPopup}>
            <form
              className="addstage-formm"
              onSubmit={handleStageSubmit}
              noValidate
            >
              <div className="col-md">
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
              </div>

              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
             
                <input
                  type="text"
                  name="stageName"
                  className="form-control"
                  onChange={handleStageChange}
                  value={formData.stageName}
                  placeholder="Enter Stage Name"
                  style={{ width: "94%" }}
                />
              </div>
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <textarea
                  name="stageDescription"
                  value={formData.stageDescription}
                  onChange={handleStageChange}
                  placeholder="DESCRIPTION"
                  type="text"
                  style={{ width: "94%" }}
                  className="form-control"
                />
              </div>
              
              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Start Date </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    End Date{" "}
                  </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Created Date </label>
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                  name="startDate"
                  onChange={handleStageChange}
                  value={moment(formData.startDate)
                    .utc()
                    .format("YYYY-MM-DD")}
                    className=" form-control mx-3"
                    type="date"
                   
                  />
                </div>
                <div className="col">
                  <input

                       name="endDate"
                          onChange={handleStageChange}
                          value={moment(formData.endDate)
                            .utc()
                            .format("YYYY-MM-DD")}
                          type="date"
                    className=" form-control mx-3"
                    type="date"
                  
                  />
                </div>

                <div className="col">
                  <input
                     name="createdDate"
                     onChange={handleStageChange}
                     value={moment(formData.createdDate)
                       .utc()
                       .format("YYYY-MM-DD")}
                     type="date"
                   
                    className="form-control mx-3"
                 
                  
                  />
                </div>
              </div>
              <br></br>

    
     
              <div
                className="col-auto my-1"
                style={{ marginLeft: "3.5%", marginRight: "3.5%" }}
              >
               
                <input
                          name="status"
                          onChange={handleStageChange}
                          value={formData.status}
                          type="text"
                          className="custom-select mr-sm-2"
                          readOnly="readOnly"
                        />
              </div>
              <br></br>
              
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <input
                  

                  name="subTask"
                  onChange={handleStageChange}
                  value={formData.subTask}
                  className="form-control"
                  placeholder="ADD SUB TASK"
                  type="text"
                />
              </div>
               
              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div className="col" style={{ marginLeft: "1%" }}>
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask Start Date{" "}
                  </label>
                </div>
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask End Date{" "}
                  </label>
                </div>
              </div>
             

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                     name="substartDate"
                     onChange={handleStageChange}
                     value={moment(formData.substartDate)
                       .utc()
                       .format("YYYY-MM-DD")}
                     type="date"
                     className="form-control mx-2"
                     type="date"
                  />
                </div>
                <div className="col">
                  <input
                     name="subendDate"
                     onChange={handleStageChange}
                     value={moment(formData.subendDate)
                       .utc()
                       .format("YYYY-MM-DD")}
                     type="date"
                     className="form-control mx-2"
                     type="date"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </div>
              <div></div>
            </form>
          </Popup>

  
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );

  /****************************
   * ifProjectManager
   ****************************/

  const ifProjectManager = () => (
    <Fragment>
      <ContentWrapperBlank>
        {/* Add stage Popup */}
       
        <Popup trigger={buttonPopup} setTrigger={openPopup}>
            <form
              className="addstage-form"
              style={{ height: "90%" }}
              onSubmit={handleSubmit}
              noValidate
              onChange={handleChange}
            >
              <center>
                {/* <MDBCardHeader style={{marginTop:"-5%"}}className="form-header deep-blue-gradient rounded">
              <h3 className="my-3">
                <MDBIcon icon="lock" /> Stage Details
              </h3>
            </MDBCardHeader> */}
              </center>
              <div className="col-md">
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
              </div>
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                {/* <label
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  Stage Name
                </label> */}
                <input
                  type="text"
                  name="stageName"
                  value={stageName}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter Stage Name"
                  style={{ width: "94%" }}
                />
              </div>

              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <textarea
                  type="text"
                  name="stageDescription"
                  value={stageDescription}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter Description"
                  style={{ width: "94%" }}
                />
              </div>
              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Start Date </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    End Date{" "}
                  </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Created Date </label>
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                    name="startDate"
                    value={startDate}
                    className=" form-control mx-3"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <input
                    name="endDate"
                    value={endDate}
                    className=" form-control mx-3"
                    type="date"
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <input
                    name="createdDate"
                    value={createdDate}
                    className="form-control mx-3"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <br></br>
              <div
                className="col-auto my-1"
                style={{ marginLeft: "3.5%", marginRight: "3.5%" }}
              >
                <select
                  className="custom-select mr-sm-2"
                  id="inlineFormCustomSelect"
                  name="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value="">Choose Status</option>
                  <option>TO-DO</option>
                </select>
              </div>
              <br></br>
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter sub task"
                  style={{ width: "94%" }}
                  name="subTask"
                  value={subTask}
                />
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div className="col" style={{ marginLeft: "1%" }}>
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask Start Date{" "}
                  </label>
                </div>
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask End Date{" "}
                  </label>
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                    className=" form-control mx-2"
                    name="substartDate"
                    value={substartDate}
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <input
                    className=" form-control mx-2"
                    type="date"
                    onChange={handleChange}
                    name="subendDate"
                    value={subendDate}
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="submit-btn"
                  onChange={handleChange}
                >
                  SUBMIT
                </button>
              </div>
              <div></div>
            </form>
          </Popup>

        {/* Add and retrieval notes popup -FRONTEND */}
        <Popupnote trigger={notesPopup} setTrigger={clickPopup}>
          <div className="text-center">
            <form onSubmit={handlenotessubmit}>
              <div className="col-md">
                {successMsg1 && showSuccessMsg(successMsg1)}
                {errorMsg1 && showErrorMsg(errorMsg1)}
              </div>

              <div className="form-group">
                <img
                  src={notebg}
                  alt="BACKGROUND IMAGE"
                  height={150}
                  width={150}
                ></img>
              </div>

              <div className="form-group">
                <textarea
                  name="notesName"
                  value={notesName}
                  onChange={handlenoteschange}
                  placeholder="Add Notes"
                  className="notes-data form-control"
                />
                <span>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  >
                    Add Notes
                  </button>
                </span>
              </div>

              <Row className="top-bord">
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    deletenotefunction={() => deletenotesfunction(note._id)}
                  />
                ))}
              </Row>
            </form>
          </div>
        </Popupnote>

        <GridWrapperL>
          <ContentWrapperTwoPartsLeft>
            <div>
              {/* flip box start  */}
              <div className="flip-box">
                <div className="flip-box-inner">
                  <div className="flip-box-front">
                    <div className="textTitle">
                      {project.projectName}{" "}
                      <div className="d-inline textTitleGray">
                        | {project.projectKey}
                      </div>
                    </div>
                    <div>
                      <div className="textNormalGrey d-inline">Category : </div>
                      <div className="d-inline"> {project.projectCategory}</div>
                    </div>
                    <div>
                      <div className="textNormalGrey d-inline">Type : </div>
                      <div className="d-inline"> {project.projectType}</div>
                    </div>
                    <div>
                      <div className="textNormalGrey d-inline">
                        Project Lead :{" "}
                      </div>
                      <div className="d-inline">
                        {project.lead ? project.lead.firstName : "N/A"}{" "}
                        {project.lead ? project.lead.lastName : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flip-box-back">
                    <div>
                      <div className="textNormalGrey d-inline">Company : </div>
                      <div className="d-inline">
                        {project.clientCompanyName
                          ? project.clientCompanyName.companyName
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="textNormalGrey d-inline">Client : </div>
                      <div className="d-inline">
                        {project.clientID
                          ? project.clientID.clientFirstName
                          : "N/A"}{" "}
                        {project.clientID
                          ? project.clientID.clientLastName
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="textNormalGrey d-inline">
                        Client Email :{" "}
                      </div>
                      <div className="d-inline">
                        {project.clientID
                          ? project.clientID.clientEmail
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="textNormalGrey d-inline">
                        Occupation :{" "}
                      </div>
                      <div className="d-inline">
                        {project.clientID ? project.clientID.clientJob : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* flip box end  */}
              <div>
                {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
                  <button
                    className="btn btn-danger m-1 "
                    onClick={() => deleteProjectHandler(project._id)}
                  >
                    Delete Project
                  </button>
                )}
              </div>
              <div>
                {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
                  <Link
                    to={`/project/edit/${project._id}`}
                    className="btn btn-warning m-1 "
                    type="button"
                  >
                    Update Project
                  </Link>
                )}
              </div>
              
     
              <div className="" style={{ marginRight: "0.8" }}>
                <button
                  onClick={() => openPopup(true)}
                  style={{
                    background: "linear-gradient(to right, #0467e9, #009ffd)",
                    color: "white",
                  }}
                  className="btn btn m-1"
                >
                  {/* <AddIcon></AddIcon> */} Add Stage
                </button>
                <button
                  onClick={() => clickPopup(true)}
                  style={{
                    background: "linear-gradient(to right, #0467e9, #009ffd)",
                    color: "white",
                  }}
                  className="btn btn m-1"
                >
                  <NoteAdd></NoteAdd>
                </button>
              </div>
            </div>

            <div className="PApp">
              {/* Drag and drop cards */}
              <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                  return (
                    <div key={key} className={"column"}>
                      {/* {console.log(key, "KEY")} */}
                      <ProjectWrapper className="stage-border">
                        <h3 style={{ fontSize: "1rem" }} className="stage-title ">
                          {data.title}
                        </h3>
                      </ProjectWrapper>
                      <Droppable droppableId={key}>
                        {(provided, snapshot) => {
                          return (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={"droppable-col"}
                              >
                                <hr
                                  className="Stage-line"
                                  style={{ opacity: 10 }}
                                ></hr>

                                {stage.map((stages, index) => {
                                  // console.log("map");
                                  if (stages.status === key)
                                    return (
                                      <Draggable
                                        key={stages._id}
                                        index={index}
                                        draggableId={stages._id}
                                        className="drag"
                                      >
                                        {(provided, snapshot) => {
                                          // console.log(snapshot);
                                          return (
                                            <div
                                              className={`item ${
                                                snapshot.isDragging &&
                                                "dragging"
                                              }`}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <button
                                                className="stageDetails"
                                                style={{
                                                  padding: "0",
                                                  border: "none",
                                                  background: "none",
                                                }}
                                                onClick={() => {
                                                  setFormData(stages);
                                                  dispatch(
                                                    getSpecificStages(
                                                      stages._id
                                                    )
                                                  );
                                                  stageclickPopup(true);
                                                }}
                                              >
                                                <p style={{ fontSize:"1.1rem",fontWeight:"bold",float: "left" }}>
                                                  {" "}
                                                  {stages.stageName}
                                                </p>
                                              </button>
                                              <br></br>
                                              <p
                                                style={{
                                                  marginTop:"-4%",
                                                  float: "left",
                                                  color: "#747982",
                                                }}
                                              >
                                                {" "}
                                                {stages.stageDescription}
                                              </p>
                                              <button
                                                className="Stage-btn-delete"
                                                onClick={() => {
                                                  deleteS(stages._id);
                                                  handleClose();
                                                }}
                                              >
                                                <DeleteOutlinedIcon className="stage-delete" />
                                              </button>
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                              </div>
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </ContentWrapperTwoPartsLeft>
        </GridWrapperL>
        <GridWrapperR>
          <ContentWrapperTwoPartsRight>
            <div className="projectchatBox">
              <div className="projectchatBoxTop">
                {/* These are messages inside ./conversations/Message */}

                {messages.map((mes) => (
                  <div key={mes._id} ref={scrollRef}>
                    <Message
                      key={mes._id}
                      message={mes}
                      own={mes.sender === project.lead._id}
                    />
                  </div>
                ))}
              </div>

              <div className="projectchatBoxBottom">
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

        {/* Stage retrival popup -frontend */}
        
        <Popup trigger={stagePopup} setTrigger={stageclickPopup}>
            <form
             style={{height:"90%"}}
             className="addstage-form"
              onSubmit={handleStageSubmit}
              noValidate
            >
              <div className="col-md">
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
              </div>

              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                {/* <label
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  Stage Name
                </label> */}
                <input
                  type="text"
                  name="stageName"
                  className="form-control"
                  onChange={handleStageChange}
                  value={formData.stageName}
                  placeholder="Enter Stage Name"
                  style={{ width: "94%" }}
                />
              </div>
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <textarea
                  name="stageDescription"
                  value={formData.stageDescription}
                  onChange={handleStageChange}
                  placeholder="DESCRIPTION"
                  type="text"
                  style={{ width: "94%" }}
                  className="form-control"
                />
              </div>
              
              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Start Date </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    End Date{" "}
                  </label>
                </div>
                <div
                  className="col"
                  style={{
                    fontWeight: "bold",
                    color: "#0467e9",
                    fontSize: "1.1rem",
                    marginLeft: "1%",
                  }}
                >
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label className="  mx-3"> Created Date </label>
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                  name="startDate"
                  onChange={handleStageChange}
                  value={moment(formData.startDate)
                    .utc()
                    .format("YYYY-MM-DD")}
                    className=" form-control mx-3"
                    type="date"
                   
                  />
                </div>
                <div className="col">
                  <input

                       name="endDate"
                          onChange={handleStageChange}
                          value={moment(formData.endDate)
                            .utc()
                            .format("YYYY-MM-DD")}
                          type="date"
                    className=" form-control mx-3"
                    type="date"
                  
                  />
                </div>

                <div className="col">
                  <input
                     name="createdDate"
                     onChange={handleStageChange}
                     value={moment(formData.createdDate)
                       .utc()
                       .format("YYYY-MM-DD")}
                     type="date"
                   
                    className="form-control mx-3"
                 
                  
                  />
                </div>
              </div>
              <br></br>

          

     
              <div
                className="col-auto my-1"
                style={{ marginLeft: "3.5%", marginRight: "3.5%" }}
              >
               
                <input
                          name="status"
                          onChange={handleStageChange}
                          value={formData.status}
                          type="text"
                          className="custom-select mr-sm-2"
                          readOnly="readOnly"
                        />
              </div>
              <br></br>
              
              <div
                className="form-group"
                style={{ marginLeft: "5%", marginRigh: "5%" }}
              >
                <input
                  

                  name="subTask"
                  onChange={handleStageChange}
                  value={formData.subTask}
                  className="form-control"
                  placeholder="ADD SUB TASK"
                  type="text"
                />
              </div>
               
              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "5%" }}
              >
                <div className="col" style={{ marginLeft: "1%" }}>
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask Start Date{" "}
                  </label>
                </div>
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <label
                    className="  mx-3"
                    style={{
                      fontWeight: "bold",
                      color: "#0467e9",
                      fontSize: "1.1rem",
                      marginLeft: "1%",
                    }}
                  >
                    {" "}
                    Subtask End Date{" "}
                  </label>
                </div>
              </div>
             

              <div
                className="row"
                style={{ marginLeft: "2%", marginRight: "6%" }}
              >
                <div className="col">
                  {/* <input type="text" class="form-control" style={{width:"50%"}} placeholder="First name"/> */}
                  <input
                     name="substartDate"
                     onChange={handleStageChange}
                     value={moment(formData.substartDate)
                       .utc()
                       .format("YYYY-MM-DD")}
                     type="date"
                     className="form-control mx-2"
                     type="date"
                  />
                </div>
                <div className="col">
                  <input
                     name="subendDate"
                     onChange={handleStageChange}
                     value={moment(formData.subendDate)
                       .utc()
                       .format("YYYY-MM-DD")}
                     type="date"
                     className="form-control mx-2"
                     type="date"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </div>
              <div></div>
            </form>
          </Popup>

      </ContentWrapperBlank>
    </Fragment>
  );

  /*********************************************
   * Return *
   *********************************************/

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarProjectsL2 />
      <NavigationbarProjectsL3 />
      <Sidebar />
      {showProjectDashboard()}
    </Fragment>
  );
}

export default DetailProject;
