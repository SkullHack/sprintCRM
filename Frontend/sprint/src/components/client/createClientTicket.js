import React, { Fragment, useState } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import NavBar_client from "../sub/NavBar_client";
import { NavigationbarClientTicketsL2 } from "../../components/sub/Navbar-L2";
import { NavigationbarClientL3 } from "../../components/sub/Navbar-L3";
import ContentWrapper from "../../helpers/contentWrapper";
import GridWrapper from "../../helpers/gridWrapper";
import "../stylesheets/Ticket.css";
import { showLoading } from "../../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
import {showErrorMsg, showSuccessMsg} from "../../helpers/message";
import {addTickets} from "../../api/auth";
import addTicket from "../../images/addTicket.svg";
import {
  MDBIcon,
  MDBCardHeader,
} from "mdbreact";
import {getLocalStorage} from "../../helpers/localStorage";


const CreateClientTicket = () => {
  let clientDetails = (getLocalStorage("client"));

  const [ticket, setTicket] = useState({
    senderID: clientDetails._id,
    receiverID:"",
    ticketTitle:"",
    ticketType:"",
    ticketDetails:"",
    priority:"",
    ticketStatus:"",
    successMsg:false,
    errorMsg:false,
    loading:false
  })
  
  //destructuring 
  //purpose of destructuring is that from now on, we dont have to access the varibales as
  //ticket.ticketTitle, but can directly access them calling ticketTitle
  const {
    senderID, 
    receiverID, 
    ticketTitle, 
    ticketType, 
    ticketDetails,
    priority,
    ticketStatus,
    successMsg,
    errorMsg,
    loading} = ticket

    //when user start typing => onHandle => handleChange functoin is triggered
    //each time handleChange is triggered, the state variable must be changed
    const handleChange = evt => {
      setTicket({
        ...ticket, //what ever details that are currently in the state
        [evt.target.name]:evt.target.value, //the name refers to the name propert in the form input field
        successMsg: '',
        errorMsg:''
        //resetiing success and error message so that both dont appear at the same time
        //once user starts typing, the mesages will be removed
      })
    }

    const handleSubmit = evt =>{
      evt.preventDefault();
      //checking whether fields are empty -validation
      if(isEmpty(ticketTitle) || isEmpty(ticketDetails) || isEmpty(ticketType) || isEmpty(priority) || isEmpty(ticketStatus)){
        setTicket({
          ...ticket, //spread out the current tickte state
          errorMsg:"All fields are required"
        })
      }
      else{
       //we dont have to pass all the variables of ticket.
       //only the below 5 variables are to be posted to DB
       //so we are destructuring
        const {senderID,ticketTitle,ticketDetails,ticketStatus,ticketType,priority} = ticket;
        const data = {senderID,ticketTitle,ticketDetails,ticketStatus,ticketType,priority};
       
       
        setTicket({
          ...ticket , 
          loading:true
        });

        addTickets(data)
          .then((response) =>{
              setTicket({
                //setting all the fields to empty
                senderID:"",
                receiverID:"",
                ticketTitle:"",
                ticketType:"",
                ticketDetails:"",
                priority:"",
                ticketStatus:"",
                successMsg:response.data.successMessage, //setting the success msg with the response set from backend
                loading:false
              })
          })
          .catch((err) =>{
              setTicket({
                ...ticket,
                errorMsg:err.response.data.errorMessage,
                loading:false
              });

          })

      }
       
    }
    return (
      <Fragment>
        <NavBar_client />
        <NavigationbarClientTicketsL2 />
        <NavigationbarClientL3 />
        <ClientSidebar />
  
        <GridWrapper>
       
        <div className="row px-4 vh-100">
        
          <div
            className="col-md-5 align-self-center mx-auto"
            style={{ marginTop: "2em", width:"60em" , height:"30em"}}
          >
            
            <ContentWrapper styel={{width:"80em", height:"70em"}}>
              <center>
            <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3 heading">
                  <MDBIcon icon="lock" /> Create Ticket
                </h3>
              </MDBCardHeader>
              </center>
            {loading && showLoading()}
                 {/* to display messages */}
                 {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
            <div  className="col-md-5" style={{width:"50em"}}>
            <form className="ticket-form" onSubmit={handleSubmit} noValidate>
              <img style={{position:"absolute" , width: "20em", marginLeft:"30em"}} alt="background-image" src={addTicket}></img>
              <div className="form-group input-group">
                <input
                  name="ticketTitle" 
                  value={ticketTitle}
                  className="form-control"
                  placeholder="Ticket title"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group input-group">
                <textarea
                  name="ticketDetails"
                  value={ticketDetails}
                  className="form-control"
                  placeholder="Ticket description"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group input-group">
              <select className='custom-select' name='ticketType' value={ticketType} onChange={handleChange}>
                    <option value=''>Choose Type</option>
                        <option>Question</option>
                        <option>Incident</option>
                        <option>Problem</option>
                    </select>
              </div>
            
              <div className="form-group input-group">
              <select className='custom-select ' name='priority' value={priority} onChange={handleChange} >
                    <option value=''>Choose priority level</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
              </div>

              <div className="form-group input-group">
              <select className='custom-select ' name='ticketStatus' value={ticketStatus} onChange={handleChange} >
                    <option value=''>Choose status</option>
                        <option>Pending</option>
                    </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block addTicket">
                  Create Ticket
                </button>
              </div>
            </form>
        <br></br>
        <br></br>
        
            </div>
            </ContentWrapper>
          </div>
        </div>
      {/* </div> */}

    
    </GridWrapper>

        
      </Fragment>
    );
  };
  
  export default CreateClientTicket;