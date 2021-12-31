import React, { Fragment, useEffect, useRef, useState } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import NavBar_client from "../sub/NavBar_client";
import { NavigationbarClientProjectsL2 } from "../sub/Navbar-L2";
import { NavigationbarClientL3 } from "../../components/sub/Navbar-L3";
import ContentWrapperTwoPartsLeft from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsLeft";
import ContentWrapperTwoPartsRight from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsRight";
import ContentWrapperBlank from "../../helpers/twoSideBySideWrapper/contentWrapperBlank";
import GridWrapperL from "../../helpers/twoSideBySideWrapper/gridWrapperL";
import GridWrapperR from "../../helpers/twoSideBySideWrapper/gridWrapperR";
import { getProjectDetails } from "../../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card'
import { Row, Col } from "react-bootstrap";
import {getLocalStorage} from "../../helpers/localStorage";

//sprint chat
//sprint chat
import { getConversations, getMessages, postMessage } from "../../api/sprintchat";
import equals from "validator/lib/equals";
import Message from "../conversations/Message"

const ClientProjectDetails = ({match}) => {

  let clientDetails = (getLocalStorage("client"));

  const dispatch = useDispatch();
  const { project } = useSelector((state)=> state.projectDetails);
   useEffect(() => {
       dispatch(getProjectDetails(match.params.id));
  },
  [dispatch, match.params.id]);


  //sprint chat implementation

  const [newMessage, setNewMessage] = useState("");
  const [convo, setConvo] = useState("");
  let message = null;

  const scrollRef = useRef();

  let conversations = null;
  const [messages, setMessages] = useState([]);

  //scroll automatically to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  }, [messages]);

  //function to get related conversation details
  useEffect(() => {
      getConversations(clientDetails._id)
      .then((response) => {
        conversations = response.data;
        for (let i = 0; i < conversations.length; i++) {
          for(let j = 0; j < 2; j++){
            if ( equals(conversations[i].members[j], project.lead._id)){
              setConvo(conversations[i]._id);
              retrieveMessages(convo);
            }
          }
        }
      })
      .catch((err) => {
        
      })
    
  }, [project, convo]);

  //function to get messages of conversation found above
  function retrieveMessages(conID) {
    if (conID === null || conID ===""){
      
    } else {
      getMessages(conID)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((err) => {
          
        })
    }
  }

  useEffect(() => {
    message = {
      sender: clientDetails._id,
      text: newMessage,
      conversationId: convo,
      status: "unread"
    };
  }, [project, convo, newMessage]);

  //function to send message
  const handleSendMessage = async (e) =>{
    e.preventDefault();

    postMessage(message)
    .then((response) => {
      setMessages([...messages, response.data]);
      setNewMessage("");
      retrieveMessages(convo);
    })
    .catch((err) => {
      
    })
  };

    return(
      <Fragment>
        <NavBar_client />
        <NavigationbarClientProjectsL2 />
        <NavigationbarClientL3 />
        <ClientSidebar />

      
      <ContentWrapperBlank>
        <GridWrapperL>
          <ContentWrapperTwoPartsLeft>
          <Card className="client-project-detail-card">
            <Card.Body>
              <Card.Title>
                <Fragment>
                  <Row>
                    <Col>
                      Project Details
                    </Col>
                    <Col>
                      Lead Details
                    </Col>
                  </Row>
                </Fragment>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <Fragment>
                  <Row>
                    <Col>
                      Project Name : {project.projectName}
                    </Col>
                    <Col>
                      Lead Name : {project.lead
                        ? project.lead.firstName + " " + project.lead.lastName
                        : "N/A"}
                    </Col>
                  </Row>
                </Fragment>
              </Card.Subtitle>
              <Card.Text as='div'>
                <Fragment>
                  <Row>
                    <Col>
                      Key : {project.projectKey} <br></br>
                      Type : {project.projectType} <br></br>
                      Category : {project.projectCategory} <br></br>
                    </Col>
                    <Col>
                      Email Address : {project.lead
                        ? project.lead.email
                        : "N/A"} <br></br>
                      Occupation : {project.lead
                        ? project.lead.occupation
                        : "N/A"}
                    </Col>
                  </Row>
                </Fragment>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="client-project-detail-card">
            <Card.Body>
              <Card.Title>Client Details</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Company : {project.clientCompanyName
                  ? project.clientCompanyName.companyName
                  : "N/A"}
                </Card.Subtitle>
              <Card.Text>
                  Company Address : {project.clientCompanyName
                  ? project.clientCompanyName.companyAddress
                  : "N/A"} <br></br>
                  Client Name : {project.clientID
                  ? project.clientID.clientFirstName + " " + project.clientID.clientLastName
                  : "N/A"} <br></br>
              </Card.Text>
            </Card.Body>
          </Card>
          
          </ContentWrapperTwoPartsLeft>
        </GridWrapperL>
        
        <GridWrapperR>
          <ContentWrapperTwoPartsRight>

          <div className="projectchatBox">
                      <div className="projectchatBoxTop">
                        {/* These are messages inside ./conversations/Message */}

                        {messages.map((mes) => (  
                          <div key={mes._id} ref={scrollRef}>
                            <Message key={mes._id}  message={mes} own={mes.sender === project.clientID._id} />
                          </div>
                        ))} 
                      </div>

                    <div className="projectchatBoxBottom">
                      <textarea 
                        className="chatMessageInput" 
                        placeholder="write something.."
                        onChange={(e)=> setNewMessage(e.target.value)}
                        value={newMessage}
                        >
                      </textarea>
                      <button className="chatSubmitButton" onClick={handleSendMessage}> Send</button>
                    </div>
              </div>

          </ContentWrapperTwoPartsRight>
        </GridWrapperR>
      </ContentWrapperBlank>

   </Fragment>
    );
};

export default ClientProjectDetails;