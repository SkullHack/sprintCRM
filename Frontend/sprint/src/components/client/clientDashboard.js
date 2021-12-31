import React, { Fragment } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import { NavigationbarClientDashboardL2 } from "../../components/sub/Navbar-L2";
import { NavigationbarClientL3 } from "../../components/sub/Navbar-L3";
import NavBar_client from "../sub/NavBar_client";
import ContentWrapper from "../../helpers/contentWrapper";
import  "../stylesheets/clientDashboard.css";
import {getLocalStorage} from "../../helpers/localStorage";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('First Name', "Niki"),
  createData('Last Name', "Fernando"),
  createData('Contact', 777),
  createData('email', "nikkiqwerty@gmail.com"),

];

const ClientDashboard = () => {
  let clientDetails = (getLocalStorage("client"));
 



  return (
    <Fragment>

      <NavBar_client/>
      <NavigationbarClientDashboardL2 />
      <NavigationbarClientL3 />
      <ClientSidebar />

      <div>ClientDashboard</div>
      <center>
      <ContentWrapper style ={{marginTop:"10%", width:"60%" ,zIndex:"9", position:"relative"}}>
        <div  className="float-container">
        <div className="float-child">
          <img src={clientDetails.clientProfilePic} style={{width:"50%", height:"30%",   borderRadius: "20%"}}/>
        </div>
        <div className="float-child">
          <h3 style={{textAlign:"left"}}>I'm {clientDetails.clientFirstName} {clientDetails.clientLastName}</h3> <br/>
          <p style={{textAlign:"left", }}>I work as a {clientDetails.clientJob} </p>
          <hr style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: .5,
            borderColor : '#000000'}}/>
          <p style={{textAlign:"left", fontSize:"0.9em", color:"gray" , fontWeight:"bold"}}>
            EMAIL:<br></br> <br></br>
            ADDRESS:<br></br><br></br>
            CONTACT NO:<br></br><br></br>
            DOB:<br></br><br></br>
          </p>
       
        </div>
        <div className="float-childR" style={{marginTop:"-14em"}}>
        <p style={{textAlign:"right", fontSize:"0.9em", color:"black" , fontWeight:"bold"}}>
       {clientDetails.clientEmail}<br></br> <br></br>
           {clientDetails.clientAddress}<br></br><br></br>
           {clientDetails.clientContactNumber}<br></br><br></br>
           {clientDetails.clientDOB}<br></br><br></br>
          </p>
        </div>
        </div>
        <div style={{background:"black", opacity:"0.8", width:"100%"}}>

        </div>
      </ContentWrapper>
      </center>
    </Fragment>
  );
};

export default ClientDashboard;
