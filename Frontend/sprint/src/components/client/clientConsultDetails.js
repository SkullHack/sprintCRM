import React, { useEffect, useState, Fragment, useRef  } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import NavBar_client from "../sub/NavBar_client";
import { NavigationbarClientConsultsL2 } from "../../components/sub/Navbar-L2";
import { NavigationbarClientL3 } from "../../components/sub/Navbar-L3";
import "../stylesheets/clientConsults.css";
import { getclientConsultInfo } from "../../redux/actions/consultAction";
import { useSelector, useDispatch } from "react-redux";
import { Row} from "react-bootstrap";
import ContentWrapperTwoPartsLeft from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsLeft";
import ContentWrapperTwoPartsRight from "../../helpers/twoSideBySideWrapper/contentWrapperTwoPartsRight";
import ContentWrapperBlank from "../../helpers/twoSideBySideWrapper/contentWrapperBlank";
import GridWrapperL from "../../helpers/twoSideBySideWrapper/gridWrapperL";
import GridWrapperR from "../../helpers/twoSideBySideWrapper/gridWrapperR";
import equals from "validator/lib/equals";
import Message from "../conversations/Message";
import { getConversations, getMessages, postMessage } from "../../api/sprintchat";
import { getclientconsulttitle } from "../../api/consult";
import {getLocalStorage} from "../../helpers/localStorage";


const ClientConsultDetails = ({ match}) => {

  let clientDetails = (getLocalStorage("client"));

  const [consult, setConsult] = useState("");

  const dispatch = useDispatch();
  // const { consult } = useSelector((state)=> state.consult);
   useEffect(() => {
    getclientconsulttitle(match.params.id)
    .then((response) => {
      setConsult(response.data.consult);

      
    }).catch((err) => {
      // console.log(err)
    })
  },
  [ match.params.id]);

  // client/consult/chat
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

  // function to get related conversation details
    useEffect(() => {
        getConversations(clientDetails._id)
        .then((response) => {
          conversations = response.data;
          for (let i = 0; i < conversations.length; i++) {
            for(let j = 0; j < 2; j++){
              if ( equals(conversations[i].members[j], consult.employeeName)){
                setConvo(conversations[i]._id);
                retrieveMessages(convo);
              }
            }
          }
        })
        .catch((err) => {
          // console.log(err);
        })
      
    }, [consult, convo]);



    //function to get messages of conversation found above
  function retrieveMessages(conID) {
    if (conID === null || conID === ""  ){

      
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
          status: "unread",
        };
      }, [consult, convo, newMessage]);
    
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
          // console.log(err);
        })
      };
         


  //retrieval of project details
  // const { consult } = useSelector((state)=> state.consult);
   useEffect(() => {
       dispatch(getclientConsultInfo(match.params.id));

  },
  [dispatch, match.params.id]);

  const { ConsultInfos } = useSelector((state)=> state.ConsultInfos);
  
    return(
        <Fragment>
      <NavBar_client />
      <NavigationbarClientConsultsL2 />
      <NavigationbarClientL3 />
      <ClientSidebar />

      <ContentWrapperBlank>
        <GridWrapperL>
        <ContentWrapperTwoPartsLeft>
          <h1 className="client-consult-h1">{consult.consultTitle}</h1>
            <Row>
          {ConsultInfos.map(ConsultInfo =>(
              <div className="client-consult-card-info-consult " key={ConsultInfo._id}>
                 <h5>{ConsultInfo.consultName}</h5>
                <div>
                {ConsultInfo.consultDescription}
                </div>
                <div className=" client-consult-text-right">{ConsultInfo.consultDate}</div>
              </div>
            ))}
           
            </Row>
        </ContentWrapperTwoPartsLeft>
        </GridWrapperL>
        <GridWrapperR>
          <ContentWrapperTwoPartsRight>
          <div className="consultschatBox">
                      <div className="consultschatBoxTop">
                        {/* These are messages inside ./conversations/Message */}
                        {messages.map((mes) => (  
                          <div key={mes._id} ref={scrollRef}>
                             <Message key={mes._id}  message={mes} own={mes.sender === clientDetails._id} />
                           </div>
                          ))}
                      </div>

                      <div className="consultschatBoxBottom">
                      <textarea 
                        className="chatMessageInput" 
                        placeholder="write something.."
                        onChange={(e)=> setNewMessage(e.target.value)}
                        value={newMessage}
                        >
                      </textarea>
                      <button className="chatSubmitButton" onClick={handleSendMessage} > Send</button>
                    </div>

              </div>
          </ContentWrapperTwoPartsRight>
          </GridWrapperR>
          </ContentWrapperBlank>
      
    </Fragment>
    );
};

export default ClientConsultDetails;