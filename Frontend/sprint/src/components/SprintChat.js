import React, { useRef, Fragment } from "react";
import "./stylesheets/sprintChat.css";
import Conversation from "./conversations/Conversation";
import { getConversations, getMessages } from "../api/sprintchat";
import { useEffect, useState } from "react";
import Message from "./conversations/Message";
import { getLocalStorage } from "../helpers/localStorage";
import axios from "axios";
import { getAllClients } from "../redux/actions/clientAction";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../redux/actions/employeeAction";
import { postConversation } from "../api/sprintchat";
import { getCompanies } from "../redux/actions/clientAction";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import { updateMessageStatus } from "../api/sprintchat";
import equals from "validator/lib/equals";
import MessageIcon from "@material-ui/icons/MessageRounded";

import NavigationbarL1 from "./sub/Navbar-L1";
import { NavigationbarSprintChatL2 } from "./sub/Navbar-L2";
import { NavigationbarSprintChatL3 } from "./sub/Navbar-L3";
import Sidebar from "./sub/Sidebar";

const SprintChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState([]);
  const [notifyConvo, setNotifyConvo] = useState([]);
  const [isTrue, setIsTrue] = useState(false);

  let isConvo = false;
  let exist = null;

  const scrollRef = useRef();

  //getting details of logged in user
  let userDetails = getLocalStorage("employee");

  //retrieve conversations
  //related to logged in user
  //from database
  useEffect(() => {
    // setNotification([]);

    getConversations(userDetails._id)
      .then((response) => {
        setConversations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getConversations();
  }, [userDetails._id]);

  //retrieve messages
  //of selected conversation
  //from database
  useEffect(() => {
    getMessages(currentChat._id)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getMessages();
  }, [currentChat]);

  //scroll automatically to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  let temp = "";

  const message = {
    sender: userDetails._id,
    text: newMessage,
    conversationId: currentChat._id,
    status: "unread",
  };
  //sending message function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/messages", message);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  //retrieve all clients
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  //retrieve all employees
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const { clients } = useSelector((state) => state.clients);

  const { employees } = useSelector((state) => state.employees);

  //posting new conversation
  const createConvo = (clientId) => {
    console.log(conversations);

    for (let i = 0; i < conversations.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (equals(conversations[i].members[j], clientId)) {
          isConvo = true;
          exist = conversations[i];
          console.log(conversations[i].members[j]);
        }
      }
    }
    console.log(isConvo);
    if (isConvo !== true) {
      postConversation({ senderId: userDetails._id, receiverId: clientId })
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => {});
    } else {
      setCurrentChat(exist);
      setSelected(exist._id);
    }
  };

  const setOnclick = (con) => {
    setCurrentChat(con);
    setSelected(con._id);
  };

  function notify(userID) {
    setIsTrue(true);
    setNotification([]);

    getConversations(userID)
      .then((response) => {
        setNotifyConvo(response.data);

        for (let i = 0; i < notifyConvo.length; i++) {
          getMessages(notifyConvo[i]._id)
            .then((response) => {
              // setNotifyMessage(response.data);
              for (let j = 0; j < response.data.length; j++) {
                if (
                  response.data[j].sender !== userID &&
                  response.data[j].status === "unread"
                ) {
                  setNotification((notification) =>
                    notification.concat([response.data[j]])
                  );
                  console.log(notification);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function badgefunction(smthing) {
    const notif = smthing;
    if (notif === true)
      return {
        backgroundColor: "#25D366",
        borderRadius: "50%",
        marginTop: "-5px",
        position: "absolute",
        left: "792px",
        visibility: "visible",
      };
    else
      return {
        backgroundColor: "red",
        borderRadius: "50%",
        Top: "75px",
        position: "absolute",
        left: "792px",
        visibility: "hidden",
      };
  }

  function removeNotification(messageid, messageStatus) {
    // const not = value;
    // updateMessage._id = value._id;
    // updateMessage.status = "read";
    // setUpdateMessage(updateMessage._id, updateMessage.status);
    updateMessageStatus({ _id: messageid, status: messageStatus })
      .then((response) => {
        console.log("message updated", messageid);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarSprintChatL2 />
      <NavigationbarSprintChatL3 />
      <Sidebar />

      <div className="messanger">
        {/* menu chat div */}
        <div className="chatMenu">
          <h5
            className="colorTextDecrease"
            style={{ marginTop: "30px", marginLeft: "30px" }}
          >
            CHATS
          </h5>
          <div className="chatMenuWrapper">
            {/* Theses are conversation inside ./conversations/Conversation */}
            {conversations.map((con) => (
              <div
                key={con._id}
                style={{
                  backgroundColor:
                    selected === con._id ? "rgb(205, 205, 205)" : "",
                }}
                onClick={() => setOnclick(con)}
              >
                <Conversation
                  key={con._id}
                  conversation={con}
                  currentUser={userDetails}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Box chat div */}
        <div className="chatBox">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
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

              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something.."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  {" "}
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              <h5 style={{ marginLeft: "12px" }}> View notifications</h5>
              <div>
                <div
                  className="notifications"
                  style={{ display: "inline-block" }}
                >
                  <button
                    onClick={() => notify(userDetails._id)}
                    style={{ background: "white", border: "none" }}
                  >
                    <MessageIcon fontSize="large"></MessageIcon>
                  </button>
                  <span className="badge" style={badgefunction(isTrue)}>
                    {notification.length}{" "}
                  </span>
                </div>
                <br></br>
                <br></br>

                <div className="notificationPanel">
                  {notification.map((not) => (
                    <div
                      class="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong
                        onClick={() => {
                          setSelected(not.conversationId);
                          removeNotification(not._id, "read");
                        }}
                      >
                        New message
                      </strong>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={() => {
                          removeNotification(not._id, "read");
                        }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </span>
          )}
        </div>

        {/* Retrieve all clients */}
        {/* Online chat div */}
        <div className="chatOnline">
          <h5 className="colorTextDecrease">CLIENTS</h5>
          {/* online top div */}
          <div className="chatOnlinetop">
            {clients.map((client) => (
              <div
                className="conversation_all"
                key={client._id}
                onClick={() => {
                  createConvo(client._id);
                  setCurrentChat(client);
                }}
              >
                {/* these are the list of all clients */}
                <img
                  className="conversationImg_all"
                  src={client.clientProfilePic}
                  alt="custom-image-1"
                />
                <span className="conversationName_all">
                  {client.clientFirstName} {client.clientLastName}
                </span>
              </div>
            ))}
          </div>

          {/* Retrieve all employees */}
          <h5 className="colorTextDecrease">EMPLOYEES</h5>
          {/* online bottom div */}
          <div className="chatOnlineBottom">
            {employees.map((employee) => (
              <div key={employee._id}>
                {employee._id != userDetails._id ? (
                  <div
                    className="conversation_all"
                    key={employee._id}
                    onClick={() => {
                      createConvo(employee._id);
                    }}
                  >
                    {/* these are the list of all clients and employees */}
                    <img
                      className="conversationImg_all"
                      src="https://i.ibb.co/02zYzSV/pexels-stefan-stefancik-91227.jpg"
                      alt="custom-image-1"
                    />
                    <span className="conversationName_all">
                      {employee.firstName} {employee.lastName}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SprintChat;
